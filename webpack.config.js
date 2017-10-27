const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const env = require('./webpack-cfg/env')
const babel = require('./webpack-cfg/babel')
const typescript = require('./webpack-cfg/typescript')
const htmlLoader = require('./webpack-cfg/html-loader')
const postCssLoader = require('./webpack-cfg/postcss')
const extractText = require('./webpack-cfg/extract-text')
const fontsImagesLoader = require('./webpack-cfg/fonts-images-loader')
const genIndex = require('./webpack-cfg/gen-index')
const copyFiles = require('./webpack-cfg/copy-files')
const babelMinify = require('./webpack-cfg/babel-minify')
const analyzer = require('./webpack-cfg/analyzer')
const alias = require('./webpack-cfg/alias')
const yaml = require('./webpack-cfg/yaml')
const scopeHoisting = require('./webpack-cfg/scope-hoisting')
const workbox = require('./webpack-cfg/workbox')
const commonChunk = require('./webpack-cfg/common-chunk')

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
  commonChunk,

  babel,
  typescript,
  htmlLoader,
  postCssLoader,
  fontsImagesLoader,
  yaml,

  extractText,
  genIndex,
  copyFiles,

  ...(ENV === 'production' ? [
    analyzer,
    scopeHoisting,
    babelMinify,
    workbox
  ] : [

  ])

)
