import { ClassType } from "../common/ClassType";
import { CronExpression } from "../expression";
import { JobHandler } from "../handler";
import { JobHandlerMetadataArgs } from "../metadata/JobHandlerMetadataArgs";
import { MetadataUtils } from "../utils/MetadataUtils";

export function Job(
  cronExpression: string | CronExpression,
  options?: {
    name?: string;
    token?: string | symbol;
  }
) {
  return function (constructor: ClassType<JobHandler> | InstanceType<any>) {
    const metadata = new JobHandlerMetadataArgs({
      target: constructor,
      cronExpression,
      ...options,
    });
    MetadataUtils.getMetadataStorage().addMetadataArgs(metadata);
  };
}
