import { CronHourOutOfRangeError } from "../../../error/CronHourOutOfRangeError";
import { CronFieldValidator } from "./CronFieldValidator";

export class HourCronFieldValidator implements CronFieldValidator {
  private readonly min: number = 0;
  private readonly max: number = 23;

  validate(value: number): void {
    if (value < this.min || value > this.max) {
      throw new CronHourOutOfRangeError(value);
    }
  }
}
