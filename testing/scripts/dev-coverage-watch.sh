#!/bin/bash

# Development Coverage Watch Script
# Provides a continuous development workflow with real-time coverage feedback

echo "🔬 Noesis Dev Coverage Watch - Interactive Development Mode"
echo "=========================================================="
echo ""

cd "$(dirname "$0")/.."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display menu
show_menu() {
    echo ""
    echo "${BLUE}🛠️  Development Coverage Menu${NC}"
    echo "================================"
    echo "1) ${GREEN}Quick Coverage Check${NC}    - Fast unit + smoke test"
    echo "2) ${GREEN}Full Coverage Report${NC}    - Complete Jest + Cypress coverage"
    echo "3) ${GREEN}Unit Tests Only${NC}         - Just run Jest with coverage"
    echo "4) ${GREEN}E2E Tests Only${NC}          - Just run Cypress with coverage"
    echo "5) ${YELLOW}View Coverage Report${NC}    - Open HTML coverage in browser"
    echo "6) ${YELLOW}Coverage Summary${NC}        - Show current coverage stats"
    echo "7) ${RED}Reset Coverage${NC}           - Clean all coverage data"
    echo "8) ${BLUE}Server Status${NC}            - Check/manage Jekyll server"
    echo "9) ${RED}Exit${NC}"
    echo ""
    echo -n "Choose an option (1-9): "
}

# Function to check server status
check_server() {
    if curl -f http://localhost:4000 > /dev/null 2>&1; then
        echo "${GREEN}✅ Jekyll server is running (http://localhost:4000)${NC}"
        return 0
    else
        echo "${RED}❌ Jekyll server is not running${NC}"
        echo "   Would you like to start it? (y/n): "
        read -r start_server
        if [ "$start_server" = "y" ] || [ "$start_server" = "Y" ]; then
            echo "🚀 Starting Jekyll server..."
            ./scripts/jekyll-server.sh start
            sleep 3
            return 0
        else
            echo "   ${YELLOW}⚠️  E2E tests will be skipped without server${NC}"
            return 1
        fi
    fi
}

# Function to show coverage summary
show_coverage_summary() {
    if [ -f "coverage/coverage-summary.json" ]; then
        echo "${BLUE}📊 Current Coverage Summary:${NC}"
        echo "----------------------------"
        if command -v jq > /dev/null; then
            jq -r '.total | "Lines: \(.lines.pct)% | Statements: \(.statements.pct)% | Functions: \(.functions.pct)% | Branches: \(.branches.pct)%"' coverage/coverage-summary.json
        else
            echo "Run a coverage test first to see summary"
        fi
    else
        echo "${YELLOW}⚠️  No coverage data found. Run a coverage test first.${NC}"
    fi
}

# Main loop
while true; do
    show_menu
    read -r choice
    
    case $choice in
        1)
            echo ""
            echo "${BLUE}🏃‍♂️ Running Quick Coverage Check...${NC}"
            ./scripts/dev-coverage.sh
            ;;
        2)
            echo ""
            echo "${BLUE}🔍 Running Full Coverage Report...${NC}"
            check_server
            ./scripts/coverage-combined.sh
            ;;
        3)
            echo ""
            echo "${BLUE}🧪 Running Unit Tests with Coverage...${NC}"
            nyc jest
            echo ""
            echo "${GREEN}✅ Unit test coverage complete${NC}"
            ;;
        4)
            echo ""
            echo "${BLUE}🌐 Running E2E Tests with Coverage...${NC}"
            if check_server; then
                CYPRESS_COVERAGE=true cypress run --headless
                echo ""
                echo "${GREEN}✅ E2E test coverage complete${NC}"
            fi
            ;;
        5)
            echo ""
            echo "${BLUE}📊 Opening Coverage Report...${NC}"
            if [ -f "coverage/index.html" ]; then
                open coverage/index.html
                echo "${GREEN}✅ Coverage report opened in browser${NC}"
            else
                echo "${RED}❌ No coverage report found. Run a coverage test first.${NC}"
            fi
            ;;
        6)
            echo ""
            show_coverage_summary
            ;;
        7)
            echo ""
            echo "${YELLOW}🧹 Resetting Coverage Data...${NC}"
            rimraf coverage .nyc_output
            echo "${GREEN}✅ Coverage data cleared${NC}"
            ;;
        8)
            echo ""
            echo "${BLUE}🔍 Server Status:${NC}"
            check_server
            echo ""
            echo "Server commands:"
            echo "• npm start       - Start Jekyll server"
            echo "• npm stop        - Stop Jekyll server"
            echo "• npm restart     - Restart Jekyll server"
            ;;
        9)
            echo ""
            echo "${GREEN}👋 Goodbye! Happy coding!${NC}"
            break
            ;;
        *)
            echo ""
            echo "${RED}❌ Invalid option. Please choose 1-9.${NC}"
            ;;
    esac
    
    echo ""
    echo "${YELLOW}Press Enter to continue...${NC}"
    read -r
done
