import { StepCronField } from "../../../src/expression/field/StepCronField";

describe(StepCronField, () => {
  it("should return value with step input to `*/${step}` string", () => {
    const field = new StepCronField(5);
    expect(field.build()).toEqual("*/5");
  });
});
