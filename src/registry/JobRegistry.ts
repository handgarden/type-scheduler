import { CronJob } from "cron";

export abstract class JobRegistry {
  public abstract getTimeouts(): string[];
  public abstract getIntervals(): string[];
  public abstract getJobs(): [string, CronJob][];
  public abstract addTimeout(name: string, timeout: NodeJS.Timeout): void;
  public abstract addInterval(name: string, interval: NodeJS.Timeout): void;
  public abstract addJob(name: string, cron: CronJob): void;
  public abstract removeTimeout(name: string): NodeJS.Timeout | undefined;
  public abstract removeInterval(name: string): NodeJS.Timeout | undefined;
  public abstract removeJob(name: string): CronJob | undefined;
}
