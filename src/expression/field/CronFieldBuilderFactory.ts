import { CronFieldBuilder } from "./CronFieldBuilder";
import { DayOfMonthCronFieldValidator } from "./validator/DayOfMonthCronFieldValidator";
import { HourCronFieldValidator } from "./validator/HourCronFieldValidator";
import { MinuteCronFieldValidator } from "./validator/MinuteCronFieldValidator";
import { MonthCronFieldValidator } from "./validator/MonthCronFieldValidator";

export class CronFieldBuilderFactory {
  minute() {
    return new CronFieldBuilder(new MinuteCronFieldValidator());
  }

  hour() {
    return new CronFieldBuilder(new HourCronFieldValidator());
  }

  dayOfMonth() {
    return new CronFieldBuilder(new DayOfMonthCronFieldValidator());
  }

  month() {
    return new CronFieldBuilder(new MonthCronFieldValidator());
  }

  dayOfWeek() {
    return new CronFieldBuilder(new DayOfMonthCronFieldValidator());
  }
}
