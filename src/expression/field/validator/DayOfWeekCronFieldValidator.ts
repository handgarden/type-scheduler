import { DayOfWeekOutOfRangeError } from "../../../error/DayOfWeekOutOfRangeError";
import { CronFieldValidator } from "./CronFieldValidator";

export class DayOfWeekCronFieldValidator implements CronFieldValidator {
  private readonly min: number = 0;
  private readonly max: number = 6;

  validate(value: number): void {
    if (value < this.min || value > this.max) {
      throw new DayOfWeekOutOfRangeError(value);
    }
  }
}
