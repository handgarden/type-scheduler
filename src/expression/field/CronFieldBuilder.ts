import { CronField } from "./CronField";
import { ListCronField } from "./ListCronField";
import { RangeCronField } from "./RangeCronField";
import { StepCronField } from "./StepCronField";
import { CronFieldValidator } from "./validator/CronFieldValidator";
import { WildcardCronField } from "./WildcardCronField";

export class CronFieldBuilder {
  constructor(private readonly validator: CronFieldValidator) {}

  list(values: number[]): CronField {
    for (let value of values) {
      this.validateValue(value);
    }

    return new ListCronField(values);
  }

  range(min: number, max: number): CronField {
    this.validateValue(min);
    this.validateValue(max);

    return new RangeCronField(min, max);
  }

  step(step: number): CronField {
    this.validateValue(step);
    return new StepCronField(step);
  }

  value(value: number): CronField {
    this.validateValue(value);

    return new ListCronField([value]);
  }

  every(): CronField {
    return new WildcardCronField();
  }

  parse(value: string): CronField {
    if (value.includes(",")) {
      const values = value.split(",").map((val) => parseInt(val));
      return this.list(values);
    }
    if (value.includes("-")) {
      const [min, max] = value.split("-").map((val) => parseInt(val));
      return this.range(min, max);
    }
    if (value.includes("/")) {
      const step = parseInt(value.split("/")[1]);
      return this.step(step);
    }
    if (value === "*") {
      return this.every();
    }
    return this.value(parseInt(value));
  }

  private validateValue(value: number): void {
    this.validator.validate(value);
  }
}
