import { CronJob } from "cron";
import { JobRegistry } from "./JobRegistry";

export class DefaultJobRegistry extends JobRegistry {
  private _timeouts: Map<string, number> = new Map();
  private _intervals: Map<string, number> = new Map();
  private _jobs: Map<string, CronJob> = new Map();

  constructor(
    timeoutRegistry?: Map<string, number>,
    intervalRegistry?: Map<string, number>,
    jobRegistry?: Map<string, CronJob>
  ) {
    super();
    this._timeouts = timeoutRegistry ?? new Map();
    this._intervals = intervalRegistry ?? new Map();
    this._jobs = jobRegistry ?? new Map();
  }

  public getTimeouts(): [string, number][] {
    return Array.from(this._timeouts.entries());
  }

  public getIntervals(): [string, number][] {
    return Array.from(this._intervals.entries());
  }

  public getJobs(): [string, CronJob][] {
    return Array.from(this._jobs.entries());
  }

  public addTimeout(name: string, timeout: number): void {
    if (this._timeouts.has(name)) {
      throw new Error(`Timeout ${name} already exists`);
    }
    this._timeouts.set(name, timeout);
  }

  public addInterval(name: string, interval: number): void {
    if (this._intervals.has(name)) {
      throw new Error(`Interval ${name} already exists`);
    }
    this._intervals.set(name, interval);
  }

  public addJob(name: string, job: CronJob): void {
    if (this._jobs.has(name)) {
      throw new Error(`Job ${name} already exists`);
    }
    this._jobs.set(name, job);
  }

  public removeJob(name: string): void {
    const job = this._jobs.get(name);
    job?.stop();
    this._jobs.delete(name);
  }

  public removeTimeout(name: string): void {
    const id = this._timeouts.get(name);
    if (id) {
      clearTimeout(id);
    }
    this._timeouts.delete(name);
  }

  public removeInterval(name: string): void {
    const id = this._intervals.get(name);
    if (id) {
      clearInterval(id);
    }
    this._intervals.delete(name);
  }
}
