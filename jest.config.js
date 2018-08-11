module.exports = {
  transform: {
    ".(js|ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.test.json"
    }
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageReporters: ["text-summary", "html"]
};
