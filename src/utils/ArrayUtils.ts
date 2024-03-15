export class ArrayUtils {
  static unique<T>(array: T[]): T[] {
    return [...new Set(array)];
  }
}
