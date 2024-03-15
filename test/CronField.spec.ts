import { CronField } from "../src/CronField";

describe(CronField, () => {
  it("should return * for every", () => {
    expect(CronField.EVERY).toBe("*");
  });
  it("should return */ for every step", () => {
    expect(CronField.EVERY_STEP(2)).toBe("*/2");
  });

  it("should return list", () => {
    expect(CronField.LIST(["1", "2", "3"])).toBe("1,2,3");
  });

  it("should return range", () => {
    expect(CronField.RANGE(1, 5)).toBe("1-5");
  });

  it("should return step", () => {
    expect(CronField.STEP(1, 2)).toBe("1/2");
  });
});
