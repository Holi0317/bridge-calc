module.exports = {
  resolve: {
    alias: {
      'lodash': 'lodash-es',

      // Use non-compiled version of the following libraries
      'reselect': 'reselect/src/index.js',

      // Use non-compiled version of the following react libraries
      'react-collapse': 'react-collapse/src/index.js',
      'react-height': 'react-height/src/index.js',

      'react-i18next': 'react-i18next/src/index.js',
      'react-sortable-hoc': 'react-sortable-hoc/dist/es6'
    }
  }
}
