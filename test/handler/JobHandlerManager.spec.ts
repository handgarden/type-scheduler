import { JobHandler } from "../../src/handler/JobHandler";
import { JobHandlerManager } from "../../src/handler/JobHandlerManager";

describe(JobHandlerManager, () => {
  describe("addHandlers", () => {
    it("should add the given handlers", () => {
      const manager = new JobHandlerManager();
      const handler = {} as JobHandler;
      manager.addHandlers(handler);
      expect(manager.getHandlers()).toContain(handler);
    });

    it("should add multiple handlers", () => {
      const manager = new JobHandlerManager();
      const handlers = [{} as JobHandler, {} as JobHandler];
      manager.addHandlers(...handlers);
      expect(manager.getHandlers()).toEqual(handlers);
    });
  });
});
