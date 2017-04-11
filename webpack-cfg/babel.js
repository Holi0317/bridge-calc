module.exports = {
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules(?!\/react-.+\/)/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  }
}
