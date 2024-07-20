import { ClassType, Container } from "../common";
import { JobHandler } from "../handler";
import { JobRegistry } from "../registry/JobRegistry";

export class SchedulerOptions {
  public container?: Container;
  public jobs?: ClassType<JobHandler>[];
  public registry?: JobRegistry;

  constructor({
    container,
    registry,
    jobs,
  }: {
    container?: Container;
    registry?: JobRegistry;
    jobs?: ClassType<JobHandler>[];
  }) {
    this.container = container;
    this.registry = registry;
    this.jobs = jobs;
  }
}

