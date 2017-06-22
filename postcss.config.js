module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-nesting': {},
    'autoprefixer': {
      browsers: ['last 2 Chrome versions', 'last 2 Firefox versions']
    },
    'postcss-reporter': {
      clearReportedMessages: true
    }
  }
}
