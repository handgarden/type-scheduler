import { JobMetadataStorage } from "../../src/storage/JobMetadaStorage";
import { MetadataUtils } from "../../src/utils/MetadataUtils";

describe(MetadataUtils, () => {
  it("should return metadata storage", () => {
    expect(MetadataUtils.getMetadataStorage()).toBeDefined();
  });

  it("should return the same metadata storage", () => {
    const storage = MetadataUtils.getMetadataStorage();
    expect(MetadataUtils.getMetadataStorage()).toBe(storage);
  });

  it("should return storage type of JobMetadataStorage", () => {
    const storage = MetadataUtils.getMetadataStorage();
    expect(storage).toBeInstanceOf(JobMetadataStorage);
  });
});
