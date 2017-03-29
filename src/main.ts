import {Aurelia, PLATFORM} from 'aurelia-framework'
import 'material-design-lite/material'
import '../styles/styles.scss'
import './polyfills'

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-mdl-plugin'))

  if (process.env.NODE_ENV !== 'production') {
    aurelia.use.developmentLogging()
  }

  // Conditionally Load in fetch polyfill
  if (!self.fetch) {
    await System.import('whatwg-fetch')
    // Typescript fails at parsing new import() statement.
    // await import('whatwg-fetch')
  }

  await aurelia.start()
  await aurelia.setRoot(PLATFORM.moduleName('app'))
}
