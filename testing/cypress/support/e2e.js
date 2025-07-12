// Import Cypress commands
import './commands'

// Import code coverage
import '@cypress/code-coverage/support'

// Import Cypress plugins
import 'cypress-axe'
import 'cypress-real-events/support'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions from the app
  // This is particularly useful for Jekyll sites that might have minor JS errors
  console.log('Uncaught exception:', err.message)
  return false
})

// Before each test
beforeEach(() => {
  // Inject axe for accessibility testing
  cy.injectAxe()
  
  // Set up common test data
  cy.wrap({
    baseUrl: Cypress.config('baseUrl'),
    timestamp: Date.now()
  }).as('testContext')
})

// Global test configuration
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('main, .content, #main-content').should('exist')
})

// Custom command for checking Jekyll server
Cypress.Commands.add('verifyJekyllServer', () => {
  cy.request({
    url: '/',
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`
        Jekyll server is not running or not accessible.
        
        To start the server, run:
        cd noesis-docs && bundle exec jekyll serve
        
        Then ensure it's accessible at ${Cypress.config('baseUrl')}
      `)
    }
  })
})
