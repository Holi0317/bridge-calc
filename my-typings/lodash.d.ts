declare module 'lodash.sum' {
  function sum(array: number[]): number;
  export = sum;
}

declare module 'lodash.nth' {
  function nth<T>(array: T[], n?: number): T;
  export = nth;
}
