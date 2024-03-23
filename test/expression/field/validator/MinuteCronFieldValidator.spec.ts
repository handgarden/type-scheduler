import { MinuteCronFieldValidator } from "../../../../src/expression/field/validator/MinuteCronFieldValidator";

describe(MinuteCronFieldValidator, () => {
  const validator = new MinuteCronFieldValidator();

  describe("validate", () => {
    it("should throw error when value is less than 0", () => {
      expect(() => validator.validate(-1)).toThrow();
    });

    it("should throw error when value is greater than 59", () => {
      expect(() => validator.validate(60)).toThrow();
    });
  });
});
