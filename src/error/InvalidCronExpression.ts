export class InvalidCronExpression extends Error {
  constructor(cronExpression: string) {
    super(
      `Invalid cron expression: ${cronExpression}, cron expression must be a multiple of 5 fields separated by a space.`
    );
  }
}
