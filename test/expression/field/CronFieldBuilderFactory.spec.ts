import { CronDayOfMonthOutOfRangeError } from "../../../src/error/CronDayOfMonthOutOfRangeError";
import { CronDayOfWeekOutOfRangeError } from "../../../src/error/CronDayOfWeekOutOfRangeError";
import { CronHourOutOfRangeError } from "../../../src/error/CronHourOutOfRangeError";
import { CronMinuteOutOfRangeError } from "../../../src/error/CronMinuteOutOfRangeError";
import { CronMonthOutOfRangeError } from "../../../src/error/CronMonthOutOfRangeError";
import { CronFieldBuilderFactory } from "../../../src/expression/field/CronFieldBuilderFactory";

describe(CronFieldBuilderFactory, () => {
  const factory = new CronFieldBuilderFactory();

  describe("minute", () => {
    it("should return a CronFieldBuilder", () => {
      expect(factory.minute()).toBeDefined();
    });

    it("Returned CronFieldBuilder constructed with MinuteCronFieldValidator so that when the value is not valid, it throws MinuteOutOfRange", () => {
      const builder = factory.minute();
      try {
        builder.value(60);
      } catch (e) {
        expect(e).toBeInstanceOf(CronMinuteOutOfRangeError);
      }
    });
  });

  describe("hour", () => {
    it("should return a CronFieldBuilder", () => {
      expect(factory.hour()).toBeDefined();
    });

    it("Returned CronFieldBuilder constructed with HourCronFieldValidator so that when the value is not valid, it throws HourOutOfRange", () => {
      const builder = factory.hour();
      try {
        builder.value(24);
      } catch (e) {
        expect(e).toBeInstanceOf(CronHourOutOfRangeError);
      }
    });
  });

  describe("dayOfMonth", () => {
    it("should return a CronFieldBuilder", () => {
      expect(factory.dayOfMonth()).toBeDefined();
    });

    it("Returned CronFieldBuilder constructed with DayOfMonthCronFieldValidator so that when the value is not valid, it throws DayOfMonthOutOfRange", () => {
      const builder = factory.dayOfMonth();
      try {
        builder.value(0);
      } catch (e) {
        expect(e).toBeInstanceOf(CronDayOfMonthOutOfRangeError);
      }
    });
  });

  describe("month", () => {
    it("should return a CronFieldBuilder", () => {
      expect(factory.month()).toBeDefined();
    });

    it("Returned CronFieldBuilder constructed with MonthCronFieldValidator so that when the value is not valid, it throws MonthOutOfRange", () => {
      const builder = factory.month();
      try {
        builder.value(13);
      } catch (e) {
        expect(e).toBeInstanceOf(CronMonthOutOfRangeError);
      }
    });
  });

  describe("dayOfWeek", () => {
    it("should return a CronFieldBuilder", () => {
      expect(factory.dayOfWeek()).toBeDefined();
    });

    it("Returned CronFieldBuilder constructed with DayOfWeekCronFieldValidator so that when the value is not valid, it throws DayOfWeekOutOfRange", () => {
      const builder = factory.dayOfWeek();
      try {
        builder.value(7);
      } catch (e) {
        expect(e).toBeInstanceOf(CronDayOfWeekOutOfRangeError);
      }
    });
  });
});
