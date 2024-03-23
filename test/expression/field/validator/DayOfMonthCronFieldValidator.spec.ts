import { DayOfMonthCronFieldValidator } from "../../../../src/expression/field/validator/DayOfMonthCronFieldValidator";

describe(DayOfMonthCronFieldValidator, () => {
  const validator = new DayOfMonthCronFieldValidator();

  describe("validate", () => {
    it("should throw error when value is less than 1", () => {
      expect(() => validator.validate(0)).toThrow();
    });

    it("should throw error when value is greater than 31", () => {
      expect(() => validator.validate(32)).toThrow();
    });
  });
});
