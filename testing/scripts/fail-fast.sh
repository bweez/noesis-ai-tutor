#!/bin/bash

# Fail-Fast Test Runner
# Runs tests one by one and stops on first failure for rapid local development

set -e

TESTING_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$TESTING_DIR"

echo "🚀 Fail-Fast Test Runner"
echo "========================"

# Check if Jekyll server is running
if ! curl -f http://localhost:4000 > /dev/null 2>&1; then
    echo "⚠️  Jekyll server not running. Starting it..."
    ./scripts/jekyll-server.sh start
fi

# Get the test type from argument
TEST_TYPE=${1:-"wip"}

case $TEST_TYPE in
  "wip")
    echo "🔴 Running WIP tests (fail-fast)..."
    SPEC_PATTERN="cypress/e2e/**/*.feature"
    ENV_TAGS="@wip"
    ;;
  "all")
    echo "🟢 Running all tests (fail-fast)..."
    SPEC_PATTERN="cypress/e2e/**/*.feature"
    ENV_TAGS=""
    ;;
  "smoke")
    echo "💨 Running smoke tests (fail-fast)..."
    SPEC_PATTERN="cypress/e2e/**/*.feature"
    ENV_TAGS="@smoke"
    ;;
  *)
    echo "Usage: ./fail-fast.sh [wip|all|smoke]"
    exit 1
    ;;
esac

# Run each feature file individually and stop on first failure
FEATURE_FILES=($(find cypress/e2e -name "*.feature" | sort))

for feature in "${FEATURE_FILES[@]}"; do
  if [[ -f "$feature" ]]; then
    echo ""
    echo "🧪 Testing: $feature"
    
    if [[ -n "$ENV_TAGS" ]]; then
      # Run with tags
      if ! npx cypress run --headless --browser electron --config-file cypress.dev.config.js --spec "$feature" --env "tags=$ENV_TAGS" --quiet; then
        echo ""
        echo "❌ FAILURE in $feature"
        echo "🎯 Focus on fixing this test first!"
        exit 1
      fi
    else
      # Run without tags
      if ! npx cypress run --headless --browser electron --config-file cypress.dev.config.js --spec "$feature" --quiet; then
        echo ""
        echo "❌ FAILURE in $feature"
        echo "🎯 Focus on fixing this test first!"
        exit 1
      fi
    fi
    
    echo "✅ PASSED: $feature"
  fi
done

echo ""
echo "🎉 All tests passed!"
