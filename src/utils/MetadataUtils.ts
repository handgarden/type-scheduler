import { JobMetadataStorage } from "../storage/JobMetadaStorage";
import { GlobalUtils } from "./GlobalUtils";

export class MetadataUtils {
  public static getMetadataStorage(): JobMetadataStorage {
    const global = GlobalUtils.getGlobal();
    if (!global.typeSchedulerMetadataStorage) {
      global.typeSchedulerMetadataStorage = new JobMetadataStorage();
    }

    return global.typeSchedulerMetadataStorage;
  }
}
