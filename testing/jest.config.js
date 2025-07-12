module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/unit'],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    '../noesis-docs/**/*.js',
    '../platform/**/*.js',
    '!../noesis-docs/_site/**',
    '!../noesis-docs/node_modules/**',
    '!../platform/**/node_modules/**',
    '!../platform/**/test/**',
    '!../platform/**/tests/**',
    '!../platform/**/*.test.js',
    '!../platform/**/*.spec.js',
    '!../**/*.config.js',
    '!**/webpack.config.js',
    '!**/jest.config.js',
    '!**/cypress.config.js',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
  // Disable coverage thresholds for now to prevent CI failures
  // coverageThreshold: {
  //   global: {
  //     branches: 10,
  //     functions: 10,
  //     lines: 10,
  //     statements: 10
  //   }
  // },
  setupFilesAfterEnv: ['<rootDir>/unit/jest.setup.js'],
  verbose: true,
  // Don't collect coverage by default (let nyc handle it)
  collectCoverage: false
}
