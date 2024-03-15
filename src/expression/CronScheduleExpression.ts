import { CronField } from "./CronField";

export class CronScheduleExpression {
  private _minute: CronField = CronField.EVERY;
  private _hour: CronField = CronField.EVERY;
  private _dayOfMonth: CronField = CronField.EVERY;
  private _month: CronField = CronField.EVERY;
  private _dayOfWeek: CronField = CronField.EVERY;

  minute(minute: CronField): this {
    this._minute = minute;
    return this;
  }

  everyStepMinute(step: number): this {
    this._minute = CronField.EVERY_STEP(step);
    return this;
  }

  rangeMinute(start: number, end: number): this {
    this._minute = CronField.RANGE(start, end);
    return this;
  }

  hour(hour: CronField): this {
    this._hour = hour;
    return this;
  }

  everyStepHour(step: number): this {
    this._hour = CronField.EVERY_STEP(step);
    return this;
  }

  rangeHour(start: number, end: number): this {
    this._hour = CronField.RANGE(start, end);
    return this;
  }

  dayOfMonth(dayOfMonth: CronField): this {
    this._dayOfMonth = dayOfMonth;
    return this;
  }

  everyStepDayOfMonth(step: number): this {
    this._dayOfMonth = CronField.EVERY_STEP(step);
    return this;
  }

  rangeDayOfMonth(start: number, end: number): this {
    this._dayOfMonth = CronField.RANGE(start, end);
    return this;
  }

  month(month: CronField): this {
    this._month = month;
    return this;
  }

  everyStepMonth(step: number): this {
    this._month = CronField.EVERY_STEP(step);
    return this;
  }

  rangeMonth(start: number, end: number): this {
    this._month = CronField.RANGE(start, end);
    return this;
  }

  dayOfWeek(dayOfWeek: CronField): this {
    this._dayOfWeek = dayOfWeek;
    return this;
  }

  everyStepDayOfWeek(step: number): this {
    this._dayOfWeek = CronField.EVERY_STEP(step);
    return this;
  }

  rangeDayOfWeek(start: number, end: number): this {
    this._dayOfWeek = CronField.RANGE(start, end);
    return this;
  }

  build(): string {
    return `${this._minute} ${this._hour} ${this._dayOfMonth} ${this._month} ${this._dayOfWeek}`;
  }

  static EVERY_MINUTE = new CronScheduleExpression().build();
}
