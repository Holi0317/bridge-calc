const path = require('path')
const {ENV} = require('./env')

const libraries = [
  'react-i18next'
]

const babelOpts = {
  cacheDirectory: true,
  babelrc: false,
  presets: [
    ['env', {
      targets: {
        chrome: '61'
      },
      modules: false,
      shippedProposals: true
    }],
    'stage-1',
    'react'
  ],
  plugins: ENV === 'production' ?
    ['transform-react-remove-prop-types'] :
    []
}

module.exports = {
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: libraries.map(lib => path.resolve(__dirname, '../node_modules', lib)),
      use: {
        loader: 'babel-loader',
        options: babelOpts
      }
    }]
  }
}
