const baseConfig = require('../../jest.base.config');

module.exports = {
  ...baseConfig,
  roots: [
    '<rootDir>/projects/ng-test-all',
    '<rootDir>/projects/demo-app',
    '<rootDir>/projects/bus'
  ],
  testMatch: [
    '<rootDir>/projects/demo-app/**/*.spec.[jt]s',
    '<rootDir>/projects/bus/**/*.spec.[jt]s'
  ],
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/projects/ng-test-all/tsconfig.spec.json'
    },
    __TRANSFORM_HTML__: true
  }
};
