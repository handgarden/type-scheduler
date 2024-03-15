export class MinuteOutOfRangeError extends Error {
  constructor(minute: number) {
    super(`
      Cannot create a cron expression with a minute out of range.
      Minute must be between 0 and 59.
      Received: ${minute}
    `);
  }
}
