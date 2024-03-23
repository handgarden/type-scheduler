export class CronHourOutOfRangeError extends Error {
  constructor(hour: number) {
    super(`
      Cannot create a cron expression with an hour out of range.
      Hour must be between 0 and 23.
      Received: ${hour}
    `);
  }
}
