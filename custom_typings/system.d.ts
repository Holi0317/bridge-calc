declare module 'system' {
  import * as Aurelia from 'aurelia-framework'

  /*
   * List your dynamically imported modules to get typing support
   */
  interface ISystem {
    import(name: string): Promise<any>
    import(name: 'aurelia-framework'): Promise<typeof Aurelia>
    import(name: 'isomorphic-fetch'): Promise<typeof fetch>
  }

  global {
    const System: ISystem
  }
}
