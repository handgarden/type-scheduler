import { ClassType } from "./ClassType";

export type Token<T> = string | symbol | ClassType<T>;

export interface Container {
  get<T>(token: Token<T>): T | null;
}
