import { CronField } from "./field/CronField";
import { CronFieldBuilderFactory } from "./field/CronFieldBuilderFactory";
import { WildcardCronField } from "./field/WildcardCronField";
import { CronFieldFactory } from "./field/CronFieldFactory";

export class CronExpression {
  private readonly builderFactory: CronFieldBuilderFactory =
    new CronFieldBuilderFactory();
  private _minute: CronField = new WildcardCronField();
  private _hour: CronField = new WildcardCronField();
  private _dayOfMonth: CronField = new WildcardCronField();
  private _month: CronField = new WildcardCronField();
  private _dayOfWeek: CronField = new WildcardCronField();

  public minute(factory: CronFieldFactory): this {
    const minuteBuilder = this.builderFactory.minute();
    this._minute = factory(minuteBuilder);
    return this;
  }

  public hour(factory: CronFieldFactory): this {
    const hourBuilder = this.builderFactory.hour();
    this._hour = factory(hourBuilder);
    return this;
  }

  public dayOfMonth(factory: CronFieldFactory): this {
    const dayOfMonthBuilder = this.builderFactory.dayOfMonth();
    this._dayOfMonth = factory(dayOfMonthBuilder);
    return this;
  }

  public month(factory: CronFieldFactory): this {
    const monthBuilder = this.builderFactory.month();
    this._month = factory(monthBuilder);
    return this;
  }

  public dayOfWeek(factory: CronFieldFactory): this {
    const dayOfWeekBuilder = this.builderFactory.dayOfWeek();
    this._dayOfWeek = factory(dayOfWeekBuilder);
    return this;
  }

  public build(): string {
    return `${this._minute.build()} ${this._hour.build()} ${this._dayOfMonth.build()} ${this._month.build()} ${this._dayOfWeek.build()}`;
  }
}
