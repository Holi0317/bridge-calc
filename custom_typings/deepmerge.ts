declare module 'deepmerge' {
  export interface IMergeOption {
    clone: boolean
    arrayMerge<T>(destinationArray: T[], sourceArray: T[], options: IMergeOption): T[]
  }
  export default function merge<T, U>(target: T, source: U, opts?: Partial<IMergeOption>): T & U
}
