import Job from "../../src/decorator/Job";
import { CronExpression } from "../../src/expression";
import { GlobalUtils } from "../../src/utils/GlobalUtils";
import { MetadataUtils } from "../../src/utils/MetadataUtils";

describe(Job, () => {
  beforeEach(() => {
    GlobalUtils.getGlobal().typeSchedulerMetadataStorage = null;
  });

  it("should save the metadata", () => {
    @Job("* * * * *")
    class TestJob {}

    const metadata = MetadataUtils.getMetadataStorage().getMetadataArgs();

    expect(metadata).toHaveLength(1);
    expect(metadata[0].target).toBe(TestJob);
  });

  it("should save the metadata with a CronExpression", () => {
    @Job(new CronExpression().build())
    class TestJob {}

    const metadata = MetadataUtils.getMetadataStorage().getMetadataArgs();

    expect(metadata).toHaveLength(1);
    expect(metadata[0].target).toBe(TestJob);
  });
});
