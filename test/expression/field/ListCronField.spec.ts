import { ListCronField } from "../../../src/expression/field/ListCronField";

describe(ListCronField, () => {
  it("should join values with comma", () => {
    const field = new ListCronField([1, 2, 3]);
    expect(field.build()).toBe("1,2,3");
  });
});
