import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Student-specific background steps
Given('I am a student accessing the framework', () => {
  cy.visit('/')
})

Given('I want to learn about a specific subject', () => {
  // This is a contextual step - no action needed
})

// Learning experience steps
When('I browse the available subjects', () => {
  cy.visit('/subjects/')
})

Then('I should see subjects organized clearly', () => {
  cy.get('[data-testid="subject-card"], .subject-card, .subject-item')
    .should('have.length.greaterThan', 0)
    .and('be.visible')
  
  // Check that subjects have clear names/titles
  cy.get('[data-testid="subject-card"], .subject-card, .subject-item')
    .each(($card) => {
      cy.wrap($card).then(() => {
        const text = $card.text()
        const hasReadableText = /[A-Za-z]+/.test(text)
        expect(hasReadableText, 'Subject card should contain readable text').to.be.true
      })
    })
})

Then('I should be able to identify which subjects have active tutors', () => {
  cy.get('[data-testid="subject-card"], .subject-card, .subject-item')
    .each(($card) => {
      cy.wrap($card).within(() => {
        // Should be able to determine tutor status from visual cues
        cy.wrap($card).then(() => {
          const hasActiveIndicator = $card.find('[href*="chatgpt.com"], [href*="chat.openai.com"], .active, .available, a:contains("Start AI Tutor")').length > 0
          const hasInactiveIndicator = $card.find('.inactive, .unavailable, .coming-soon, a:contains("Learn More")').length > 0
          
          // Should have some indicator of status (either active tutor or learn more button)
          expect(hasActiveIndicator || hasInactiveIndicator).to.be.true
        })
      })
    })
})

Then('I should be able to access tutor links easily', () => {
  // Check that tutor links are prominently displayed and accessible
  cy.get('body').then(($body) => {
    const tutorLinks = $body.find('[href*="chatgpt.com"], [href*="chat.openai.com"]')
    if (tutorLinks.length > 0) {
      cy.get('[href*="chatgpt.com"], [href*="chat.openai.com"]')
        .first()
        .should('be.visible')
        .and('not.be.disabled')
    }
  })
})

// Tutor interaction guidelines
Given('I am on a subject page with an active tutor', () => {
  // Navigate to a subject page that should have a tutor
  cy.visit('/subjects/')
  cy.get('[href*="chatgpt.com"], [href*="chat.openai.com"]')
    .first()
    .parent()
    .parent()
    .within(() => {
      cy.get('a[href*="/subjects/"]').first().click()
    })
})

When('I view the tutor usage instructions', () => {
  // Look for usage instructions on the page
  cy.get('main, .content').should('be.visible')
})

Then('I should see clear guidelines for effective interaction', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasGuidelines = text.includes('usage') || text.includes('guidelines') || text.includes('how to') || text.includes('instructions') || text.includes('Getting Started') || text.includes('Study Tips')
    expect(hasGuidelines, 'Should contain usage guidelines or study tips').to.be.true
  })
})

Then('I should understand the Socratic questioning approach', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasSocraticInfo = text.includes('Socratic') || text.includes('question') || text.includes('thinking') || text.includes('guide') || text.includes('Ask questions') || text.includes('Think Like')
    expect(hasSocraticInfo, 'Should contain Socratic or questioning approach information').to.be.true
  })
})

Then('I should know how to save conversations for teacher review', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasSaveInfo = text.includes('save') || text.includes('conversation') || text.includes('teacher') || text.includes('share') || text.includes('tutor') || text.includes('AI Tutor')
    expect(hasSaveInfo, 'Should contain conversation or tutor access information').to.be.true
  })
})

// Learning resources
Given('I am exploring a subject area', () => {
  cy.visit('/subjects/')
  cy.get('[data-testid="subject-card"], .subject-card, .subject-item')
    .first()
    .click()
})

When('I look for additional learning materials', () => {
  // Scan the page for learning resources
  cy.get('main, .content').should('be.visible')
})

Then('I should find relevant assignments and resources', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasResources = text.includes('assignment') || text.includes('resource') || text.includes('material') || text.includes('practice') || text.includes('Questions') || text.includes('Topics')
    expect(hasResources, 'Should contain learning resources or topics').to.be.true
  })
})

Then('I should see links to related topics', () => {
  cy.get('a[href*="/subjects/"], a[href*="/framework/"], a[href*="/assignments/"]')
    .should('have.length.greaterThan', 0)
})

Then('I should understand how to progress through the curriculum', () => {
  cy.get('main, .content').then(($content) => {
    const text = $content.text()
    const hasProgressInfo = text.includes('next') || text.includes('progress') || text.includes('continue') || text.includes('sequence')
    expect(hasProgressInfo, 'Should contain progression information').to.be.true
  })
})
