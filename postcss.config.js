module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-reporter': {
      clearReportedMessages: true
    }
  }
}
