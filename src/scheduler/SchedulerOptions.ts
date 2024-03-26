import { ClassType, Container } from "../common";
import { JobHandler } from "../handler";
import { ScheduleRunner } from "./ScheduleRunner";

export class SchedulerOptions {
  public runner: ScheduleRunner;
  public container?: Container;
  public jobs?: ClassType<JobHandler>[];

  constructor(
    runner: ScheduleRunner,
    container?: Container,
    jobs?: ClassType<JobHandler>[]
  ) {
    this.runner = runner;
    this.container = container;
    this.jobs = jobs;
  }
}
