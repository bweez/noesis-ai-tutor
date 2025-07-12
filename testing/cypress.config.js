const { defineConfig } = require('cypress')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const webpack = require('@cypress/webpack-preprocessor')

module.exports = defineConfig({
  projectId: 'fqwir8',
  e2e: {
    async setupNodeEvents(on, config) {
      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config)
      
      // Webpack preprocessor for step definitions
      on(
        'file:preprocessor',
        webpack({
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.js'],
            },
            module: {
              rules: [
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        })
      )

      return config
    },
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'http://localhost:4000',
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    supportFile: 'cypress/support/e2e.js',
    // Report generation settings
    reporter: 'spec',
    reporterOptions: {
      toConsole: true
    },
    env: {
      // Environment variables for testing
      JEKYLL_ENV: 'test',
      NODE_ENV: 'test'
    },
    // Retry configuration for CI/CD stability
    retries: {
      runMode: 2,
      openMode: 0
    },
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js'
  }
})
