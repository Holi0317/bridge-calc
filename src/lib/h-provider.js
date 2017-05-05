// @flow
/**
 * Re-export preact's h method as default export
 * This is used for provide plugin in webpack
 */
const {h} = require('preact')

module.exports = h
