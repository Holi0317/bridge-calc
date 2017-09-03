module.exports = {
  transform: {
    '.(js|ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.test.json'
    }
  }
}
