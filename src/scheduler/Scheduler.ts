import { DefaultJobHandler } from "../handler";
import { DefaultJobHandlerManager } from "../handler/DefaultJobHandlerManager";
import { JobHandlerMetadataScanner } from "../metadata/JobHandlerMetadataScanner";
import { SchedulerOptions } from "./SchedulerOptions";
import { ScheduleRunner } from "./ScheduleRunner";

export class Scheduler {
  private readonly jobHandlerManager: DefaultJobHandlerManager;
  private readonly runner: ScheduleRunner;
  private readonly metadataScanner: JobHandlerMetadataScanner;

  constructor(options: SchedulerOptions) {
    this.runner = options.runner;
    this.metadataScanner = options.metadataScanner;
    this.jobHandlerManager = options.manager;
  }

  public start(): void {
    this.initialize();
    this.scheduleJobs();
  }

  public initialize(): void {
    this.metadataScanner?.autoScan();
  }

  private scheduleJobs(): void {
    const handlers = this.jobHandlerManager.getHandlers();
    handlers.forEach((handler) => this.scheduleJob(handler));
  }

  private scheduleJob(job: DefaultJobHandler): void {
    const expression = job.cronExpression;
    console.log(`Scheduling job ${job.name} with expression: ${expression}`);
    this.runner.schedule(job.cronExpression, job.handle.bind(job));
  }
}
