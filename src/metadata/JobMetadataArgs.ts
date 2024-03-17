import { CronExpression } from "../expression";

export class JobMetadataArgs {
  readonly target: Function | { new (...args: any[]): any };
  readonly cronExpression: string | CronExpression;

  constructor(
    target: Function | { new (...args: any[]): any },
    cronExpression: string | CronExpression
  ) {
    this.target = target;
    this.cronExpression = cronExpression;
  }
}
