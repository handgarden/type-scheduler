import { JobMetadataArgs } from "../metadata/JobMetadataArgs";

export class JobMetadataStorage {
  private readonly jobMetadataArgs: JobMetadataArgs[] = [];

  public addMetadataArgs(metadata: JobMetadataArgs): void {
    this.jobMetadataArgs.push(metadata);
  }

  public getMetadataArgs(): JobMetadataArgs[] {
    return this.jobMetadataArgs;
  }
}
