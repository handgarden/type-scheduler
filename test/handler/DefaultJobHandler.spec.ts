import { CronExpression } from "../../src/expression";
import { DefaultJobHandler } from "../../src/handler/DefaultJobHandler";

function mockedJobHandler(
  expression: CronExpression | string
): DefaultJobHandler {
  const mock = class MockedJobHandler extends DefaultJobHandler {
    constructor(expression: CronExpression | string) {
      super({
        cronExpression: expression,
        name: "test",
      });
    }
    public handle(): void {}
  };
  return new mock(expression);
}

describe(DefaultJobHandler, () => {
  let expression: CronExpression | string;
  let handler: DefaultJobHandler;

  describe("constructor", () => {
    it("should create a new instance", () => {
      handler = mockedJobHandler("0 0 * * *");

      expect(handler).toBeInstanceOf(DefaultJobHandler);
    });
  });

  describe("string expression", () => {
    it("should return the string expression", () => {
      expression = "0 0 * * *";
      handler = mockedJobHandler(expression);
      expect(handler.cronExpression).toBe("0 0 * * *");
    });

    it("should throw an error if the expression is not a valid cron expression", () => {
      expression = "0 0 * * * *";
      expect(() => mockedJobHandler(expression)).toThrow();
    });
  });

  describe("cronExpression", () => {
    it("should return the cron expression", () => {
      expression = new CronExpression()
        .minute((minute) => minute.value(0))
        .hour((hour) => hour.value(0))
        .build();
      handler = mockedJobHandler(expression);
      expect(handler.cronExpression).toBe("0 0 * * *");
    });
  });
});
