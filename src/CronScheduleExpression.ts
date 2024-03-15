import { CronField } from "./CronField";

export class CronScheduleExpression {
  private readonly _minute: CronField = CronField.EVERY;
  private readonly _hour: CronField = CronField.EVERY;
  private readonly _dayOfMonth: CronField = CronField.EVERY;
  private readonly _month: CronField = CronField.EVERY;
  private readonly _dayOfWeek: CronField = CronField.EVERY;

  private constructor({
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
  }: {
    minute: CronField;
    hour: CronField;
    dayOfMonth: CronField;
    month: CronField;
    dayOfWeek: CronField;
  }) {
    this._minute = minute;
    this._hour = hour;
    this._dayOfMonth = dayOfMonth;
    this._month = month;
    this._dayOfWeek = dayOfWeek;
  }

  toString(): string {
    return `${this._minute} ${this._hour} ${this._dayOfMonth} ${this._month} ${this._dayOfWeek}`;
  }

  static EVERT_MINUTE = new CronScheduleExpression({
    minute: "*",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  });

  static Builder = class {
    private _minute: CronField = "*";
    private _hour: CronField = "*";
    private _dayOfMonth: CronField = "*";
    private _month: CronField = "*";
    private _dayOfWeek: CronField = "*";

    minute(minute: CronField): this {
      this._minute = minute;
      return this;
    }

    hour(hour: CronField): this {
      this._hour = hour;
      return this;
    }

    dayOfMonth(dayOfMonth: CronField): this {
      this._dayOfMonth = dayOfMonth;
      return this;
    }

    month(month: CronField): this {
      this._month = month;
      return this;
    }

    dayOfWeek(dayOfWeek: CronField): this {
      this._dayOfWeek = dayOfWeek;
      return this;
    }

    build(): CronScheduleExpression {
      return new CronScheduleExpression({
        minute: this._minute,
        hour: this._hour,
        dayOfMonth: this._dayOfMonth,
        month: this._month,
        dayOfWeek: this._dayOfWeek,
      });
    }
  };
}
