import { DefaultJobHandler } from "../../src/handler";
import { DefaultJobHandlerManager } from "../../src/handler/DefaultJobHandlerManager";

describe(DefaultJobHandlerManager, () => {
  describe("addHandlers", () => {
    it("should add the given handlers", () => {
      const manager = new DefaultJobHandlerManager();
      const handler = {
        handle: jest.fn(),
        cronExpression: "* * * * *",
      } as any as DefaultJobHandler;
      manager.addHandlers(handler);
      expect(manager.getHandlers()).toContain(handler);
    });

    it("should add multiple handlers", () => {
      const manager = new DefaultJobHandlerManager();
      const handlers = [
        {
          handle: jest.fn(),
          cronExpression: "* * * * *",
        } as any as DefaultJobHandler,
        {
          handle: jest.fn(),
          cronExpression: "* * * * *",
        } as any as DefaultJobHandler,
      ];
      manager.addHandlers(...handlers);
      expect(manager.getHandlers()).toEqual(handlers);
    });
  });
});
