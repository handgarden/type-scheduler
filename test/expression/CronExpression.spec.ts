import { DayOfMonthOutOfRangeError } from "../../src/error/DayOfMonthOutOfRangeError";
import { DayOfWeekOutOfRangeError } from "../../src/error/DayOfWeekOutOfRangeError";
import { HourOutOfRangeError } from "../../src/error/HourOutOfRangeError";
import { MinuteOutOfRangeError } from "../../src/error/MinuteOutOfRangeError";
import { MonthOutOfRangeError } from "../../src/error/MonthOutOfRangeError";
import { CronExpression } from "../../src/expression";

describe(CronExpression, () => {
  describe("build", () => {
    it("should create every minute", () => {
      const expression = new CronExpression().build();
      expect(expression.toString()).toBe("* * * * *");
    });
  });

  describe("minute", () => {
    it("should create every step minute", () => {
      const expression = new CronExpression().stepMinute(5).build();
      expect(expression.toString()).toBe("*/5 * * * *");
    });

    it("should create range minute", () => {
      const expression = new CronExpression().rangeMinute(5, 10).build();
      expect(expression.toString()).toBe("5-10 * * * *");
    });

    it("should create list minute", () => {
      const expression = new CronExpression().minute(5, 10, 15).build();
      expect(expression.toString()).toBe("5,10,15 * * * *");
    });

    it("should create list minute with unique values", () => {
      const expression = new CronExpression().minute(5, 10, 15, 15).build();
      expect(expression.toString()).toBe("5,10,15 * * * *");
    });

    it("should throw error for minute out of range", () => {
      try {
        new CronExpression().minute(60).build();
      } catch (e) {
        expect(e).toBeInstanceOf(MinuteOutOfRangeError);
      }
    });
  });

  describe("hour", () => {
    it("should create every step hour", () => {
      const expression = new CronExpression().stepHour(5).build();
      expect(expression.toString()).toBe("* */5 * * *");
    });

    it("should create range hour", () => {
      const expression = new CronExpression().rangeHour(5, 10).build();
      expect(expression.toString()).toBe("* 5-10 * * *");
    });

    it("should create list hour", () => {
      const expression = new CronExpression().hour(5, 10, 15).build();
      expect(expression.toString()).toBe("* 5,10,15 * * *");
    });

    it("should create list hour with unique values", () => {
      const expression = new CronExpression().hour(5, 10, 15, 15).build();
      expect(expression.toString()).toBe("* 5,10,15 * * *");
    });

    it("should throw error for hour out of range", () => {
      try {
        new CronExpression().hour(24).build();
      } catch (e) {
        expect(e).toBeInstanceOf(HourOutOfRangeError);
      }
    });
  });

  describe("dayOfMonth", () => {
    it("should create every step day of month", () => {
      const expression = new CronExpression().stepDayOfMonth(5).build();
      expect(expression.toString()).toBe("* * */5 * *");
    });

    it("should create range day of month", () => {
      const expression = new CronExpression().rangeDayOfMonth(5, 10).build();
      expect(expression.toString()).toBe("* * 5-10 * *");
    });

    it("should create list day of month", () => {
      const expression = new CronExpression().dayOfMonth(5, 10, 15).build();
      expect(expression.toString()).toBe("* * 5,10,15 * *");
    });

    it("should create list day of month with unique values", () => {
      const expression = new CronExpression().dayOfMonth(5, 10, 15, 15).build();
      expect(expression.toString()).toBe("* * 5,10,15 * *");
    });

    it("should throw error for day of month out of range", () => {
      try {
        new CronExpression().dayOfMonth(32).build();
      } catch (e) {
        expect(e).toBeInstanceOf(DayOfMonthOutOfRangeError);
      }
    });
  });

  describe("month", () => {
    it("should create every step month", () => {
      const expression = new CronExpression().stepMonth(5).build();
      expect(expression.toString()).toBe("* * * */5 *");
    });

    it("should create range month", () => {
      const expression = new CronExpression().rangeMonth(5, 10).build();
      expect(expression.toString()).toBe("* * * 5-10 *");
    });

    it("should create list month", () => {
      const expression = new CronExpression().month(5, 6, 7).build();
      expect(expression.toString()).toBe("* * * 5,6,7 *");
    });

    it("should create list month with unique values", () => {
      const expression = new CronExpression().month(5, 6, 7, 7).build();
      expect(expression.toString()).toBe("* * * 5,6,7 *");
    });

    it("should throw error for month out of range", () => {
      try {
        new CronExpression().month(13).build();
      } catch (e) {
        expect(e).toBeInstanceOf(MonthOutOfRangeError);
      }
    });
  });

  describe("dayOfWeek", () => {
    it("should create every step day of week", () => {
      const expression = new CronExpression().stepDayOfWeek(5).build();
      expect(expression.toString()).toBe("* * * * */5");
    });

    it("should create range day of week", () => {
      const expression = new CronExpression().rangeDayOfWeek(5, 6).build();
      expect(expression.toString()).toBe("* * * * 5-6");
    });

    it("should create list day of week", () => {
      const expression = new CronExpression().dayOfWeek(5, 6, 0).build();
      expect(expression.toString()).toBe("* * * * 5,6,0");
    });

    it("should create list day of week with unique values", () => {
      const expression = new CronExpression().dayOfWeek(5, 6, 0, 0).build();
      expect(expression.toString()).toBe("* * * * 5,6,0");
    });

    it("should throw error for day of week out of range", () => {
      try {
        new CronExpression().dayOfWeek(7).build();
      } catch (e) {
        expect(e).toBeInstanceOf(DayOfWeekOutOfRangeError);
      }
    });
  });

  describe("complex", () => {
    it("should create complex expression", () => {
      const expression = new CronExpression()
        .stepMinute(5)
        .rangeHour(5, 10)
        .dayOfMonth(5, 10, 15)
        .stepMonth(5)
        .dayOfWeek(5, 6, 0)
        .build();
      expect(expression.toString()).toBe("*/5 5-10 5,10,15 */5 5,6,0");
    });
  });
});
