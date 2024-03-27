import { Token } from "../common/Token";
import { JobHandler } from "../handler";

export class ContainerRequiredError extends Error {
  constructor(token: Token<JobHandler>) {
    super(
      `Container is required for string or symbol token. given token: ${token.toString()}`
    );
  }
}
