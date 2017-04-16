const WebpackMd5Hash = require('webpack-md5-hash')
const webpack = require('webpack')
const {ENV} = require('./paths')

const productionEnv = {
  devtool: false,
  output: {
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.LoaderOptionsPlugin({
      options: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true
      }
    }),

    new webpack.DefinePlugin({
      '__DEV__': false,
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false
      }
    })
  ]
}

const developmentEnv = {
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': true,
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false
      }
    })
  ]
}

module.exports = (ENV === 'test' || ENV === 'development') ? developmentEnv : productionEnv
