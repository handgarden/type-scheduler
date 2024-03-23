import { MonthOutOfRangeError } from "../../../error/MonthOutOfRangeError";
import { CronFieldValidator } from "./CronFieldValidator";

export class MonthCronFieldValidator implements CronFieldValidator {
  private readonly min: number = 1;
  private readonly max: number = 12;

  validate(value: number): void {
    if (value < this.min || value > this.max) {
      throw new MonthOutOfRangeError(value);
    }
  }
}
