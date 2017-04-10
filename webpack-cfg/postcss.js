const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1
  }
}

module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', cssLoader, 'postcss-loader']
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [cssLoader, 'postcss-loader']
    //   })
    }]
  }
}
