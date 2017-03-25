module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: [/index\.html/],
        loader: 'html-loader'
      }
    ]
  }
}
