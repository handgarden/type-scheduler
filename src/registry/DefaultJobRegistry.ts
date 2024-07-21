import { CronJob } from "cron";
import { JobRegistry } from "./JobRegistry";

export class DefaultJobRegistry extends JobRegistry {
  private _timeouts: Map<string, NodeJS.Timeout> = new Map();
  private _intervals: Map<string, NodeJS.Timeout> = new Map();
  private _jobs: Map<string, CronJob> = new Map();

  constructor(
    timeoutRegistry?: Map<string, NodeJS.Timeout>,
    intervalRegistry?: Map<string, NodeJS.Timeout>,
    jobRegistry?: Map<string, CronJob>
  ) {
    super();
    this._timeouts = timeoutRegistry ?? new Map();
    this._intervals = intervalRegistry ?? new Map();
    this._jobs = jobRegistry ?? new Map();
  }

  public getTimeouts(): string[] {
    return Array.from(this._timeouts.keys());
  }

  public getIntervals(): string[] {
    return Array.from(this._intervals.keys());
  }

  public getCrons(): string[] {
    return Array.from(this._jobs.keys());
  }

  public getTimeout(name: string): NodeJS.Timeout | undefined {
    return this._timeouts.get(name);
  }

  public getInterval(name: string): NodeJS.Timeout | undefined {
    return this._intervals.get(name);
  }

  public getCron(name: string): CronJob | undefined {
    return this._jobs.get(name);
  }

  public addTimeout(name: string, timeout: NodeJS.Timeout): void {
    if (this._timeouts.has(name)) {
      throw new Error(`Timeout ${name} already exists`);
    }
    this._timeouts.set(name, timeout);
  }

  public addInterval(name: string, interval: NodeJS.Timeout): void {
    if (this._intervals.has(name)) {
      throw new Error(`Interval ${name} already exists`);
    }
    this._intervals.set(name, interval);
  }

  public addCron(name: string, job: CronJob): void {
    if (this._jobs.has(name)) {
      throw new Error(`Job ${name} already exists`);
    }
    this._jobs.set(name, job);
  }

  public removeCron(name: string): CronJob | undefined {
    const job = this._jobs.get(name);
    this._jobs.delete(name);
    return job;
  }

  public removeTimeout(name: string): NodeJS.Timeout | undefined {
    const timeout = this._timeouts.get(name);
    this._timeouts.delete(name);
    return timeout;
  }

  public removeInterval(name: string): NodeJS.Timeout | undefined {
    const interval = this._intervals.get(name);
    this._intervals.delete(name);
    return interval;
  }
}
