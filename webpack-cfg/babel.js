const path = require('path')

const libraries = [
  'react-i18next',
  'react-collapse',
  'react-height'
]

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      include: libraries.map(lib => path.resolve(__dirname, '../node_modules', lib)),
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  }
}
