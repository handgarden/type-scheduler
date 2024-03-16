import { ScheduleRunner } from "./ScheduleRunner";

export class SchedulerOptions {
  private readonly enabled: boolean;
  private readonly runner: ScheduleRunner;
  constructor({
    enabled = true,
    runner,
  }: {
    enabled?: boolean;
    runner: ScheduleRunner;
  }) {
    this.enabled = enabled;
    this.runner = runner;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public getRunner(): ScheduleRunner {
    return this.runner;
  }
}
