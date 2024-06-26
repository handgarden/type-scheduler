import { CronMinuteOutOfRangeError } from "../../../error/CronMinuteOutOfRangeError";
import { CronFieldValidator } from "./CronFieldValidator";

export class MinuteCronFieldValidator implements CronFieldValidator {
  private readonly min: number = 0;
  private readonly max: number = 59;

  validate(value: number): void {
    if (value < this.min || value > this.max) {
      throw new CronMinuteOutOfRangeError(value);
    }
  }
}
