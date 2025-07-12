#!/bin/bash

# Coverage Stats Script
# Shows current coverage statistics in a clean format

cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "${BLUE}📊 Noesis Framework - Coverage Statistics${NC}"
echo "========================================"

if [ ! -f "coverage/coverage-summary.json" ]; then
    echo "${RED}❌ No coverage data found${NC}"
    echo ""
    echo "Run one of these commands first:"
    echo "• npm run test:unit"
    echo "• npm run coverage"
    echo "• npm run test:watch"
    exit 1
fi

echo ""

# Check if jq is available for JSON parsing
if command -v jq > /dev/null; then
    # Parse JSON coverage summary
    LINES=$(jq -r '.total.lines.pct' coverage/coverage-summary.json)
    STATEMENTS=$(jq -r '.total.statements.pct' coverage/coverage-summary.json)
    FUNCTIONS=$(jq -r '.total.functions.pct' coverage/coverage-summary.json)
    BRANCHES=$(jq -r '.total.branches.pct' coverage/coverage-summary.json)
    
    # Function to colorize percentage
    colorize_percent() {
        local pct=$1
        if (( $(echo "$pct >= 80" | bc -l) )); then
            echo "${GREEN}$pct%${NC}"
        elif (( $(echo "$pct >= 60" | bc -l) )); then
            echo "${YELLOW}$pct%${NC}"
        else
            echo "${RED}$pct%${NC}"
        fi
    }
    
    echo "🎯 Coverage Metrics:"
    echo "├─ Lines:       $(colorize_percent $LINES)"
    echo "├─ Statements:  $(colorize_percent $STATEMENTS)"
    echo "├─ Functions:   $(colorize_percent $FUNCTIONS)"
    echo "└─ Branches:    $(colorize_percent $BRANCHES)"
    
else
    # Fallback without jq
    echo "🎯 Coverage Summary:"
    nyc report --reporter=text-summary 2>/dev/null | grep -A 4 "Coverage summary" | tail -4
fi

echo ""
echo "📁 Reports Available:"
echo "├─ HTML Report:  coverage/index.html"
echo "├─ LCOV Report:  coverage/lcov.info"
echo "└─ JSON Report:  coverage/coverage-final.json"

echo ""
echo "🚀 Quick Actions:"
echo "• npm run coverage:open    - View detailed HTML report"
echo "• npm run test:watch       - Interactive coverage menu"
echo "• npm run coverage:reset   - Clear coverage data"

# Show last update time
if [ -f "coverage/coverage-final.json" ]; then
    LAST_UPDATE=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" coverage/coverage-final.json 2>/dev/null || date)
    echo ""
    echo "${BLUE}📅 Last Updated: $LAST_UPDATE${NC}"
fi
