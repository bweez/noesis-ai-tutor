#!/bin/bash

# Test Summary Script
# Provides a quick overview of test status without failing the build

echo "🧪 Noesis AI Tutor Framework - Test Summary"
echo "============================================"
echo ""

cd "$(dirname "$0")/.."

# Unit Tests
echo "📋 Unit Tests:"
echo "--------------"
if jest > /tmp/unit-test.log 2>&1; then
    echo "✅ Unit tests: PASSED"
    grep "Test Suites:" /tmp/unit-test.log | tail -1
else
    echo "❌ Unit tests: FAILED"
    grep "FAIL\|Error:" /tmp/unit-test.log | head -3 || echo "Check logs for details"
fi
echo ""

# Coverage Report (non-blocking)
echo "📊 Coverage Report:"
echo "-------------------"
if nyc jest > /tmp/coverage.log 2>&1; then
    echo "✅ Coverage report generated"
else
    echo "⚠️  Coverage report completed with warnings"
fi
grep -A 2 "Coverage summary" /tmp/coverage.log | tail -2 || echo "No coverage data available"
echo ""

# E2E Tests (if server is running)
echo "🔍 E2E Tests:"
echo "-------------"
if curl -f http://localhost:4000 > /dev/null 2>&1; then
    echo "✅ Jekyll server is running"
    if ./scripts/fail-fast.sh smoke > /tmp/e2e-test.log 2>&1; then
        echo "✅ Smoke tests: PASSED"
    else
        echo "❌ Smoke tests: FAILED"
        grep "❌ FAILURE\|Error:" /tmp/e2e-test.log | head -3 || echo "Check logs for details"
    fi
else
    echo "⚠️  Jekyll server not running - skipping E2E tests"
    echo "   Run 'npm run server:start' to enable E2E testing"
fi
echo ""

echo "📁 Generated Reports:"
echo "--------------------"
echo "• Unit Test Coverage: testing/coverage/index.html"
echo "• E2E Test Report: testing/cypress/reports/cucumber-html-report.html"
echo "• Test Videos: testing/cypress/videos/"
echo ""

echo "🎯 Quick Commands:"
echo "------------------"
echo "• npm run test:unit          - Run unit tests"
echo "• npm run test:coverage      - Run with coverage"
echo "• npm run coverage:open      - View coverage report"
echo "• npm run test:smoke         - Run smoke tests"
echo "• npm run test:open          - Open Cypress UI"
echo ""

# Cleanup
rm -f /tmp/unit-test.log /tmp/coverage.log /tmp/e2e-test.log

echo "✨ Testing summary complete!"
