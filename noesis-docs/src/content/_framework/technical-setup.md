---
layout: framework
title: Technical Setup
description: Complete technical setup guide for the Noesis AI Tutor Framework development environment
---

# 🛠️ Technical Setup Guide

This guide provides detailed instructions for setting up the Noesis AI Tutor Framework locally for development and testing.

## 📋 Prerequisites

### Required Software

- **Ruby** (version 3.0 or higher)
- **Bundler** (Ruby gem manager)
- **Git** (version control)
- **Node.js** (version 16 or higher) - for JavaScript tooling
- **Text Editor** - VS Code, Sublime Text, or similar

### System Requirements

- **Operating System**: macOS, Linux, or Windows with WSL2
- **RAM**: Minimum 4GB, recommended 8GB+
- **Storage**: At least 2GB free space
- **Network**: Internet connection for gem installation

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/bweez/noesis-ai-tutor.git
cd noesis-ai-tutor
```

### 2. Install Dependencies

```bash
# Install Ruby dependencies
cd noesis-docs
bundle install

# Install Node.js dependencies (if using testing framework)
cd ../testing
npm install
```

### 3. Start Development Server

```bash
# From the noesis-docs directory
bundle exec jekyll serve --port 4000
```

Visit [http://localhost:4000](http://localhost:4000) to view your local site.

## 🔧 Development Environment Setup

### Ruby Environment

The framework uses Jekyll, which requires Ruby. We recommend using a Ruby version manager:

**macOS/Linux:**
```bash
# Install rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# Install Ruby 3.0+
rbenv install 3.0.0
rbenv global 3.0.0
```

**Windows:**
Use [RubyInstaller](https://rubyinstaller.org/) or Windows Subsystem for Linux (WSL2).

### Jekyll Setup

```bash
# Install Jekyll and Bundler
gem install jekyll bundler

# Navigate to docs directory
cd noesis-docs

# Install project dependencies
bundle install
```

## 🧪 Testing Framework

The project includes a comprehensive testing framework built with Cypress and Cucumber:

```bash
# Navigate to testing directory
cd testing

# Install dependencies
npm install

# Run tests
npm test

# Open Cypress GUI for development
npm run test:open
```

## 📁 Project Structure

```
noesis-ai-tutor/
├── noesis-docs/          # Jekyll documentation site
│   ├── src/              # Source files
│   ├── _site/            # Generated site
│   └── Gemfile           # Ruby dependencies
├── testing/              # Test suite
│   ├── cypress/          # Cypress tests
│   └── package.json      # Node.js dependencies
└── platform/             # Platform tools
    ├── cli/              # Command-line tools
    └── assessment-tools/ # Assessment utilities
```

## 🔨 Development Workflow

### Making Changes

1. **Content Changes**: Edit files in `noesis-docs/src/`
2. **Test Changes**: Jekyll automatically rebuilds on file changes
3. **Test Your Changes**: Run the test suite with `npm test`

### Development Process

1. **Start with documentation**: Browse existing subjects and questions
2. **Identify improvement areas**: Look for gaps in content or functionality  
3. **Make small changes**: Start with documentation fixes or content additions
4. **Test thoroughly**: Ensure your changes don't break existing functionality
5. **Submit pull request**: Follow our contribution guidelines

### Getting Started Steps

1. **Fork and clone** the repository
2. **Set up your environment** following the installation instructions above
3. **Run the local development server** to see your changes in real-time
4. **Browse the codebase** to understand the project structure
5. **Pick your first contribution** from our beginner-friendly issues

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

### Beginner-Friendly Tasks

New contributors can start with these easy tasks:

- **Documentation improvements**: Fix typos, clarify instructions, add examples
- **Content creation**: Add new questions, subjects, or learning objectives  
- **Testing**: Help expand our test coverage or fix failing tests
- **Good first issues**: Check our GitHub issues labeled `good-first-issue`
- **UI improvements**: Enhance styling, accessibility, or user experience

## 🐛 Troubleshooting

### Common Issues

**Jekyll won't start:**
- Check Ruby version: `ruby --version`
- Reinstall dependencies: `bundle install`
- Clear Jekyll cache: `bundle exec jekyll clean`

**Tests fail:**
- Ensure Jekyll server is running on port 4000
- Check Node.js version: `node --version`
- Reinstall test dependencies: `npm clean-install`

**Permission errors:**
- Use a Ruby version manager instead of system Ruby
- Check file permissions on project directory

### Getting Help

- Check our [Contributing Guidelines](https://github.com/bweez/noesis-ai-tutor/blob/main/CONTRIBUTING.md)
- Open an issue on [GitHub](https://github.com/bweez/noesis-ai-tutor/issues)
- Review existing documentation in the `/framework/` section

## 🚀 Next Steps

Once your environment is set up:

1. **Explore the Framework**: Browse existing subjects and questions
2. **Run Tests**: Familiarize yourself with the test suite
3. **Make a Contribution**: Start with documentation or small improvements
4. **Create Content**: Add new subjects, questions, or assessment tools

Happy coding! 🎉
