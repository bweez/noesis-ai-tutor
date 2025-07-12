# 🧪 Testing Infrastructure for Noesis AI Tutor Framework

## Overview

This testing infrastructure supports a **Red/Green/Refactor TDD workflow** using Cypress and Cucumber for behavior-driven development (BDD). The setup enables you to write user stories as Gherkin features and implement them step by step.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd testing
npm install
```

### 2. Start Jekyll Development Server

```bash
cd ../noesis-docs
bundle exec jekyll serve
```

### 3. Run Tests

```bash
# Run tests (fail-fast, stops on first error)
npm test

# Run WIP tests only (fail-fast)
npm run test:wip

# Run smoke tests (fail-fast)
npm run test:smoke

# Open Cypress Test Runner (interactive)
npm run test:open
```

## 🔴🟢🔵 TDD Workflow

### Red Phase: Write Failing Tests

1. **Create or modify feature files** in `cypress/e2e/features/`
2. **Tag scenarios with `@wip`** to focus on current work
3. **Run failing tests**: `npm run test:red`

```gherkin
@wip
Scenario: New feature I'm working on
  Given some precondition
  When I take an action
  Then I should see the expected result
```

### Green Phase: Make Tests Pass

1. **Implement step definitions** in `cypress/e2e/step_definitions/`
2. **Develop the actual feature** in the main codebase
3. **Run tests until green**: `npm run test:green`

### Refactor Phase: Improve Code

1. **Remove `@wip` tags** from completed features
2. **Refactor implementation** while keeping tests green
3. **Run full test suite**: `npm run test:all`

## 📁 Project Structure

```
testing/
├── cypress/
│   ├── e2e/
│   │   ├── features/                # Gherkin feature files
│   │   │   ├── 00-foundation.feature        # Core functionality
│   │   │   ├── educator/                    # Educator user stories
│   │   │   ├── student/                     # Student user stories
│   │   │   └── developer/                   # Developer user stories
│   │   └── step_definitions/         # Cucumber step implementations
│   │       ├── common.js                    # Shared steps
│   │       ├── educator.js                  # Educator-specific steps
│   │       ├── student.js                   # Student-specific steps
│   │       └── developer.js                 # Developer-specific steps
│   ├── fixtures/                    # Test data
│   ├── support/                     # Custom commands and configuration
│   └── reports/                     # Test reports (generated)
├── package.json                     # Dependencies and scripts
├── cypress.config.js               # Cypress configuration
└── README.md                       # This file
```

## 🎯 Feature Categories

### @core @smoke
Foundation tests that verify basic functionality works.

### @educator @gpt-management
Tests focused on educator workflows for managing AI tutors.

### @student @learning
Tests focused on student learning experiences.

### @developer @contribution
Tests focused on developer contribution workflows.

### @wip
Work-in-progress tests for current development (TDD Red phase).

## 🛠️ Custom Commands

The testing framework includes custom Cypress commands:

```javascript
// Verify Jekyll site structure
cy.verifyJekyllSite()

// Check accessibility
cy.checkA11y()

// Find subject cards
cy.getSubjectCard('Algebra 1')

// Check tutor availability
cy.checkTutorAvailability()

// Verify navigation
cy.verifyNavigation()

// Mark test as work-in-progress
cy.markTestAsWIP('Feature name')
```

## 📊 Test Data

Test data is organized in fixtures:

- `test-data.json`: General site structure and content
- `tutor-interactions.json`: Expected AI tutor behaviors

## 🔍 Writing New Tests

### 1. Create Feature File

```gherkin
@category @tag
Feature: Clear feature description
  As a [user type]
  I want to [goal]
  So that [benefit]

  Background:
    Given common setup steps

  @wip
  Scenario: Specific behavior
    Given initial state
    When action occurs
    Then expected outcome
```

### 2. Implement Step Definitions

```javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('initial state', () => {
  // Setup code
})

When('action occurs', () => {
  // Action code
})

Then('expected outcome', () => {
  // Assertion code
})
```

### 3. Run TDD Cycle

```bash
# Red: Run failing test
npm run test:red

# Green: Implement feature and make test pass
npm run test:green

# Refactor: Clean up code while keeping tests green
npm run test:all
```

## 🐛 Debugging Tests

### View Test Results
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`
- **Reports**: `cypress/reports/`

### Common Issues

**Jekyll server not running:**
```bash
cd ../noesis-docs && bundle exec jekyll serve
```

**Tests timing out:**
- Check `cypress.config.js` timeout settings
- Verify elements exist with correct selectors

**Step definitions not found:**
- Check file paths in `cypress.config.js`
- Ensure step definition files are in `step_definitions/`

## 🚀 CI/CD Integration

For continuous integration, use:

```bash
npm run test:ci
```

This runs tests headlessly with appropriate settings for automated environments.

## 📈 Best Practices

### Feature Writing
1. **Write from user perspective**: Focus on user value
2. **Use consistent language**: Maintain vocabulary across features
3. **Keep scenarios focused**: One behavior per scenario
4. **Use Background for setup**: Reduce repetition

### Step Definitions
1. **Reuse common steps**: Share steps across features
2. **Use page object pattern**: Encapsulate page interactions
3. **Handle async operations**: Use Cypress promises correctly
4. **Add descriptive assertions**: Make failures informative

### TDD Workflow
1. **Start with failing test**: Write test first
2. **Minimal implementation**: Just enough to pass
3. **Refactor safely**: Keep tests green during refactoring
4. **Commit frequently**: Small, focused commits

## 🤝 Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Add appropriate tags for categorization
3. Include test data in fixtures when needed
4. Update this README if adding new patterns

---

**Happy Testing! 🎉**

*Remember: Good tests are your safety net for confident development.*
