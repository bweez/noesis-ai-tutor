module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/unit'],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    'unit/**/*.js',
    '../noesis-docs/**/*.js',
    '../platform/**/*.js',
    '!unit/**/*.test.js',
    '!unit/**/*.spec.js',
    '!unit/**/node_modules/**',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/unit/jest.setup.js'],
  verbose: true,
  // Don't collect coverage by default (let nyc handle it)
  collectCoverage: false
}
