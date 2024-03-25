import { CronExpression, CronExpressionParser } from "../expression";
import { JobHandler } from "./JobHandler";

export abstract class DefaultJobHandler implements JobHandler {
  private readonly _name?: string;
  private readonly _cronExpression: CronExpression;

  constructor({
    name,
    cronExpression,
  }: {
    name?: string;
    cronExpression: string | CronExpression;
  }) {
    this._name = name;
    this._cronExpression = this.parseCronExpression(cronExpression);
  }
  private parseCronExpression(
    cronExpression: CronExpression | string
  ): CronExpression {
    if (cronExpression instanceof CronExpression) {
      return cronExpression;
    }

    return CronExpressionParser.parse(cronExpression);
  }

  public get cronExpression(): string {
    return this._cronExpression.build();
  }

  public get name(): string {
    return this._name || this.constructor.name;
  }

  public abstract handle(): void | Promise<void>;
}
