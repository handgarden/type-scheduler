export class CronStepOutOfRangeError extends Error {
  constructor(step: number) {
    super(`Step ${step} is out of range`);
  }
}
