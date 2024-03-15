export class CronField {
  static readonly EVERY = "*";
  static readonly EVERY_STEP = (step: number) => `*/${step}`;
  static readonly LIST = (values: (string | number)[]) => values.join(",");
  static readonly RANGE = (from: number, to: number) => `${from}-${to}`;
  static readonly STEP = (start: number, interval: number) =>
    `${start}/${interval}`;
}
