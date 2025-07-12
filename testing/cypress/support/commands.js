// Custom Cypress commands for the Noesis AI Tutor Framework

// Command to check accessibility
Cypress.Commands.add('checkA11y', (context = null, options = {}) => {
  cy.checkAxe(context, {
    rules: {
      'color-contrast': { enabled: true },
      'heading-order': { enabled: true },
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      ...options.rules
    }
  })
})

// Command to verify Jekyll site structure
Cypress.Commands.add('verifyJekyllSite', () => {
  // Check that basic Jekyll structure is in place
  cy.get('html').should('have.attr', 'lang')
  cy.get('head title').should('exist')
  cy.get('meta[charset]').should('exist')
  cy.get('meta[name="viewport"]').should('exist')
})

// Command to find and interact with subject cards
Cypress.Commands.add('getSubjectCard', (subjectName = null) => {
  if (subjectName) {
    return cy.get('[data-testid="subject-card"], .subject-card, .subject-item')
      .contains(subjectName, { matchCase: false })
      .parent()
  }
  return cy.get('[data-testid="subject-card"], .subject-card, .subject-item').first()
})

// Command to check for GPT tutor availability
Cypress.Commands.add('checkTutorAvailability', (subjectCard) => {
  return cy.wrap(subjectCard).within(() => {
    cy.get('body').then(($body) => {
      const hasGptLink = $body.find('[href*="chatgpt.com"], [href*="chat.openai.com"]').length > 0
      const hasTutorButton = $body.find('button:contains("tutor"), a:contains("tutor")').length > 0
      return hasGptLink || hasTutorButton
    })
  })
})

// Command to verify navigation structure
Cypress.Commands.add('verifyNavigation', () => {
  cy.get('nav, [role="navigation"], .navigation, .nav-menu')
    .should('be.visible')
    .within(() => {
      cy.contains('Subjects', { matchCase: false }).should('exist')
      cy.contains('Framework', { matchCase: false }).should('exist')
    })
})

// Command to check responsive design
Cypress.Commands.add('checkResponsive', () => {
  // Test mobile viewport
  cy.viewport('iphone-6')
  cy.get('body').should('be.visible')
  
  // Test tablet viewport
  cy.viewport('ipad-2')
  cy.get('body').should('be.visible')
  
  // Test desktop viewport
  cy.viewport(1280, 720)
  cy.get('body').should('be.visible')
})

// Command to verify external links (without following them)
Cypress.Commands.add('verifyExternalLinks', () => {
  cy.get('a[href^="http"]').each(($link) => {
    const href = $link.prop('href')
    cy.wrap($link)
      .should('have.attr', 'target', '_blank')
      .or('have.attr', 'rel')
    
    // Log external links for manual verification
    cy.log(`External link found: ${href}`)
  })
})

// Command to check for common Jekyll errors
Cypress.Commands.add('checkJekyllErrors', () => {
  // Check for liquid template errors
  cy.get('body').should('not.contain.text', 'Liquid error')
  cy.get('body').should('not.contain.text', 'undefined method')
  cy.get('body').should('not.contain.text', '{{')
  cy.get('body').should('not.contain.text', '}}')
  cy.get('body').should('not.contain.text', '{%')
  cy.get('body').should('not.contain.text', '%}')
})

// Command to verify content structure
Cypress.Commands.add('verifyContentStructure', () => {
  // Check heading hierarchy
  cy.get('h1').should('have.length.at.most', 1)
  cy.get('h1, h2, h3, h4, h5, h6').should('have.length.greaterThan', 0)
  
  // Check main content area
  cy.get('main, .content, .page-content, #main-content').should('exist')
})

// Command for TDD workflow support
Cypress.Commands.add('markTestAsWIP', (testName) => {
  cy.log(`🚧 WIP Test: ${testName}`)
  cy.task('log', `Work in Progress: ${testName} - ${new Date().toISOString()}`)
})

// Command to save test evidence for review
Cypress.Commands.add('saveTestEvidence', (evidenceName) => {
  cy.screenshot(`evidence-${evidenceName}-${Date.now()}`)
  cy.log(`📸 Evidence saved: ${evidenceName}`)
})
