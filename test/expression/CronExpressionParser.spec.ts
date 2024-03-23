import { CronExpressionParser } from "../../src/expression/CronExpressionParser";

describe(CronExpressionParser, () => {
  describe("parse", () => {
    it("should parse cron expression", () => {
      const cronString = "0 0 1 1 *";
      const cronExpression = CronExpressionParser.parse(cronString);
      expect(cronExpression.build()).toBe(cronString);
    });
  });
});
