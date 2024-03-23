import { CronFieldBuilder } from "../../../src/expression/field/CronFieldBuilder";
import { ListCronField } from "../../../src/expression/field/ListCronField";
import { RangeCronField } from "../../../src/expression/field/RangeCronField";
import { StepCronField } from "../../../src/expression/field/StepCronField";
import { CronFieldValidator } from "../../../src/expression/field/validator/CronFieldValidator";
import { WildcardCronField } from "../../../src/expression/field/WildcardCronField";

describe(CronFieldBuilder, () => {
  let builder: CronFieldBuilder;
  let validator: CronFieldValidator;

  beforeEach(() => {
    validator = {
      validate: jest.fn(),
    };
    builder = new CronFieldBuilder(validator);
  });

  describe("list", () => {
    it("should return ListCronField", () => {
      expect(builder.list(1, 2)).toBeInstanceOf(ListCronField);
    });

    it("return ListCronField should join values with comma", () => {
      const field = builder.list(1, 2);
      expect(field.build()).toBe("1,2");
    });

    it("should validate values", () => {
      builder.list(1, 2);
      expect(validator.validate).toHaveBeenCalledWith(2);
    });

    it("should throw error when validation fails", () => {
      validator.validate = jest.fn(() => {
        throw new Error("Invalid value");
      });

      try {
        builder.list(1, 2);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Invalid value");
      }
    });
  });

  describe("range", () => {
    it("should return a RangeCronField", () => {
      expect(builder.range(1, 2)).toBeInstanceOf(RangeCronField);
    });

    it("return RangeCronField should join values with hyphen", () => {
      const field = builder.range(1, 2);
      expect(field.build()).toBe("1-2");
    });

    it("should validate values", () => {
      builder.range(1, 2);
      expect(validator.validate).toHaveBeenCalledWith(2);
    });

    it("should throw error when validation fails", () => {
      validator.validate = jest.fn(() => {
        throw new Error("Invalid value");
      });

      try {
        builder.range(1, 2);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Invalid value");
      }
    });
  });

  describe("step", () => {
    it("should return a StepCronField", () => {
      expect(builder.step(1)).toBeInstanceOf(StepCronField);
    });

    it("return StepCronField should have a step value", () => {
      const field = builder.step(1);
      expect(field.build()).toBe("*/1");
    });

    it("should validate step", () => {
      builder.step(1);
      expect(validator.validate).toHaveBeenCalledWith(1);
    });

    it("should throw error when validation fails", () => {
      validator.validate = jest.fn(() => {
        throw new Error("Invalid value");
      });

      try {
        builder.step(1);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Invalid value");
      }
    });
  });

  describe("every", () => {
    it("should return a WildcardCronField", () => {
      expect(builder.every()).toBeInstanceOf(WildcardCronField);
    });

    it("return WildcardCronField should have a wildcard value", () => {
      const field = builder.every();
      expect(field.build()).toBe("*");
    });
  });

  describe("value", () => {
    it("should return a ListCronField", () => {
      expect(builder.value(1)).toBeInstanceOf(ListCronField);
    });

    it("return ListCronField should have a single value", () => {
      const field = builder.value(1);
      expect(field.build()).toBe("1");
    });

    it("should validate values", () => {
      builder.value(1);
      expect(validator.validate).toHaveBeenCalledWith(1);
    });
  });
});
