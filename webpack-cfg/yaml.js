module.exports = {
  module: {
    rules: [{
      test: /\.ya?ml$/,
      loader: 'json-loader!yaml-loader'
    }]
  }
}
