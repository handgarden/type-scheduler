import { ListCronField } from "../../../src/expression/field/ListCronField";

describe(ListCronField, () => {
  it("should join values with comma", () => {
    const field = new ListCronField([1, 2, 3]);
    expect(field.build()).toBe("1,2,3");
  });

  it("should return unique values", () => {
    const field = new ListCronField([1, 2, 2, 3, 3, 3]);
    expect(field.build()).toBe("1,2,3");
  });
});
