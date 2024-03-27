import { ClassType } from "./ClassType";

export type Token<T> = string | symbol | ClassType<T> | { name?: string };
