import { WildcardCronField } from "../../../src/expression/field/WildcardCronField";

describe(WildcardCronField, () => {
  it("should return `*`", () => {
    const field = new WildcardCronField();
    expect(field.build()).toBe("*");
  });
});
