import { DefaultJobHandlerManager } from "../handler/DefaultJobHandlerManager";
import { MetadataUtils } from "../utils/MetadataUtils";
import { MetadataBasedJobHandlerProxy } from "./MetadataBasedJobHandlerProxy";
import { Container } from "../common";

export class JobHandlerMetadataScanner {
  private readonly jobHandlerManager: DefaultJobHandlerManager;
  private readonly container?: Container;
  constructor({
    manager,
    container,
  }: {
    manager: DefaultJobHandlerManager;
    container?: Container;
  }) {
    this.jobHandlerManager = manager;
    this.container = container;
  }

  autoScan() {
    const metadata = MetadataUtils.getMetadataStorage().getMetadataArgs();
    for (const meta of metadata) {
      const proxy = new MetadataBasedJobHandlerProxy(meta, this.container);
      this.jobHandlerManager.addHandlers(proxy);
    }
  }
}
