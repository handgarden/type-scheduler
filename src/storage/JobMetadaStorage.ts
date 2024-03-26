import { JobHandlerMetadataArgs } from "../metadata/JobHandlerMetadataArgs";

export class JobMetadataStorage {
  private readonly jobMetadataArgs: JobHandlerMetadataArgs[] = [];

  public addMetadataArgs(metadata: JobHandlerMetadataArgs): void {
    this.jobMetadataArgs.push(metadata);
  }

  public getMetadataArgs(): JobHandlerMetadataArgs[] {
    return [...this.jobMetadataArgs];
  }
}
