import { CronJob } from "cron";

export abstract class JobRegistry {
  public abstract getTimeouts(): string[];
  public abstract getIntervals(): string[];
  public abstract getCrons(): string[];
  public abstract getTimeout(name: string): NodeJS.Timeout | undefined;
  public abstract getInterval(name: string): NodeJS.Timeout | undefined;
  public abstract getCron(name: string): CronJob | undefined;
  public abstract addTimeout(name: string, timeout: NodeJS.Timeout): void;
  public abstract addInterval(name: string, interval: NodeJS.Timeout): void;
  public abstract addCron(name: string, cron: CronJob): void;
  public abstract removeTimeout(name: string): NodeJS.Timeout | undefined;
  public abstract removeInterval(name: string): NodeJS.Timeout | undefined;
  public abstract removeCron(name: string): CronJob | undefined;
}
