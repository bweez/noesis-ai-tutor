#!/bin/bash

# Quick setup script for the testing environment
echo "🧪 Setting up Noesis AI Tutor Framework Testing Environment"
echo "=========================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the testing/ directory"
    echo "Usage: cd testing && ./setup.sh"
    exit 1
fi

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Verify Cypress installation
echo "🔍 Verifying Cypress installation..."
npx cypress verify

# Make workflow script executable
echo "⚙️ Making workflow script executable..."
chmod +x tdd-workflow.sh

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start Jekyll server: cd ../noesis-docs && bundle exec jekyll serve"
echo "2. Run your first test: ./tdd-workflow.sh red"
echo "3. Open Cypress GUI: npm run test:e2e:open"
echo ""
echo "Happy testing! 🎉"
