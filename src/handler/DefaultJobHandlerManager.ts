import { DefaultJobHandler } from "./DefaultJobHandler";

export class DefaultJobHandlerManager {
  private handlers: DefaultJobHandler[] = [];

  public addHandlers(...handlers: DefaultJobHandler[]): void {
    this.handlers = [...this.handlers, ...handlers];
  }

  public getHandlers(): DefaultJobHandler[] {
    return this.handlers;
  }
}
