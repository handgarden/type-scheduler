import { CronField } from "./CronField";

export class ListCronField implements CronField {
  values: number[];
  constructor(values: number[]) {
    this.values = this.uniqueValues(values);
  }

  private uniqueValues(values: number[]): number[] {
    return [...new Set(values)];
  }

  build(): string {
    return this.values.join(",");
  }
}
