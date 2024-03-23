import { MonthCronFieldValidator } from "../../../../src/expression/field/validator/MonthCronFieldValidator";

describe(MonthCronFieldValidator, () => {
  const validator = new MonthCronFieldValidator();

  describe("validate", () => {
    it("should throw error when value is less than 1", () => {
      expect(() => validator.validate(0)).toThrow();
    });

    it("should throw error when value is greater than 12", () => {
      expect(() => validator.validate(13)).toThrow();
    });
  });
});
