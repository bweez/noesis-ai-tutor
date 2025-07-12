#!/bin/bash

# Combined Coverage Script
# Runs both unit tests and E2E tests with coverage, then combines the results

echo "🧪 Combined Coverage Report - Noesis AI Tutor Framework"
echo "======================================================="
echo ""

cd "$(dirname "$0")/.."

# Check if Jekyll server is running
if ! curl -f http://localhost:4000 > /dev/null 2>&1; then
    echo "⚠️  Jekyll server not running. Starting it..."
    if ! ./scripts/jekyll-server.sh start; then
        echo "❌ Failed to start Jekyll server. E2E tests will be skipped."
        echo "   You can start it manually with: npm run server:start"
        SKIP_E2E=true
    fi
    # Wait a moment for server to fully start
    sleep 3
fi

# Clean previous coverage data
echo "🧹 Cleaning previous coverage data..."
rm -rf coverage .nyc_output
mkdir -p .nyc_output coverage

echo ""
echo "📋 Step 1: Running Unit Tests with Coverage..."
echo "---------------------------------------------"
if nyc --silent jest; then
    echo "✅ Unit tests completed with coverage"
else
    echo "⚠️  Unit tests completed with some failures (continuing for coverage)"
fi

echo ""
echo "📋 Step 2: Running E2E Tests with Coverage..."
echo "---------------------------------------------"
if [ "$SKIP_E2E" != "true" ]; then
    if CYPRESS_COVERAGE=true cypress run --headless; then
        echo "✅ E2E tests completed with coverage"
    else
        echo "⚠️  E2E tests completed with some failures (continuing for coverage)"
    fi
else
    echo "⏭️  Skipping E2E tests (server not available)"
fi

echo ""
echo "📊 Step 3: Merging Coverage Reports..."
echo "--------------------------------------"
# Merge coverage data from both test types
if [ -d ".nyc_output" ] && [ "$(ls -A .nyc_output 2>/dev/null)" ]; then
    nyc report --reporter=html --reporter=text --reporter=lcov --reporter=json-summary
    echo "✅ Combined coverage report generated"
else
    echo "⚠️  No coverage data found to merge"
fi

echo ""
echo "📁 Coverage Reports Generated:"
echo "------------------------------"
echo "• HTML Report: coverage/index.html"
echo "• LCOV Report: coverage/lcov.info"
echo "• JSON Summary: coverage/coverage-summary.json"
echo ""

# Show coverage summary
if [ -f "coverage/coverage-summary.json" ]; then
    echo "📊 Coverage Summary:"
    echo "-------------------"
    if command -v jq > /dev/null 2>&1; then
        jq -r '.total | "Lines: \(.lines.pct)% | Statements: \(.statements.pct)% | Functions: \(.functions.pct)% | Branches: \(.branches.pct)%"' coverage/coverage-summary.json
    else
        echo "Install 'jq' to see detailed coverage summary, or check coverage/index.html"
    fi
    echo ""
fi

echo "🎯 Quick Commands:"
echo "------------------"
echo "• npm run coverage:open      - View HTML coverage report"
echo "• npm run coverage:reset     - Clean all coverage data"
echo "• npm run coverage           - Run this script via npm"
echo ""

echo "✨ Combined coverage analysis complete!"
