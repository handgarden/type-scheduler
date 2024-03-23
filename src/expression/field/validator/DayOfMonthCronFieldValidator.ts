import { DayOfMonthOutOfRangeError } from "../../../error/DayOfMonthOutOfRangeError";
import { CronFieldValidator } from "./CronFieldValidator";

export class DayOfMonthCronFieldValidator implements CronFieldValidator {
  private readonly min: number = 1;
  private readonly max: number = 31;

  validate(value: number): void {
    if (value < this.min || value > this.max) {
      throw new DayOfMonthOutOfRangeError(value);
    }
  }
}
