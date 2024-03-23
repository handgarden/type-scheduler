import { RangeCronField } from "../../../src/expression/field/RangeCronField";

describe(RangeCronField, () => {
  it("should return min, max input to `${min}-${max}` string", () => {
    const field = new RangeCronField(0, 5);
    expect(field.build()).toEqual("0-5");
  });
});
