module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'jest-setup.ts',
    'src/environments',
    'src/polyfills.ts',
    '.mock.ts'
  ]
};
