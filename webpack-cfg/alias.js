module.exports = {
  resolve: {
    alias: {
      /*
       * Alias lodash
       * Use ES-version of lodash for tree shaking (Probably wont do much. But at least unifying the version of lodash)
       */
      'lodash': 'lodash-es',
      // The following two libraries are used by material-ui
      'lodash.merge': 'lodash-es/merge',
      'lodash.throttle': 'lodash-es/throttle',

      // Use non-compiled version of the following libraries
      'reselect': 'reselect/src/index.js',

      // Use non-compiled version of the following react libraries
      'react-collapse': 'react-collapse/src/index.js',
      'react-height': 'react-height/src/index.js',
      'react-grid-system': 'react-grid-system/src',

      'react-i18next': 'react-i18next/src/index.js',
      'react-sortable-hoc': 'react-sortable-hoc/dist/es6'
    }
  }
}
