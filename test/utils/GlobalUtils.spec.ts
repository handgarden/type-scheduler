import { GlobalUtils } from "../../src/utils/GlobalUtils";

describe(GlobalUtils, () => {
  it("should return global", () => {
    expect(GlobalUtils.getGlobal()).toBe(global);
  });
});
