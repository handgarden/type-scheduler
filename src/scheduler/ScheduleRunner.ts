export interface ScheduleRunner {
  schedule(expression: string, job: () => void | Promise<void>): void;
}
