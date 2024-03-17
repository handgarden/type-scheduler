import { JobMetadataArgs } from "../../src/metadata/JobMetadataArgs";

describe(JobMetadataArgs, () => {
  it("should create a new instance", () => {
    const metadata = new JobMetadataArgs(() => {}, "0 0 * * *");
    expect(metadata).toBeInstanceOf(JobMetadataArgs);
  });

  it("should have a constructor", () => {
    const metadata = new JobMetadataArgs(() => {}, "0 0 * * *");
    expect(metadata.constructor).toBeDefined();
  });

  it("should have a cron expression", () => {
    const metadata = new JobMetadataArgs(() => {}, "0 0 * * *");
    expect(metadata.cronExpression).toBe("0 0 * * *");
  });

  it("should have a target", () => {
    const metadata = new JobMetadataArgs(() => {}, "0 0 * * *");
    expect(metadata.target).toBeDefined();
  });
});
