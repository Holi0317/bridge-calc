const Babili = require('babili-webpack-plugin')
const {ENV} = require('./paths')

module.exports = {
  plugins: ENV === 'production' ? [
    new Babili({
      comments: false
    })
  ] : []
}
