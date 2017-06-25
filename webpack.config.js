const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const env = require('./webpack-cfg/env')
const babel = require('./webpack-cfg/babel')
const htmlLoader = require('./webpack-cfg/html-loader')
const postCssLoader = require('./webpack-cfg/postcss')
const fontsImagesLoader = require('./webpack-cfg/fonts-images-loader')
const genIndex = require('./webpack-cfg/gen-index')
const copyFiles = require('./webpack-cfg/copy-files')
const babili = require('./webpack-cfg/babili')
const analyzer = require('./webpack-cfg/analyzer')
const alias = require('./webpack-cfg/alias')
const provide = require('./webpack-cfg/provide')
const yaml = require('./webpack-cfg/yaml')
const scopeHoisting = require('./webpack-cfg/scope-hoisting')

const {ENV} = require('./webpack-cfg/paths')

module.exports = merge.smart(
  {
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version)
      })
    ]
  },

  env,
  alias,
  provide,

  babel,
  htmlLoader,
  postCssLoader,
  fontsImagesLoader,
  yaml,

  ...(ENV === 'production' || ENV === 'development' ? [
    genIndex,
    copyFiles
  ] : [
    /* ENV === 'test' */
  ]),

  ...(ENV === 'production' ? [
    analyzer,
    scopeHoisting,
    babili
  ] : [

  ])

)
