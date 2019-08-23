module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'setupJest.ts',
    'src/environments',
    'src/polyfills.ts',
    '.mock.ts'
  ]
};
