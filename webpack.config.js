const {generateConfig, stripMetadata} = require('@easy-webpack/core')
const path = require('path')
const webpack = require('webpack')
const env = require('./webpack-cfg/env')
const aurelia = require('./webpack-cfg/aurelia')
const typescript = require('./webpack-cfg/typescript')
const htmlLoader = require('./webpack-cfg/html-loader')
const sassLoader = require('./webpack-cfg/sass-loader')
const fontsImagesLoader = require('./webpack-cfg/fonts-images-loader')
const genIndex = require('./webpack-cfg/gen-index')
const commonChunksOptimize = require('./webpack-cfg/common-chunks-optimize')
const copyFiles = require('./webpack-cfg/copy-files')
const babili = require('./webpack-cfg/babili')
const analyzer = require('./webpack-cfg/analyzer')

const {ENV, entry} = require('./webpack-cfg/paths')

/**
 * Main Webpack Configuration
 */
const config = generateConfig(
  {
    entry,
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

  aurelia,

  typescript,
  htmlLoader,
  sassLoader,
  fontsImagesLoader,
  genIndex,

  ...(ENV === 'production' || ENV === 'development' ? [
    commonChunksOptimize,
    copyFiles
  ] : [
    /* ENV === 'test' */
  ]),

  ...(ENV === 'production' ? [
    analyzer
  ]: [

  ]),

  babili

)

module.exports = stripMetadata(config)
