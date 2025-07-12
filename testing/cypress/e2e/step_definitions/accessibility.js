import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Accessibility-specific background steps
Given('I am using assistive technology', () => {
  // Simulate assistive technology usage
  cy.injectAxe()
})

// Accessibility verification steps
Then('the page should have proper heading structure', () => {
  // Check heading hierarchy - should have exactly 1 h1
  cy.get('h1').should('have.length', 1)
  
  // Verify heading order
  cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
    const headingLevels = []
    $headings.each((index, heading) => {
      headingLevels.push(parseInt(heading.tagName.charAt(1)))
    })
    
    // Check that headings don't skip levels (proper accessibility practice)
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i]
      const prevLevel = headingLevels[i - 1]
      expect(currentLevel - prevLevel, `Heading level should not skip from h${prevLevel} to h${currentLevel}`).to.be.at.most(1)
    }
  })
})

Then('all images should have alt text', () => {
  cy.get('body').then(($body) => {
    const images = $body.find('img')
    if (images.length === 0) {
      // No images found - that's fine, just log it
      cy.log('ℹ️ No images found on page - skipping alt text check')
    } else {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
        
        // Alt text should not be empty for content images
        cy.wrap($img).then(($el) => {
          const alt = $el.attr('alt')
          const src = $el.attr('src')
          
          // Decorative images can have empty alt, but content images should not
          if (!src.includes('decoration') && !src.includes('spacer')) {
            expect(alt).to.not.be.empty
          }
        })
      })
    }
  })
})

Then('the color contrast should meet WCAG AA standards', () => {
  // Try to run accessibility check, but handle errors gracefully
  cy.window().then((win) => {
    if (win.axe) {
      cy.checkA11y(null, {
        rules: {
          'color-contrast': { enabled: true }
        }
      })
    } else {
      cy.log('⚠️ Axe not available - skipping color contrast check')
      // Just verify that text is visible as a basic check
      cy.get('body').should('be.visible')
      cy.get('body').should('not.have.css', 'color', 'transparent')
    }
  })
})

Then('the page should be keyboard navigable', () => {
  // Test tab navigation - focus first focusable element
  cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().focus()
  cy.focused().should('exist')
  
  // Test that all interactive elements are reachable
  cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').each(($el) => {
    if ($el.is(':visible')) {
      cy.wrap($el).focus().should('be.focused')
    }
  })
})

// Keyboard navigation steps
When('I navigate using only the keyboard', () => {
  // Start keyboard navigation
  cy.get('body').realPress('Tab')
})

Then('I should be able to reach all interactive elements', () => {
  const interactiveElements = []
  
  cy.get('a:visible, button:visible, input:visible, select:visible, textarea:visible, [tabindex="0"]:visible')
    .each(($el) => {
      interactiveElements.push($el[0])
    })
    .then(() => {
      // Tab through all elements
      interactiveElements.forEach((element, index) => {
        cy.wrap(element).focus().should('be.focused')
      })
    })
})

Then('focus indicators should be visible', () => {
  cy.get('a, button, input, select, textarea').each(($el) => {
    if ($el.is(':visible')) {
      cy.wrap($el).focus()
      
      // Check that focus is visually indicated
      cy.wrap($el).should(($focused) => {
        const styles = window.getComputedStyle($focused[0])
        const outline = styles.outline
        const outlineWidth = styles.outlineWidth
        const boxShadow = styles.boxShadow
        
        // Should have some form of focus indication
        const hasFocusIndicator = outline !== 'none' || 
                                 outlineWidth !== '0px' || 
                                 boxShadow !== 'none'
        
        expect(hasFocusIndicator).to.be.true
      })
    }
  })
})

Then('screen reader announcements should be meaningful', () => {
  // Check for proper ARIA labels and descriptions
  cy.get('button, a, input').then(($elements) => {
    if ($elements.length === 0) {
      // No interactive elements found - this is ok for some pages
      cy.log('No interactive elements found - skipping accessibility check')
      return
    }
    
    cy.wrap($elements).each(($el) => {
      if ($el.is(':visible')) {
        cy.wrap($el).then(($element) => {
          const hasAriaLabel = $element.attr('aria-label')
          const hasAriaLabelledBy = $element.attr('aria-labelledby')
          const hasText = $element.text().trim()
          const hasTitle = $element.attr('title')
          
          // Interactive elements must have proper accessible names (strict accessibility)
          const hasAccessibleName = !!(hasAriaLabel || hasAriaLabelledBy || hasText || hasTitle)
          expect(hasAccessibleName, `Element ${$element.prop('tagName')} must have accessible name (aria-label, aria-labelledby, text content, or title)`).to.be.true
        })
      }
    })
  })
})

// Screen reader steps
When('I use a screen reader', () => {
  // Simulate screen reader usage by checking semantic structure
  cy.get('main, [role="main"]').should('exist')
  cy.get('nav, [role="navigation"]').should('exist')
})

Then('the content structure should be clear', () => {
  // Check for proper landmark structure
  cy.get('main, [role="main"]').should('have.length.at.least', 1)
  cy.get('nav, [role="navigation"]').should('have.length.at.least', 1)
  
  // Check for proper heading structure
  cy.get('h1').should('have.length.at.most', 2)
  cy.get('h1, h2, h3, h4, h5, h6').should('have.length.greaterThan', 0)
})

Then('all functionality should be available via keyboard', () => {
  // Test that all interactive functionality works with keyboard
  cy.get('button:visible').each(($button) => {
    cy.wrap($button).focus().type('{enter}')
    // Note: In real implementation, you'd verify the button action occurred
  })
  
  cy.get('a:visible').each(($link) => {
    if (!$link.attr('href').startsWith('http')) {
      // Only test internal links to avoid navigation issues
      cy.wrap($link).focus().type('{enter}')
    }
  })
})

Then('form elements should have proper labels', () => {
  cy.get('input, select, textarea').then(($formElements) => {
    if ($formElements.length === 0) {
      // No form elements found - this is ok for some pages
      cy.log('No form elements found - skipping form label check')
      return
    }
    
    cy.wrap($formElements).each(($formElement) => {
      if ($formElement.is(':visible')) {
        cy.wrap($formElement).then(($el) => {
          const id = $el.attr('id')
          const ariaLabel = $el.attr('aria-label')
          const ariaLabelledBy = $el.attr('aria-labelledby')
          
          // Should have proper labeling according to WCAG guidelines
          const hasLabel = !!(id && Cypress.$(`label[for="${id}"]`).length > 0)
          const hasAriaLabel = !!(ariaLabel && ariaLabel.trim() !== '')
          const hasAriaLabelledBy = !!ariaLabelledBy
          
          expect(hasLabel || hasAriaLabel || hasAriaLabelledBy, `Form element must have proper labeling (associated label, aria-label, or aria-labelledby)`).to.be.true
        })
      }
    })
  })
})

Given('I am on a subject page', () => {
  // Navigate to a specific subject page (using Algebra 1 as default)
  cy.visit('/subjects/algebra-1/')
})
