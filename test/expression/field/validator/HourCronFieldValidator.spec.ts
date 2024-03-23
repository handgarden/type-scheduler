import { HourCronFieldValidator } from "../../../../src/expression/field/validator/HourCronFieldValidator";

describe(HourCronFieldValidator, () => {
  const validator = new HourCronFieldValidator();

  describe("validate", () => {
    it("should throw error when value is less than 0", () => {
      expect(() => validator.validate(-1)).toThrow();
    });

    it("should throw error when value is greater than 23", () => {
      expect(() => validator.validate(24)).toThrow();
    });
  });
});
