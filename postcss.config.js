module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-nesting': {},
    'postcss-reporter': {
      clearReportedMessages: true
    }
  }
}
