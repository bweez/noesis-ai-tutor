# 📜 Simplified Scripts Reference

## 🎯 **Core Development Workflow**

### Essential Commands (Use These Daily)
```bash
npm run dev          # Start server + watch mode testing
npm start            # Start Jekyll server only
npm run test         # Run all tests (fast fail approach)
npm run coverage     # Full coverage report (Jest + Cypress)
```

## 🧪 **Testing Commands**

### Basic Testing
```bash
npm test             # All tests with fail-fast approach
npm run test:unit    # Unit tests only (Jest)
npm run test:e2e     # E2E tests only (Cypress with coverage)
npm run test:ci      # CI/CD friendly tests (headless Cypress)
```

### Development Testing
```bash
npm run test:watch   # Interactive test menu for development
npm run test:smoke   # Quick smoke tests
npm run test:wip     # Work-in-progress tests
```

## 📊 **Coverage Commands**

```bash
npm run coverage         # Full Jest + Cypress coverage
npm run coverage:open    # View HTML coverage report
npm run coverage:stats   # Show current coverage stats
npm run coverage:reset   # Clean all coverage data
```

## 🖥️ **Server Management**

```bash
npm start            # Start Jekyll server
npm stop             # Stop Jekyll server  
npm restart          # Restart Jekyll server
```

## 📖 **Documentation**

```bash
npm run docs         # Serve docs site locally
npm run docs:build   # Build docs site
```

## ⚙️ **Setup**

```bash
npm run setup        # Install dependencies + verify tools + start server
```

---

## 🎨 **What Changed?**

### ✅ **Simplified & Organized**
- **Before**: 27 confusing scripts with overlaps
- **After**: 16 clear, organized scripts

### 🗂️ **Logical Grouping**
- **Core Commands**: Daily development workflow
- **Testing**: All test-related commands
- **Coverage**: Coverage analysis and reporting
- **Documentation**: Jekyll docs management

### 🧹 **Eliminated Duplication**
- Merged overlapping server commands
- Combined coverage commands
- Removed redundant test variations
- Consolidated CI/CD commands

### 🚫 **No More Directory Changes**
- All `cd` commands removed
- Commands work from root context
- Cleaner execution model

### 🎯 **Clear Purpose**
Each script has a single, clear purpose:
- `npm run dev` → Development workflow
- `npm run test` → Run tests
- `npm run coverage` → Analyze coverage
- `npm start` → Start server

The scripts are now intuitive and follow common npm conventions! 🎉
