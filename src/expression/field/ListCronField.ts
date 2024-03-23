import { CronField } from "./CronField";

export class ListCronField implements CronField {
  values: number[];
  constructor(values: number[]) {
    this.values = values;
  }

  build(): string {
    return this.values.join(",");
  }
}
