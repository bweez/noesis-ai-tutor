const { defineConfig } = require('cypress')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const webpack = require('@cypress/webpack-preprocessor')

module.exports = defineConfig({
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
    
    // FAST LOCAL DEVELOPMENT SETTINGS
    screenshotOnRunFailure: false,  // No screenshots for speed
    video: false,                   // No videos for speed
    reporter: 'min',                // Minimal console output
    
    supportFile: 'cypress/support/e2e.js',
    env: {
      JEKYLL_ENV: 'test',
      NODE_ENV: 'development'  // Signal this is dev mode
    },
    
    // Faster timeouts for local dev
    defaultCommandTimeout: 5000,    // Reduced from 10000
    requestTimeout: 5000,           // Reduced from 10000
    responseTimeout: 5000,          // Reduced from 10000
    
    // No retries in dev mode for faster feedback
    retries: {
      runMode: 0,
      openMode: 0
    }
  }
})
