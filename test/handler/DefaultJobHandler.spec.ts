import { CronExpression } from "../../src/expression";
import DefaultJobHandler from "../../src/handler/DefaultJobHandler";

function mockedJobHandler(expression: CronExpression): DefaultJobHandler {
  const mock = class MockedJobHandler extends DefaultJobHandler {
    public handle(): void {}
  };
  return new mock(expression);
}

describe(DefaultJobHandler, () => {
  let expression: CronExpression;
  let handler: DefaultJobHandler;

  beforeEach(() => {
    expression = {
      build: jest.fn(),
    } as unknown as CronExpression;
    handler = mockedJobHandler(expression);
  });

  describe("constructor", () => {
    it("should create a new instance", () => {
      expect(handler).toBeInstanceOf(DefaultJobHandler);
    });
  });

  describe("cronExpression", () => {
    it("should return the cron expression", () => {
      expression.build = jest.fn().mockReturnValue("0 0 * * *");
      expect(handler.cronExpression).toBe("0 0 * * *");
    });

    it("should call the build method", () => {
      handler.cronExpression;
      expect(expression.build).toHaveBeenCalled();
    });
  });

  describe("handle", () => {
    it("should call the handle method", () => {
      handler.handle = jest.fn();
      handler.handle();
      expect(handler.handle).toHaveBeenCalled();
    });
  });
});
