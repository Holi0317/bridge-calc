declare module 'lodash.sum' {
  function sum(array: number[]): number;
  export = sum;
}

declare module 'lodash.nth' {
  function nth<T>(array: T[], n?: number): T;
  export = nth;
}

declare module 'lodash.isinteger' {
  /**
   * Checks if value is an integer.
   * @param value (*): The value to check.
   * @returns true if value is an integer, else false.
   */
  function isInteger(value: any): boolean;
  export = isInteger;
}
