import { Token } from "./Token";

export interface Container {
  get<T>(token: Token<T>): T | null;
}
