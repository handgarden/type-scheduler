export class MonthOutOfRangeError extends Error {
  constructor(month: number) {
    super(`
      Cannot create a cron expression with a month out of range.
      Month must be between 1 and 12.
      Received: ${month}
    `);
  }
}
