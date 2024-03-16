export interface JobHandler {
  handle(): void | Promise<void>;
  get cronExpression(): string;
}
