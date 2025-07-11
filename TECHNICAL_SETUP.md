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

### 2. Install Ruby Dependencies

```bash
cd noesis-docs
bundle install
```

### 3. Start the Development Server

```bash
bundle exec jekyll serve --livereload
```

The site will be available at `http://localhost:4000`

### 4. Verify Installation

Open your browser and navigate to `http://localhost:4000`. You should see:
- ✅ Homepage loads without errors
- ✅ Navigation menu works
- ✅ Subject pages display content
- ✅ Framework documentation is accessible

## 🔧 Detailed Setup Instructions

### Ruby Installation

#### macOS (using Homebrew)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby
brew install ruby

# Add Ruby to PATH (add to ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install ruby-full ruby-bundler build-essential zlib1g-dev

# Verify installation
ruby --version
bundler --version
```

#### Windows (using RubyInstaller)
1. Download Ruby+Devkit from [rubyinstaller.org](https://rubyinstaller.org/)
2. Run the installer and select "Add Ruby executables to PATH"
3. Open Command Prompt and verify: `ruby --version`

### Jekyll Setup

```bash
# Navigate to the docs directory
cd noesis-docs

# Install Jekyll and dependencies
bundle install

# If you encounter permission errors on macOS/Linux:
bundle install --path vendor/bundle
```

### Development Workflow

#### Starting the Server
```bash
# Standard development server
bundle exec jekyll serve

# With live reload (automatically refreshes browser)
bundle exec jekyll serve --livereload

# Serve on different port
bundle exec jekyll serve --port 4001

# Enable drafts and future posts
bundle exec jekyll serve --drafts --future
```

#### Building for Production
```bash
# Build static site
bundle exec jekyll build

# Build with production environment
JEKYLL_ENV=production bundle exec jekyll build
```

## 📁 Project Structure

```
noesis-ai-tutor/
├── README.md                 # Main project overview
├── TECHNICAL_SETUP.md       # This file
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT License
├── noesis-docs/            # Main Jekyll website
│   ├── _config.yml         # Jekyll configuration
│   ├── Gemfile             # Ruby dependencies
│   ├── src/                # Source files
│   │   ├── assets/         # CSS, JS, images
│   │   ├── content/        # Markdown content
│   │   │   ├── _framework/ # Framework documentation
│   │   │   ├── _subjects/  # Subject-specific content
│   │   │   └── posts/      # Blog posts
│   │   ├── includes/       # Reusable HTML components
│   │   └── layouts/        # Page templates
│   └── _site/              # Generated static site (git-ignored)
├── platform/               # Development tools
│   ├── cli/                # Command-line utilities
│   ├── llm-configs/        # LLM configurations
│   └── assessment-tools/   # Evaluation utilities
└── subjects/               # Subject content
    ├── algebra-1/          # Example subject
    └── _template.md        # Subject template
```

## 🔍 Content Development

### Adding New Subjects

1. **Create subject directory**:
   ```bash
   mkdir -p subjects/your-subject/questions
   ```

2. **Copy template**:
   ```bash
   cp subjects/_template.md subjects/your-subject/index.md
   ```

3. **Edit subject configuration**:
   ```yaml
   ---
   title: "Your Subject"
   description: "Subject description"
   permalink: /subjects/your-subject/
   ---
   ```

### Adding Framework Documentation

1. **Create new document**:
   ```bash
   touch noesis-docs/src/content/_framework/new-doc.md
   ```

2. **Add front matter**:
   ```yaml
   ---
   title: "Document Title"
   description: "Brief description"
   category: "setup|guides|tools"
   order: 1
   ---
   ```

### Working with Collections

The site uses Jekyll collections for organized content:

- **`_framework`**: Documentation and guides
- **`_subjects`**: Subject-specific content
- **`_assignments`**: Assignment templates
- **`posts`**: Blog content

## 🧪 Testing and Validation

### Link Checking
```bash
# Install html-proofer
gem install html-proofer

# Check internal links
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external
```

### Performance Testing
```bash
# Build with performance profiling
bundle exec jekyll build --profile

# Check build time optimization
bundle exec jekyll build --incremental
```

### Accessibility Testing
Use browser dev tools or install accessibility extensions to verify:
- ✅ Proper heading hierarchy
- ✅ Alt text for images
- ✅ Keyboard navigation
- ✅ Color contrast ratios

## 🚨 Troubleshooting

### Common Issues

#### "Bundle install fails"
```bash
# Clear gem cache
bundle clean --force
bundle install
```

#### "Permission denied" errors on macOS/Linux
```bash
# Install gems locally
bundle install --path vendor/bundle
```

#### "Jekyll command not found"
```bash
# Install Jekyll globally
gem install jekyll bundler

# Or run with bundle exec
bundle exec jekyll serve
```

#### Site not updating/CSS changes not showing
```bash
# Clear Jekyll cache
bundle exec jekyll clean
bundle exec jekyll serve --livereload
```

#### Port already in use
```bash
# Find process using port 4000
lsof -ti:4000

# Kill the process (replace PID)
kill -9 PID

# Or use different port
bundle exec jekyll serve --port 4001
```

### Performance Issues

#### Slow build times
- Enable incremental builds: `--incremental`
- Limit posts: `--limit_posts 10`
- Exclude unnecessary files in `_config.yml`

#### Memory issues
- Increase available memory: `--verbose`
- Use production build settings

## 🌐 Deployment

### GitHub Pages (Recommended)
The repository is configured for automatic deployment via GitHub Actions. Simply push to `main` branch.

### Manual Deployment
```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Deploy _site folder to your hosting provider
```

### Custom Domain Setup
1. Add `CNAME` file to repository root
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

## 🔗 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 💡 Development Tips

1. **Use LiveReload** for instant feedback during development
2. **Check the build output** for warnings and errors
3. **Test locally** before pushing to production
4. **Use semantic versioning** for releases
5. **Document your changes** in commit messages

---

Need help? Check our [Contributing Guide](CONTRIBUTING.md) or open an issue on GitHub!
