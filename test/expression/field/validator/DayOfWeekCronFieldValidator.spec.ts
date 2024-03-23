import { DayOfWeekCronFieldValidator } from "../../../../src/expression/field/validator/DayOfWeekCronFieldValidator";

describe(DayOfWeekCronFieldValidator, () => {
  const validator = new DayOfWeekCronFieldValidator();

  describe("validate", () => {
    it("should throw error when value is less than 0", () => {
      expect(() => validator.validate(-1)).toThrow();
    });

    it("should throw error when value is greater than 7", () => {
      expect(() => validator.validate(8)).toThrow();
    });
  });
});
