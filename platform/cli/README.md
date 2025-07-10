# Noesis CLI - Content Management Tool

A modular CLI tool for managing the Noesis AI Tutor Framework. Designed with API-reusable components for future expansion.

## Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Make CLI executable:**
   ```bash
   chmod +x noesis
   ```

3. **Add to PATH (optional):**
   ```bash
   # Add this directory to your PATH or create a symlink
   ln -s /path/to/platform/cli/noesis /usr/local/bin/noesis
   ```

## Usage

### GPT Management

#### Check GPT Status
```bash
noesis gpt status
```
Shows deployment status of all GPT configurations.

#### Update GPT URL
```bash
noesis gpt update algebra-1 "https://chat.openai.com/g/g-ABC123"
```
Updates the GPT URL for a specific subject.

#### Get GPT Information
```bash
noesis gpt info algebra-1
```
Shows detailed information about a GPT configuration.

#### List All Subjects
```bash
noesis gpt list-subjects
```
Lists all available subjects and their deployment status.

#### Audit Hardcoded Links
```bash
# Check for hardcoded GPT links
noesis gpt audit

# Remove hardcoded links automatically
noesis gpt audit --fix
```
Finds and optionally removes hardcoded `chatgpt_link` entries in markdown files.

### Content Management (Coming Soon)
```bash
noesis content list-questions
noesis content validate-structure
```

### Validation (Coming Soon)
```bash
noesis validate all-configs
noesis validate jekyll-integration
```

## Architecture

### Modular Design
```
cli/
├── noesis                      # Main CLI entry point
├── src/noesis/
│   ├── core/                   # API-reusable modules
│   │   └── gpt_manager.py      # GPT configuration management
│   ├── commands/               # CLI command modules
│   │   ├── gpt.py             # GPT management commands
│   │   ├── content.py         # Content management (future)
│   │   └── validate.py        # Validation commands (future)
│   └── __init__.py
├── requirements.txt
└── README.md
```

### API-Ready Components

The `core` modules are designed to be reusable in API contexts:

```python
from noesis.core.gpt_manager import GPTConfigManager

# Can be used in FastAPI, Flask, etc.
manager = GPTConfigManager(platform_path)
configs = manager.load_all_configs()
```

## Key Features

### 🎯 **Single Source of Truth**
- Eliminates duplicate GPT URL maintenance
- Updates configuration files directly
- Automatic validation and error checking

### 🔄 **Dynamic Integration**
- Works with Jekyll plugin system
- Automatic detection of hardcoded links
- Safe removal of deprecated patterns

### 🛡️ **Validation & Safety**
- URL format validation
- Configuration file integrity checks
- Backup and rollback capabilities (planned)

### 📈 **Extensible Design**
- Modular command structure
- API-ready core components
- Easy addition of new commands

## Development

### Adding New Commands

1. **Create command module:**
   ```python
   # src/noesis/commands/new_feature.py
   import click

   @click.group()
   def new_feature():
       """New feature description"""
       pass

   @new_feature.command()
   def some_action():
       """Action description"""
       click.echo("Action executed!")
   ```

2. **Register in main CLI:**
   ```python
   # noesis
   from noesis.commands import new_feature
   cli.add_command(new_feature.new_feature)
   ```

### Adding Core Modules

Create reusable modules in `src/noesis/core/` that can be imported by both CLI commands and future API endpoints.

## Examples

### Typical Workflow

1. **Check current status:**
   ```bash
   noesis gpt status
   ```

2. **Update GPT URLs:**
   ```bash
   noesis gpt update biology "https://chat.openai.com/g/g-XYZ789"
   ```

3. **Remove hardcoded links:**
   ```bash
   noesis gpt audit --fix
   ```

4. **Verify changes:**
   ```bash
   noesis gpt status
   ```

### Integration with Jekyll

The CLI works seamlessly with the Jekyll plugin system:

1. CLI updates configuration files
2. Jekyll plugins automatically pick up changes
3. Templates use dynamic GPT links
4. No manual template updates needed

## Future Roadmap

- **Content Management**: Question and assignment creation/editing
- **Validation Tools**: Comprehensive configuration validation
- **API Server**: REST API using the same core modules
- **Batch Operations**: Bulk updates and migrations
- **Analytics**: Usage tracking and reporting

## Contributing

When adding new features:

1. Keep core logic in `src/noesis/core/` modules
2. Make components API-reusable (no CLI dependencies)
3. Add comprehensive error handling
4. Include usage examples in docstrings
5. Follow the modular design pattern
