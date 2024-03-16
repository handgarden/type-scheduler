import { DayOfMonthOutOfRangeError } from "../error/DayOfMonthOutOfRangeError";
import { DayOfWeekOutOfRangeError } from "../error/DayOfWeekOutOfRangeError";
import { HourOutOfRangeError } from "../error/HourOutOfRangeError";
import { MinuteOutOfRangeError } from "../error/MinuteOutOfRangeError";
import { MonthOutOfRangeError } from "../error/MonthOutOfRangeError";
import { ArrayUtils } from "../utils/ArrayUtils";
import { CronField } from "./CronField";

export class CronExpression {
  private _minute: CronField = CronField.EVERY;
  private _hour: CronField = CronField.EVERY;
  private _dayOfMonth: CronField = CronField.EVERY;
  private _month: CronField = CronField.EVERY;
  private _dayOfWeek: CronField = CronField.EVERY;

  public minute(...minutes: number[]): this {
    for (let minute of minutes) {
      this.validateMinute(minute);
    }

    this._minute = CronField.LIST(ArrayUtils.unique(minutes));

    return this;
  }

  public stepMinute(step: number): this {
    this._minute = CronField.STEP(step);
    return this;
  }

  public rangeMinute(start: number, end: number): this {
    this.validateMinute(start);
    this.validateMinute(end);

    this._minute = CronField.RANGE(start, end);
    return this;
  }

  public hour(...hours: number[]): this {
    for (let hour of hours) {
      this.validateHour(hour);
    }

    this._hour = CronField.LIST(ArrayUtils.unique(hours));
    return this;
  }

  public stepHour(step: number): this {
    this._hour = CronField.STEP(step);
    return this;
  }

  public rangeHour(start: number, end: number): this {
    this.validateHour(start);
    this.validateHour(end);

    this._hour = CronField.RANGE(start, end);
    return this;
  }

  public dayOfMonth(...dayOfMonths: number[]): this {
    for (let dayOfMonth of dayOfMonths) {
      this.validateDayOfMonth(dayOfMonth);
    }

    this._dayOfMonth = CronField.LIST(ArrayUtils.unique(dayOfMonths));
    return this;
  }

  public stepDayOfMonth(step: number): this {
    this._dayOfMonth = CronField.STEP(step);
    return this;
  }

  public rangeDayOfMonth(start: number, end: number): this {
    this.validateDayOfMonth(start);
    this.validateDayOfMonth(end);

    this._dayOfMonth = CronField.RANGE(start, end);
    return this;
  }

  public month(...months: number[]): this {
    for (let month of months) {
      this.validateMonth(month);
    }

    this._month = CronField.LIST(ArrayUtils.unique(months));
    return this;
  }

  public stepMonth(step: number): this {
    this._month = CronField.STEP(step);
    return this;
  }

  public rangeMonth(start: number, end: number): this {
    this.validateMonth(start);
    this.validateMonth(end);

    this._month = CronField.RANGE(start, end);
    return this;
  }

  public dayOfWeek(...dayOfWeeks: number[]): this {
    for (let dayOfWeek of dayOfWeeks) {
      this.validateDayOfWeek(dayOfWeek);
    }
    this._dayOfWeek = CronField.LIST(ArrayUtils.unique(dayOfWeeks));
    return this;
  }

  public stepDayOfWeek(step: number): this {
    this._dayOfWeek = CronField.STEP(step);
    return this;
  }

  public rangeDayOfWeek(start: number, end: number): this {
    this.validateDayOfWeek(start);
    this.validateDayOfWeek(end);

    this._dayOfWeek = CronField.RANGE(start, end);
    return this;
  }

  public build(): string {
    return `${this._minute} ${this._hour} ${this._dayOfMonth} ${this._month} ${this._dayOfWeek}`;
  }

  static EVERY_MINUTE = new CronExpression().build();

  private validateMinute(minute: number) {
    if (minute < 0 || minute > 59) {
      throw new MinuteOutOfRangeError(minute);
    }
  }

  private validateHour(hour: number) {
    if (hour < 0 || hour > 23) {
      throw new HourOutOfRangeError(hour);
    }
  }

  private validateDayOfMonth(dayOfMonth: number) {
    if (dayOfMonth < 1 || dayOfMonth > 31) {
      throw new DayOfMonthOutOfRangeError(dayOfMonth);
    }
  }

  private validateMonth(month: number) {
    if (month < 1 || month > 12) {
      throw new MonthOutOfRangeError(month);
    }
  }

  private validateDayOfWeek(dayOfWeek: number) {
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new DayOfWeekOutOfRangeError(dayOfWeek);
    }
  }
}
