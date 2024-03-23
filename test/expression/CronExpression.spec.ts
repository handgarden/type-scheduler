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
      expect(expression).toBe("* * * * *");
    });
  });

  describe("minute", () => {
    it("should create every step minute", () => {
      const expression = new CronExpression()
        .minute((minute) => minute.step(5))
        .build();
      expect(expression).toBe("*/5 * * * *");
    });

    it("should create range minute", () => {
      const expression = new CronExpression()
        .minute((minute) => minute.range(5, 10))
        .build();
      expect(expression).toBe("5-10 * * * *");
    });

    it("should create list minute", () => {
      const expression = new CronExpression()
        .minute((minute) => minute.list(5, 10, 15))
        .build();
      expect(expression).toBe("5,10,15 * * * *");
    });

    it("should create list minute with unique values", () => {
      const expression = new CronExpression()
        .minute((minute) => minute.list(5, 10, 15, 15))
        .build();
      expect(expression).toBe("5,10,15 * * * *");
    });

    it("should throw error for minute out of range", () => {
      try {
        new CronExpression().minute((minute) => minute.value(60)).build();
      } catch (e) {
        expect(e).toBeInstanceOf(MinuteOutOfRangeError);
      }
    });
  });

  describe("hour", () => {
    it("should create every step hour", () => {
      const expression = new CronExpression()
        .hour((hour) => hour.step(5))
        .build();
      expect(expression.toString()).toBe("* */5 * * *");
    });

    it("should create range hour", () => {
      const expression = new CronExpression()
        .hour((hour) => hour.range(5, 10))
        .build();
      expect(expression.toString()).toBe("* 5-10 * * *");
    });

    it("should create list hour", () => {
      const expression = new CronExpression()
        .hour((hour) => hour.list(5, 10, 15))
        .build();
      expect(expression.toString()).toBe("* 5,10,15 * * *");
    });

    it("should create list hour with unique values", () => {
      const expression = new CronExpression()
        .hour((hour) => hour.list(5, 10, 15, 15))
        .build();
      expect(expression.toString()).toBe("* 5,10,15 * * *");
    });

    it("should throw error for hour out of range", () => {
      try {
        new CronExpression().hour((hour) => hour.value(24)).build();
      } catch (e) {
        expect(e).toBeInstanceOf(HourOutOfRangeError);
      }
    });
  });

  describe("dayOfMonth", () => {
    it("should create every step day of month", () => {
      const expression = new CronExpression()
        .dayOfMonth((dayOfMonth) => dayOfMonth.step(5))
        .build();
      expect(expression.toString()).toBe("* * */5 * *");
    });

    it("should create range day of month", () => {
      const expression = new CronExpression()
        .dayOfMonth((dayOfMonth) => dayOfMonth.range(5, 10))
        .build();
      expect(expression.toString()).toBe("* * 5-10 * *");
    });

    it("should create list day of month", () => {
      const expression = new CronExpression()
        .dayOfMonth((dayOfMonth) => dayOfMonth.list(5, 10, 15))
        .build();
      expect(expression.toString()).toBe("* * 5,10,15 * *");
    });

    it("should create list day of month with unique values", () => {
      const expression = new CronExpression()
        .dayOfMonth((dayOfMonth) => dayOfMonth.list(5, 10, 15, 15))
        .build();
      expect(expression.toString()).toBe("* * 5,10,15 * *");
    });

    it("should throw error for day of month out of range", () => {
      try {
        new CronExpression()
          .dayOfMonth((dayOfMonth) => dayOfMonth.value(0))
          .build();
      } catch (e) {
        expect(e).toBeInstanceOf(DayOfMonthOutOfRangeError);
      }
    });
  });

  describe("month", () => {
    it("should create every step month", () => {
      const expression = new CronExpression()
        .month((month) => month.step(5))
        .build();
      expect(expression.toString()).toBe("* * * */5 *");
    });

    it("should create range month", () => {
      const expression = new CronExpression()
        .month((month) => month.range(5, 10))
        .build();
      expect(expression.toString()).toBe("* * * 5-10 *");
    });

    it("should create list month", () => {
      const expression = new CronExpression()
        .month((month) => month.list(5, 10, 11))
        .build();
      expect(expression.toString()).toBe("* * * 5,10,11 *");
    });

    it("should create list month with unique values", () => {
      const expression = new CronExpression()
        .month((month) => month.list(5, 10, 11, 11))
        .build();
      expect(expression.toString()).toBe("* * * 5,10,11 *");
    });

    it("should throw error for month out of range", () => {
      try {
        new CronExpression().month((month) => month.value(13)).build();
      } catch (e) {
        expect(e).toBeInstanceOf(MonthOutOfRangeError);
      }
    });
  });

  describe("dayOfWeek", () => {
    it("should create every step day of week", () => {
      const expression = new CronExpression()
        .dayOfWeek((dayOfWeek) => dayOfWeek.step(5))
        .build();
      expect(expression.toString()).toBe("* * * * */5");
    });

    it("should create range day of week", () => {
      const expression = new CronExpression()
        .dayOfWeek((dayOfWeek) => dayOfWeek.range(5, 10))
        .build();
      expect(expression.toString()).toBe("* * * * 5-10");
    });

    it("should create list day of week", () => {
      const expression = new CronExpression()
        .dayOfWeek((dayOfWeek) => dayOfWeek.list(5, 6, 1))
        .build();
      expect(expression.toString()).toBe("* * * * 5,6,1");
    });

    it("should create list day of week with unique values", () => {
      const expression = new CronExpression()
        .dayOfWeek((dayOfWeek) => dayOfWeek.list(5, 6, 1, 1))
        .build();
      expect(expression.toString()).toBe("* * * * 5,6,1");
    });

    it("should throw error for day of week out of range", () => {
      try {
        new CronExpression()
          .dayOfWeek((dayOfWeek) => dayOfWeek.value(7))
          .build();
      } catch (e) {
        expect(e).toBeInstanceOf(DayOfWeekOutOfRangeError);
      }
    });
  });

  describe("complex", () => {
    it("should create complex expression", () => {
      const expression = new CronExpression()
        .minute((minute) => minute.step(5))
        .hour((hour) => hour.range(5, 10))
        .dayOfMonth((dayOfMonth) => dayOfMonth.list(5, 10, 11))
        .month((month) => month.step(5))
        .dayOfWeek((dayOfWeek) => dayOfWeek.list(5, 6, 1))
        .build();
      expect(expression).toBe("*/5 5-10 5,10,11 */5 5,6,1");
    });
  });
});
