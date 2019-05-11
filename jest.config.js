const { jsWithTs } = require("ts-jest/presets");

module.exports = {
  transform: {
    ...jsWithTs.transform
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  }
};
