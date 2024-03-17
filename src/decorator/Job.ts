import { CronExpression } from "../expression";
import { JobMetadataArgs } from "../metadata/JobMetadataArgs";
import { MetadataUtils } from "../utils/MetadataUtils";

export function Job(cronExpression: string | CronExpression) {
  return function (constructor: Function) {
    const metadata = new JobMetadataArgs(constructor, cronExpression);
    MetadataUtils.getMetadataStorage().addMetadataArgs(metadata);
  };
}
