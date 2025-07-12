#!/bin/bash

# TDD Workflow Helper Script
# Usage: ./tdd-workflow.sh [red|green|refactor]

set -e

PHASE=${1:-"red"}
TESTING_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🧪 Noesis AI Tutor Framework - TDD Workflow"
echo "============================================"

case $PHASE in
  "red")
    echo "🔴 RED PHASE: Running failing tests (fail-fast)..."
    echo ""
    echo "Focus: Write failing tests for new features"
    echo "Command: npm run test:wip"
    echo ""
    cd "$TESTING_DIR"
    npm run test:wip
    ;;
    
  "green")
    echo "🟢 GREEN PHASE: Running all tests (fail-fast)..."
    echo ""
    echo "Focus: Implement features to make tests pass"
    echo "Command: npm test"
    echo ""
    cd "$TESTING_DIR"
    npm test
    ;;
    
  "refactor")
    echo "🔵 REFACTOR PHASE: Running full test suite..."
    echo ""
    echo "Focus: Refactor code while keeping tests green"
    echo "Command: npm run test:all"
    echo ""
    cd "$TESTING_DIR"
    npm run test:all
    ;;
    
  "setup")
    echo "⚙️ SETUP: Installing dependencies and verifying setup..."
    echo ""
    cd "$TESTING_DIR"
    npm install
    npm run cypress:verify
    npm run server:start
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Server is running at http://localhost:4000"
    echo "2. Run TDD cycle: ./tdd-workflow.sh red"
    echo "3. When done: npm run server:stop"
    ;;
    
  "help"|"-h"|"--help")
    echo "TDD Workflow Commands:"
    echo ""
    echo "  ./tdd-workflow.sh setup     - Install dependencies and verify setup"
    echo "  ./tdd-workflow.sh red       - Run @wip tests (fail-fast)"
    echo "  ./tdd-workflow.sh green     - Run all tests (fail-fast)"
    echo "  ./tdd-workflow.sh refactor  - Run complete test suite"
    echo "  ./tdd-workflow.sh smoke     - Run smoke tests (fail-fast)"
    echo ""
    echo "Direct Commands:"
    echo "  npm test                    - Run all tests (fail-fast)"
    echo "  npm run test:wip            - Run WIP tests (fail-fast)"
    echo "  npm run test:smoke          - Run smoke tests (fail-fast)"
    echo "  npm run test:open           - Open Cypress GUI"
    echo "  npm run test:all            - Full test suite + unit tests"
    echo "  npm run test:ci             - CI/production run"
    echo ""
    echo "Server Management:"
    echo "  npm run server:start        - Start Jekyll server (persistent)"
    echo "  npm run server:stop         - Stop Jekyll server"
    echo "  npm run server:status       - Check server status"
    echo "  npm run dev                 - Start server + run tests"
    echo ""
    echo "Workflow:"
    echo "  1. RED: Write failing test with @wip tag"
    echo "  2. GREEN: Implement feature to make test pass"
    echo "  3. REFACTOR: Clean up code while keeping tests green"
    echo ""
    ;;
    
  "smoke")
    echo "💨 SMOKE TESTS: Running core functionality tests..."
    echo ""
    echo "Focus: Quick validation of critical features"
    echo "Command: npm run test:smoke"
    echo ""
    cd "$TESTING_DIR"
    npm run test:smoke
    ;;
    
  "fast"|"fail-fast")
    echo "🎯 FAIL-FAST: Stop on first failure..."
    echo ""
    echo "Focus: Immediate feedback on first issue"
    echo "Command: npm test"
    echo ""
    cd "$TESTING_DIR"
    npm test
    ;;
    
  *)
    echo "❌ Unknown phase: $PHASE"
    echo ""
    echo "Available phases: red, green, refactor, setup, help"
    echo "Run './tdd-workflow.sh help' for more information"
    exit 1
    ;;
esac
