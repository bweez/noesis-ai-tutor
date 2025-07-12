---
layout: default
title: "CLI Tools"
description: "Command-line tools and utilities for the Noesis AI Tutor Framework"
permalink: /platform/cli/
---

# 🔧 CLI Tools

The Noesis framework includes command-line utilities to help educators and developers manage content and configurations.

## 📊 GPT Status Checker

Check the deployment status of your AI tutors:

```bash
cd platform/cli
python noesis_cli.py status
```

This command will:
- Verify GPT configuration files
- Check deployment status
- Validate custom instructions
- Report any issues or recommendations

## 🛠️ Available Commands

### Status Commands
```bash
# Check all GPT configurations
noesis status

# Check specific subject
noesis status --subject algebra-1

# Verbose output with details
noesis status --verbose
```

### Configuration Management
```bash
# Validate configuration files
noesis validate

# Deploy configurations
noesis deploy

# Update custom instructions
noesis update-gpt --subject [subject-name]
```

## 🚀 Getting Started

1. **Install Dependencies**: `pip install -r requirements.txt`
2. **Configure Settings**: Edit configuration files in `platform/cli/config/`
3. **Run Status Check**: `python noesis_cli.py status`
4. **Review Output**: Check for any configuration issues

## 📖 Documentation

For detailed usage instructions and examples, see the [Technical Setup Guide](/framework/technical-setup/).
