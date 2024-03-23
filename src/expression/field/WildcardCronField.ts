import { CronField } from "./CronField";

export class WildcardCronField implements CronField {
  constructor() {}
  build(): string {
    return "*";
  }
}
