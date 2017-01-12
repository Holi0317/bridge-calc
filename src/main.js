import './polyfills';
import 'material-design-lite/material';
import '../styles/styles.scss';

import type {Aurelia} from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-mdl-plugin');

  if (process.env.NODE_ENV !== 'production') {
    aurelia.use.developmentLogging();
  }

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Conditionally Load in fetch polyfill
  if (!self.fetch) {
    await System.import('whatwg-fetch');
    // Idea fails at parsing new import() statement.
    // await import('whatwg-fetch');
  }

  await aurelia.start();
  aurelia.setRoot();

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await import('offline-plugin/runtime');
  offline.install();
  */
}
