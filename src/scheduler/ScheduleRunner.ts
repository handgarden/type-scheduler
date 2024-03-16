export interface ScheduleRunner {
  schedule(expression: string, job: Function): void;
}
