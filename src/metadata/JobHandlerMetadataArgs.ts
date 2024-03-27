import { Container } from "../common";
import { ClassType } from "../common/ClassType";
import { Token } from "../common/Token";
import { ContainerRequiredError } from "../error/ContainerRequiredError";
import { CronExpression } from "../expression";
import { JobHandler } from "../handler";

export class JobHandlerMetadataArgs {
  public readonly target: ClassType<JobHandler>;
  public readonly cronExpression: string | CronExpression;
  public readonly name?: string;
  public readonly token?: Token<JobHandler>;

  constructor({
    target,
    cronExpression,
    name,
    token,
  }: {
    target: ClassType<JobHandler>;
    cronExpression: string | CronExpression;
    name?: string;
    token?: Token<JobHandler>;
  }) {
    this.target = target;
    this.cronExpression = cronExpression;
    this.name = name;
    this.token = token;
  }

  public instantiateTarget(container?: Container) {
    const token = this.token ?? (this.target as ClassType<JobHandler>);

    if (container) {
      return container.get<JobHandler>(token);
    }

    if (!this.isClassType(token)) {
      throw new ContainerRequiredError(token);
    }

    return new token();
  }

  private isClassType(target: any): target is ClassType<JobHandler> {
    return typeof target !== "string" && typeof target !== "symbol";
  }
}
