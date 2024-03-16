import { JobHandler } from "../handler/JobHandler";
import { SchedulerOptions } from "./SchedulerOptions";

export class Scheduler {
  private readonly options: SchedulerOptions;
  private jobs: JobHandler[] = [];

  constructor(options: SchedulerOptions) {
    this.options = options;
  }

  public addJobs(...jobs: JobHandler[]): void {
    this.jobs = [...this.jobs, ...jobs];
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
    this.jobs.forEach(this.scheduleJob);
  }

  private scheduleJob(job: JobHandler): void {
    const expression = job.cronExpression;
    console.log(
      `Scheduling job ${job.constructor.name} with expression: ${expression}`
    );
    this.options.getRunner().schedule(job.cronExpression, job.handle.bind(job));
  }
}
