# NYC Configuration for Noesis AI Tutor Framework
# ==============================================

This configuration enables comprehensive code coverage for both Jest (unit tests) and Cypress (E2E tests).

## Key Features:

### 📊 **Unified Coverage Reports**
- Combines Jest and Cypress coverage into a single report
- Multiple output formats: HTML, LCOV, JSON, text
- Detailed file-by-file coverage metrics

### 🎯 **Coverage Targets**
- **Statements**: Track executed code statements
- **Branches**: Track conditional path coverage
- **Functions**: Track function execution coverage
- **Lines**: Track line-by-line coverage

### 📁 **Included Files**
```
unit/**/*.js                    # Unit test utilities
../noesis-docs/**/*.js         # Jekyll site JavaScript
../platform/**/*.js           # Platform code
cypress/support/**/*.js       # Cypress support files
cypress/e2e/**/*.js           # E2E test files
```

### 🚫 **Excluded Files**
```
unit/**/*.test.js              # Test files themselves
unit/**/*.spec.js              # Spec files
cypress/**/*.feature           # Gherkin feature files
cypress/e2e/step_definitions/  # BDD step definitions
scripts/**                     # Build/test scripts
node_modules/**               # Dependencies
coverage/**                   # Coverage reports
.nyc_output/**               # Temporary coverage data
```

## Usage:

### Quick Development Workflow:
```bash
npm run dev:coverage          # Quick coverage check
npm run dev:watch             # Interactive coverage menu
```

### Comprehensive Coverage:
```bash
npm run test:coverage:combined  # Full Jest + Cypress coverage
npm run coverage:open           # View HTML report
```

### Individual Coverage:
```bash
npm run test:coverage          # Jest coverage only
npm run test:e2e:coverage     # Cypress coverage only
```

## Configuration Details:

The `.nycrc.json` file controls:
- **all: true** - Include all files, not just tested ones
- **instrument: true** - Enable code instrumentation
- **sourceMap: false** - Disable source map processing for speed
- **cache: true** - Enable caching for faster subsequent runs
- **check-coverage: false** - Don't fail builds on low coverage (CI-friendly)

## Coverage Reports:

1. **HTML Report**: `testing/coverage/index.html` - Interactive, detailed view
2. **LCOV Report**: `testing/coverage/lcov.info` - For CI/CD integration
3. **JSON Report**: `testing/coverage/coverage-final.json` - Machine-readable
4. **Text Report**: Console output with summary tables

## Integration with Cypress:

The coverage is automatically instrumented through:
- **Babel Plugin Istanbul** - Code instrumentation
- **@cypress/code-coverage** - Cypress integration
- **Webpack Preprocessor** - Build-time instrumentation

## Best Practices:

1. **Run server first**: `npm run server:start` before E2E coverage
2. **Clean regularly**: `npm run coverage:reset` to clear stale data
3. **Use dev:watch**: Interactive menu for development workflow
4. **Check HTML reports**: Most detailed coverage visualization
5. **CI-friendly**: All coverage commands are non-blocking
