import { ArrayUtils } from "../../src/utils/ArrayUtils";

describe(ArrayUtils, () => {
  describe("unique", () => {
    it("should return unique values", () => {
      const array = [1, 2, 3, 3, 4, 5, 5, 6];
      const uniqueArray = ArrayUtils.unique(array);
      expect(uniqueArray).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
