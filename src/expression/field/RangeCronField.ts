import { InvalidCronRangeError } from "../../error/InvalidCronRangeError";
import { CronField } from "./CronField";

export class RangeCronField implements CronField {
  constructor(public readonly min: number, public readonly max: number) {
    if (this.isMinGreaterThanMax()) {
      throw new InvalidCronRangeError(min, max);
    }
  }
  private isMinGreaterThanMax(): boolean {
    return this.min > this.max;
  }

  build() {
    return `${this.min}-${this.max}`;
  }
}
