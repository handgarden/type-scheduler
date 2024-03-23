export class InvalidCronRangeError extends Error {
  constructor(min: number, max: number) {
    super(
      `Invalid range. Min: ${min}, Max: ${max}. Max must be greater than or equal to Min.`
    );
  }
}
