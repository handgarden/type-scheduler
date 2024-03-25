import { JobHandlerMetadataArgs } from ".";
import { DefaultJobHandler } from "../handler/DefaultJobHandler";
import { MetadataHandlerNotFoundException } from "../error/MetadataHandlerNotFoundException";
import { CronExpressionParser } from "../expression";
import { Container } from "../common";

export class MetadataBasedJobHandlerProxy extends DefaultJobHandler {
  private target: Function;

  constructor(metadata: JobHandlerMetadataArgs, container?: Container) {
    super({
      cronExpression: CronExpressionParser.parse(metadata.cronExpression),
      name: metadata?.name || metadata?.target?.name,
    });

    const instance = metadata.instantiateTarget(container);

    if (!instance) {
      throw new MetadataHandlerNotFoundException(
        metadata.token ?? metadata.target
      );
    }

    this.target = instance.handle.bind(instance);
  }

  handle() {
    this.target();
  }
}
