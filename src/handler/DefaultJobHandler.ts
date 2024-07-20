import { CronExpression, CronExpressionParser } from "../expression";
import { JobHandler } from "./JobHandler";

export abstract class DefaultJobHandler implements JobHandler {
  private readonly _name?: string;
  private readonly _cronExpression: CronExpression;
  private readonly _timezone?: string;

  constructor({
    name,
    cronExpression,
    timezone,
  }: {
    name?: string;
    cronExpression: string | CronExpression;
    timezone?: string;
  }) {
    this._name = name;
    this._cronExpression = this.parseCronExpression(cronExpression);
    this._timezone = timezone;
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

  public get timezone(): string {
    return this._timezone ? this._timezone : process.env.TZ || "UTC";
  }

  public abstract handle(): void | Promise<void>;
}
