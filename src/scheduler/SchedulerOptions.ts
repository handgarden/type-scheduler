import { Container } from "../common";
import { DefaultJobHandlerManager } from "../handler";
import { JobHandlerMetadataScanner } from "../metadata/JobHandlerMetadataScanner";
import { ScheduleRunner } from "./ScheduleRunner";

export class SchedulerOptions {
  public runner: ScheduleRunner;
  public container?: Container;
  public metadataScanner: JobHandlerMetadataScanner;
  public manager: DefaultJobHandlerManager;

  constructor(runner: ScheduleRunner, container?: Container) {
    this.runner = runner;
    this.container = container;
    this.manager = new DefaultJobHandlerManager();
    this.metadataScanner = new JobHandlerMetadataScanner({
      manager: this.manager,
      container,
    });
  }
}
