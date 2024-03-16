import { JobHandler } from "./JobHandler";

export class JobHandlerManager {
  private handlers: JobHandler[] = [];

  public addHandlers(...handlers: JobHandler[]): void {
    this.handlers = [...this.handlers, ...handlers];
  }

  public getHandlers(): JobHandler[] {
    return this.handlers;
  }
}
