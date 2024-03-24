export class ContainerRequiredError extends Error {
  constructor(token: string | symbol) {
    super(
      `Container is required for string or symbol token. given token: ${token.toString()}`
    );
  }
}
