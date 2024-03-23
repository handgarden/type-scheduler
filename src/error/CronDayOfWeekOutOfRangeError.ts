export class CronDayOfWeekOutOfRangeError extends Error {
  constructor(dayOfWeek: number) {
    super(`
      Cannot create a cron expression with a day of week out of range.
      Day of week must be between 0 and 6 (Sunday to Saturday).
      Received: ${dayOfWeek}
    `);
  }
}
