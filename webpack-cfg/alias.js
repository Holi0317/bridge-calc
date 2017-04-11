module.exports = {
  resolve: {
    alias: {
      // Use preact instead of react
      'react': 'preact-compat',
      'react-dom': 'preact-compat',

      // Use non-compiled version of the following react libraries
      'react-icon-base': 'react-icon-base/index.js',
      'react-css-themr': 'react-css-themr/src/index.js',

      // es6 version of localforage
      localforage: 'localforage/src/localforage',
      'localforage-memoryStorageDriver': 'localforage-memoryStorageDriver/dist/localforage-memoryStorageDriver.es6.js'
    }
  }
}
