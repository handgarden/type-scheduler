import { CronField } from "./CronField";

export class RangeCronField implements CronField {
  constructor(public readonly min: number, public readonly max: number) {}
  build() {
    return `${this.min}-${this.max}`;
  }
}
