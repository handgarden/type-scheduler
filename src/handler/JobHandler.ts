export interface JobHandler {
  handle(): void | Promise<void>;
}
