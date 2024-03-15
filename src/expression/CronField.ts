export class CronField {
  static readonly EVERY = "*";
  static readonly LIST = (values: (string | number)[]) => values.join(",");
  static readonly RANGE = (from: number, to: number) => `${from}-${to}`;
  static readonly STEP = (step: number) => `*/${step}`;
}
