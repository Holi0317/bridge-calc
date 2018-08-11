module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|cur)$/,
        loader: "url-loader",
        query: { limit: 8192 }
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        query: { limit: 10000, mimetype: "application/font-woff2" }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        query: { limit: 10000, mimetype: "application/font-woff" }
      },
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
