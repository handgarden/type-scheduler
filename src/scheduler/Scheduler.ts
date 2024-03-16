import { JobHandler } from "../handler/JobHandler";
import { JobHandlerManager } from "../handler/JobHandlerManager";
import { SchedulerOptions } from "./SchedulerOptions";

export class Scheduler {
  private readonly options: SchedulerOptions;
  private readonly jobHandlerManager: JobHandlerManager;

  constructor(
    options: SchedulerOptions,
    jobHandlerManager: JobHandlerManager = new JobHandlerManager()
  ) {
    this.options = options;
    this.jobHandlerManager = jobHandlerManager;
  }

  public start(): void {
    if (this.options.isEnabled()) {
      console.log("Scheduler started");
      this.scheduleJobs();
    } else {
      console.log("Scheduler is disabled");
    }
  }

  public scheduleJobs(): void {
    const handlers = this.jobHandlerManager.getHandlers();
    handlers.forEach((handler) => this.scheduleJob(handler));
  }

  private scheduleJob(job: JobHandler): void {
    const expression = job.cronExpression;
    console.log(
      `Scheduling job ${job.constructor.name} with expression: ${expression}`
    );
    this.options.getRunner().schedule(job.cronExpression, job.handle.bind(job));
  }
}
