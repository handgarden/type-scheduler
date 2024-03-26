import { Container } from "../common";
import { ScheduleRunner } from "./ScheduleRunner";

export class SchedulerOptions {
  public runner: ScheduleRunner;
  public container?: Container;

  constructor(runner: ScheduleRunner, container?: Container) {
    this.runner = runner;
    this.container = container;
  }
}
