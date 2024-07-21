import { CronJob } from "cron";
import { DefaultJobHandler } from "../handler";
import { DefaultJobHandlerManager } from "../handler/DefaultJobHandlerManager";
import { JobHandlerMetadataScanner } from "../metadata/JobHandlerMetadataScanner";
import { SchedulerOptions } from "./SchedulerOptions";
import { JobRegistry } from "../registry/JobRegistry";
import { DefaultJobRegistry } from "../registry/DefaultJobRegistry";

export class Scheduler {
  private readonly jobHandlerManager: DefaultJobHandlerManager;
  private readonly metadataScanner: JobHandlerMetadataScanner;
  private readonly registry: JobRegistry;

  constructor(options: SchedulerOptions) {
    this.jobHandlerManager = new DefaultJobHandlerManager();
    this.metadataScanner = new JobHandlerMetadataScanner({
      manager: this.jobHandlerManager,
      container: options.container,
    });
    this.registry = options.registry ?? new DefaultJobRegistry();
  }

  public start(): void {
    this.initialize();
    this.scheduleJobs();
  }

  private initialize(): void {
    this.metadataScanner?.autoScan();
  }

  private scheduleJobs(): void {
    const handlers = this.jobHandlerManager.getHandlers();
    handlers.forEach((handler) => this.scheduleJob(handler));
  }

  private scheduleJob(job: DefaultJobHandler): void {
    const expression = job.cronExpression;
    const cronJob = new CronJob(
      expression,
      job.handle.bind(job),
      null,
      true,
      job.timezone
    );
    cronJob.start();
    this.registry.addJob(job.name, cronJob);
    console.log(`Scheduling job ${job.name} with expression: ${expression}`);
  }

  public getRegistry(): JobRegistry {
    return this.registry;
  }
}

