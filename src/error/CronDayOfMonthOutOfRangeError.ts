export class CronDayOfMonthOutOfRangeError extends Error {
  constructor(dayOfMonth: number) {
    super(`
      Cannot create a cron expression with a day of month out of range.
      Day of month must be between 1 and 31.
      Received: ${dayOfMonth}
    `);
  }
}
