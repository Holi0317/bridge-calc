const scss = require("postcss-scss");
const imp = require("postcss-import");
const nested = require("postcss-nested");
const variables = require("postcss-advanced-variables");
const preset = require("postcss-preset-env");
const commentStrip = require("postcss-strip-inline-comments");
const extend = require("postcss-extend");
const reporter = require("postcss-reporter");
const cssnano = require("cssnano");

module.exports = {
  syntax: scss,
  plugins: [
    imp(),
    commentStrip,
    extend,
    variables(),
    nested,
    preset(),
    ...(process.env.NODE_ENV === "production"
      ? [
          cssnano({
            preset: "default"
          })
        ]
      : []),
    reporter({
      clearReportedMessages: true
    })
  ]
};
