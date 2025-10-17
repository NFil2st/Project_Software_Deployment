#!/bin/bash

# Test Runner Script for Finance Tracker
# This script runs all tests and generates coverage reports

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Starting Comprehensive Test Suite${NC}"
echo "=================================="

# Function to run tests and check results
run_tests() {
    local test_dir=$1
    local test_name=$2
    
    echo -e "${YELLOW}📁 Running $test_name tests...${NC}"
    cd $test_dir
    
    if [ -f "package.json" ]; then
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}📦 Installing dependencies for $test_name...${NC}"
            npm install
        fi
        
        # Run tests
        if npm test; then
            echo -e "${GREEN}✅ $test_name tests passed${NC}"
            return 0
        else
            echo -e "${RED}❌ $test_name tests failed${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ No package.json found in $test_dir${NC}"
        return 1
    fi
}

# Track test results
backend_passed=false
frontend_passed=false

# Run backend tests
if run_tests "backend" "Backend"; then
    backend_passed=true
fi

cd ..

# Run frontend tests
if run_tests "frontend" "Frontend"; then
    frontend_passed=true
fi

cd ..

echo ""
echo -e "${BLUE}📊 Test Results Summary${NC}"
echo "========================"

if [ "$backend_passed" = true ]; then
    echo -e "${GREEN}✅ Backend Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Backend Tests: FAILED${NC}"
fi

if [ "$frontend_passed" = true ]; then
    echo -e "${GREEN}✅ Frontend Tests: PASSED${NC}"
else
    echo -e "${RED}❌ Frontend Tests: FAILED${NC}"
fi

# Overall result
if [ "$backend_passed" = true ] && [ "$frontend_passed" = true ]; then
    echo ""
    echo -e "${GREEN}🎉 All tests passed! Ready for deployment.${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}💥 Some tests failed. Please fix issues before deployment.${NC}"
    exit 1
fi

