import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Developer-specific background steps
Given('I am a developer interested in contributing', () => {
  cy.visit('/')
})

Given('I have accessed the framework documentation', () => {
  cy.visit('/framework/')
})

// Project understanding steps
When('I view the main documentation', () => {
  // Stay on framework documentation page
  cy.url().should('include', '/framework/')
})

Then('I should see a clear project overview', () => {
  cy.get('main, .content')
    .should('contain.text', 'Noesis')
    .and('contain.text', 'AI Tutor')
    .and('contain.text', 'Framework')
    
  // Should explain what the project does
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasEducationTerms = text.includes('education') || text.includes('student') || text.includes('teacher')
    expect(hasEducationTerms, 'Page should contain education-related terms').to.be.true
  })
})

Then('I should understand the component architecture', () => {
  // For architecture details, developers should be directed to GitHub
  cy.get('a[href*="github.com"]')
    .should('exist')
    .and('contain.text', 'GitHub')
    
  // Should see developer-specific section
  cy.get('main, .content')
    .should('contain.text', 'For Developers')
    .and('contain.text', 'Source Code')
})

Then('I should see contribution guidelines', () => {
  // Look for GitHub links first, fallback to general contribution text
  cy.get('body').then(($body) => {
    if ($body.find('a[href*="CONTRIBUTING"], a[href*="contributing"]').length > 0) {
      cy.get('a[href*="CONTRIBUTING"], a[href*="contributing"]').should('exist')
    } else {
      cy.get('main, .content')
        .should('contain.text', 'GitHub')
        .and('contain.text', 'Source Code')
    }
  })
})

// Technical setup steps
Given('I want to set up a development environment', () => {
  // Navigate to framework docs first, then technical setup
  cy.visit('/')
  cy.contains('Documentation').click()
  cy.contains('Technical Setup', { matchCase: false }).click()
})

When('I follow the technical setup guide', () => {
  cy.url().then((url) => {
    const hasSetupUrl = url.includes('TECHNICAL_SETUP') || url.includes('setup') || url.includes('installation') || url.includes('technical-setup')
    expect(hasSetupUrl, 'Should be on a setup/installation page').to.be.true
  })
})

Then('I should see clear installation instructions', () => {
  cy.get('code, pre, .highlight').then(($code) => {
    const text = $code.text()
    const hasInstallInstructions = text.includes('git clone') || text.includes('bundle install') || text.includes('jekyll serve')
    expect(hasInstallInstructions, 'Should contain installation instructions').to.be.true
  })
})

Then('I should understand the development workflow', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasWorkflowInfo = text.includes('Development Workflow') || text.includes('development workflow') || text.includes('getting started')
    expect(hasWorkflowInfo, 'Should contain development workflow information').to.be.true
  })
})

Then('I should be able to run the local development server', () => {
  cy.get('code, pre, .highlight').then(($code) => {
    const text = $code.text()
    const hasServerInstructions = text.includes('jekyll serve') || text.includes('localhost') || text.includes('4000')
    expect(hasServerInstructions, 'Should contain server instructions').to.be.true
  })
})

// Contribution opportunities
Given('I want to contribute to the project', () => {
  cy.visit('/framework/')
})

When('I explore the contribution areas', () => {
  // Should see developer section with GitHub link
  cy.get('main, .content')
    .should('contain.text', 'For Developers')
})

Then('I should see clearly defined areas needing development', () => {
  // Developers should be directed to GitHub for specific development areas
  cy.get('a[href*="github.com"]')
    .should('exist')
    .and('contain.text', 'GitHub')
    
  // Or they can access the technical setup guide
  cy.get('a[href*="technical-setup"]')
    .should('exist')
})

Then('I should understand how to get started', () => {
  // Should link to technical setup guide
  cy.get('a[href*="technical-setup"]')
    .should('exist')
    .and('contain.text', 'Technical Setup')
})

Then('I should find beginner-friendly tasks', () => {
  // Visit the technical setup guide to find beginner tasks
  cy.get('a[href*="technical-setup"]').first().click()
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasBeginnerTasks = text.includes('Next Steps') || text.includes('Make a Contribution') || text.includes('small improvements')
    expect(hasBeginnerTasks, 'Technical setup should contain getting started information').to.be.true
  })
})
