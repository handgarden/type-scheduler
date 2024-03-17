import { CronExpression } from "../expression";
import { JobHandler } from "./JobHandler";

export default abstract class DefaultJobHandler implements JobHandler {
  private readonly _cronExpression: CronExpression;

  constructor(cronExpression: CronExpression) {
    this._cronExpression = cronExpression;
  }

  public get cronExpression(): string {
    return this._cronExpression.build();
  }

  public abstract handle(): void | Promise<void>;
}
