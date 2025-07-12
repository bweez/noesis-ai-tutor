#!/bin/bash

# Development Workflow Script
# Quick test and coverage feedback for developers

echo "🚀 Noesis Dev Workflow - Quick Coverage Check"
echo "============================================="
echo ""

cd "$(dirname "$0")/.."

# Function to show a quick progress indicator
show_step() {
    echo "🔄 $1..."
}

# Check if Jekyll server is running
show_step "Checking Jekyll server"
if curl -f http://localhost:4000 > /dev/null 2>&1; then
    echo "✅ Jekyll server is running"
    JEKYLL_RUNNING=true
else
    echo "⚠️  Jekyll server not running"
    echo "   Run 'npm run server:start' to enable E2E coverage"
    JEKYLL_RUNNING=false
fi

echo ""
show_step "Running quick unit tests with coverage"
if nyc --reporter=text-summary jest > /tmp/dev-test.log 2>&1; then
    echo "✅ Unit tests passed"
    grep "Coverage summary" -A 4 /tmp/dev-test.log | tail -4
else
    echo "❌ Unit tests failed"
    grep "FAIL\|failing" /tmp/dev-test.log | head -2
fi

echo ""
if [ "$JEKYLL_RUNNING" = true ]; then
    show_step "Running smoke test with coverage"
    if CYPRESS_COVERAGE=true ./scripts/fail-fast.sh smoke > /tmp/dev-e2e.log 2>&1; then
        echo "✅ Smoke tests passed"
    else
        echo "❌ Smoke tests failed"
        grep "❌ FAILURE\|Error:" /tmp/dev-e2e.log | head -2
    fi
    
    # Generate quick coverage report
    show_step "Generating coverage report"
    if nyc report --reporter=text-summary > /tmp/coverage-summary.log 2>&1; then
        echo "✅ Coverage report updated"
        grep -A 4 "Coverage summary" /tmp/coverage-summary.log | tail -4
    fi
else
    echo "⏭️  Skipping E2E tests (Jekyll server not running)"
fi

echo ""
echo "📊 Quick Actions:"
echo "• npm run coverage:open       - View detailed coverage"
echo "• npm run test:open           - Debug tests interactively"
echo "• npm run server:start        - Start Jekyll for E2E tests"
echo "• npm run test:coverage:combined - Full coverage report"
echo ""

# Cleanup
rm -f /tmp/dev-test.log /tmp/dev-e2e.log /tmp/coverage-summary.log

echo "⚡ Quick check complete! Use full commands for detailed reports."
