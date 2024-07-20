import { CronJob } from "cron";

export abstract class JobRegistry {
  public abstract getTimeouts(): [string, number][];
  public abstract getIntervals(): [string, number][];
  public abstract getJobs(): [string, CronJob][];
  public abstract addTimeout(name: string, timeout: number): void;
  public abstract addInterval(name: string, interval: number): void;
  public abstract addJob(name: string, cron: CronJob): void;
  public abstract removeTimeout(name: string): void;
  public abstract removeInterval(name: string): void;
  public abstract removeJob(name: string): void;
}
