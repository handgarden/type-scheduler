export class DayOfMonthOutOfRangeError extends Error {
  constructor(dayOfMonth) {
    super(`
      Cannot create a cron expression with a day of month out of range.
      Day of month must be between 1 and 31.
      Received: ${dayOfMonth}
    `);
  }
}
