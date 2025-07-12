// Component testing support file
import './commands'

import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

// Example of how to add component-specific commands
// Cypress.Commands.add('dataCy', (value) => {
//   return cy.get(`[data-cy=${value}]`)
// })
