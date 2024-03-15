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

  stepMinute(step: number): this {
    this._minute = CronField.STEP(step);
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

  stepHour(step: number): this {
    this._hour = CronField.STEP(step);
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

  stepDayOfMonth(step: number): this {
    this._dayOfMonth = CronField.STEP(step);
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

  stepMonth(step: number): this {
    this._month = CronField.STEP(step);
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

  stepDayOfWeek(step: number): this {
    this._dayOfWeek = CronField.STEP(step);
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
