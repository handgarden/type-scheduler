import { InvalidCronExpression } from "../error/InvalidCronExpression";
import { CronExpression } from "./CronExpression";

export class CronExpressionParser {
  public static parse(expression: string | CronExpression): CronExpression {
    if (expression instanceof CronExpression) {
      return expression;
    }
    const split = expression.trim().split(/\s+/);
    if (split.length !== 5) {
      throw new InvalidCronExpression(expression);
    }

    const [minute, hour, day, month, dayOfWeek] = split;

    return new CronExpression()
      .minute((builder) => builder.parse(minute))
      .hour((builder) => builder.parse(hour))
      .dayOfMonth((builder) => builder.parse(day))
      .month((builder) => builder.parse(month))
      .dayOfWeek((builder) => builder.parse(dayOfWeek));
  }
}
