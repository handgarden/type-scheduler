import { CronField } from "./CronField";

export class StepCronField implements CronField {
  constructor(public readonly step: number) {}

  build(): string {
    return `*/${this.step}`;
  }
}
