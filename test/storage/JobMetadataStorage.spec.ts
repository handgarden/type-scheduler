import { JobHandlerMetadataArgs } from "../../src";
import { JobMetadataStorage } from "../../src/storage/JobMetadaStorage";

describe(JobMetadataStorage, () => {
  let jobMetadataStorage: JobMetadataStorage;

  beforeEach(() => {
    jobMetadataStorage = new JobMetadataStorage();
  });

  describe("addMetadataArgs", () => {
    it("should add metadata args", () => {
      const args = {} as any as JobHandlerMetadataArgs;
      jobMetadataStorage.addMetadataArgs(args);
      expect(jobMetadataStorage.getMetadataArgs()).toContain(args);
    });
  });
});
