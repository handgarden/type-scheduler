export class CronField {
  static readonly EVERY = "*";
  static readonly VALUE = (value: number) => value;
  static readonly LIST = (values: number[]) => values.join(",");
  static readonly RANGE = (from: number, to: number) => `${from}-${to}`;
  static readonly STEP = (step: number) => `*/${step}`;
}
