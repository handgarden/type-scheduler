import { CronScheduleExpression } from "../../src/expression";

describe(CronScheduleExpression, () => {
  describe("build", () => {
    it("should create every minute", () => {
      const expression = new CronScheduleExpression().build();
      expect(expression.toString()).toBe("* * * * *");
    });
  });

  describe("minute", () => {
    it("should create every step minute", () => {
      const expression = new CronScheduleExpression().stepMinute(5).build();
      expect(expression.toString()).toBe("*/5 * * * *");
    });

    it("should create range minute", () => {
      const expression = new CronScheduleExpression()
        .rangeMinute(5, 10)
        .build();
      expect(expression.toString()).toBe("5-10 * * * *");
    });
  });

  describe("hour", () => {
    it("should create every step hour", () => {
      const expression = new CronScheduleExpression().stepHour(5).build();
      expect(expression.toString()).toBe("* */5 * * *");
    });

    it("should create range hour", () => {
      const expression = new CronScheduleExpression().rangeHour(5, 10).build();
      expect(expression.toString()).toBe("* 5-10 * * *");
    });
  });

  describe("dayOfMonth", () => {
    it("should create every step day of month", () => {
      const expression = new CronScheduleExpression().stepDayOfMonth(5).build();
      expect(expression.toString()).toBe("* * */5 * *");
    });

    it("should create range day of month", () => {
      const expression = new CronScheduleExpression()
        .rangeDayOfMonth(5, 10)
        .build();
      expect(expression.toString()).toBe("* * 5-10 * *");
    });
  });

  describe("month", () => {
    it("should create every step month", () => {
      const expression = new CronScheduleExpression().stepMonth(5).build();
      expect(expression.toString()).toBe("* * * */5 *");
    });
  });

  describe("dayOfWeek", () => {
    it("should create every step day of week", () => {
      const expression = new CronScheduleExpression().stepDayOfWeek(5).build();
      expect(expression.toString()).toBe("* * * * */5");
    });

    it("should create range day of week", () => {
      const expression = new CronScheduleExpression()
        .rangeDayOfWeek(5, 10)
        .build();
      expect(expression.toString()).toBe("* * * * 5-10");
    });
  });

  describe("complex", () => {
    it("should create complex expression", () => {
      const expression = new CronScheduleExpression()
        .stepMinute(5)
        .rangeHour(5, 10)
        .stepDayOfMonth(5)
        .rangeMonth(5, 10)
        .rangeDayOfWeek(5, 10)
        .build();
      expect(expression.toString()).toBe("*/5 5-10 */5 5-10 5-10");
    });
  });
});
