export class StepOutOfRangeError extends Error {
  constructor(step: number) {
    super(`Step ${step} is out of range`);
  }
}
