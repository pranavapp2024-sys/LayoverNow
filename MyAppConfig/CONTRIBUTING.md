# Contributing to LayoverNow

Thank you for your interest in contributing to LayoverNow! This document outlines the process for contributing to the project and ensures a smooth collaboration experience.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Branching Strategy](#branching-strategy)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Review Process](#review-process)
8. [Release Process](#release-process)

---

## 📜 Code of Conduct

This project adheres to a standard of respectful, inclusive collaboration. By participating, you agree to:

- Be respectful and constructive in all communications
- Welcome newcomers and help them learn
- Focus on what is best for the project and its users
- Accept constructive criticism gracefully

---

## 🚀 Getting Started

### Prerequisites

- Google Chrome (v120+)
- Git (v2.30+)
- A GitHub account
- Basic knowledge of JavaScript, HTML, and CSS

### Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/LayoverNow.git
cd LayoverNow

# 3. Add the upstream remote
git remote add upstream https://github.com/pranavapp2024-sys/LayoverNow.git

# 4. Verify remotes
git remote -v
# Should show:
# origin    https://github.com/YOUR_USERNAME/LayoverNow.git (fetch)
# origin    https://github.com/YOUR_USERNAME/LayoverNow.git (push)
# upstream  https://github.com/pranavapp2024-sys/LayoverNow.git (fetch)
# upstream  https://github.com/pranavapp2024-sys/LayoverNow.git (push)
```

---

## 🔄 Development Workflow

### 1. Sync with Upstream

Always start by syncing your local `main` branch with the upstream repository:

```bash
git checkout main
git pull upstream main
git push origin main
```

### 2. Create a Feature Branch

Branch names should follow the convention: `type/short-description`

```bash
# Feature branch
git checkout -b feature/add-currency-converter

# Bug fix branch
git checkout -b fix/canvas-memory-leak

# Documentation branch
git checkout -b docs/update-api-guide
```

**Branch Types:**
| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New functionality | `feature/visa-checker` |
| `fix/` | Bug fixes | `fix/api-timeout-handling` |
| `docs/` | Documentation changes | `docs/setup-instructions` |
| `refactor/` | Code restructuring | `refactor/search-module` |
| `test/` | Adding or updating tests | `test/deal-filter-coverage` |

### 3. Make Changes

- Write clean, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation if needed

### 4. Test Locally

Before committing, test your changes:

```bash
# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the project folder
# 5. Test your changes thoroughly
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add currency converter to AeroAI assistant"
```

See [Commit Message Guidelines](#commit-message-guidelines) below.

### 6. Push to Your Fork

```bash
git push origin feature/add-currency-converter
```

### 7. Open a Pull Request

Go to GitHub and open a Pull Request from your feature branch to the upstream `main` branch.

---

## 🌿 Branching Strategy

We use a simplified GitFlow strategy:

```
main          ← Production-ready code, protected branch
  │
  ├── feature/radar-optimization
  ├── feature/ai-chat-history
  ├── fix/cors-handling
  └── docs/contributing-guide
```

### Rules

1. **Never commit directly to `main`** — all changes must go through Pull Requests
2. **Keep branches focused** — one feature or fix per branch
3. **Delete merged branches** — clean up after PRs are merged
4. **Rebase before merging** — keep history linear when possible

---

## 💬 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(radar): add zoom controls` |
| `fix` | Bug fix | `fix(api): handle 429 rate limit errors` |
| `docs` | Documentation | `docs(readme): add installation steps` |
| `style` | Code style (formatting) | `style(css): fix indentation` |
| `refactor` | Code restructuring | `refactor(search): extract filter logic` |
| `test` | Adding tests | `test(deals): add filter algorithm tests` |
| `chore` | Maintenance tasks | `chore(deps): update manifest version` |

### Examples

```bash
# Good commits
git commit -m "feat(ai): add conversation history to AeroAI chatbot"
git commit -m "fix(canvas): resolve memory leak in radar animation loop"
git commit -m "docs(api): document Amadeus API error codes"
git commit -m "refactor(storage): migrate from localStorage to chrome.storage"

# Bad commits (avoid these)
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "WIP"
```

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Branch is up-to-date with `upstream/main`
- [ ] All changes are committed with clear messages
- [ ] Code has been tested in Chrome Developer Mode
- [ ] No console errors or warnings
- [ ] Documentation updated (if applicable)
- [ ] CHANGELOG.md updated (if applicable)

### PR Template

When opening a Pull Request, please use this format:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Changes tested in Chrome
- [ ] Documentation updated
```

### PR Review Criteria

Maintainers will review your PR against these criteria:

1. **Functionality** — Does it work as intended?
2. **Code Quality** — Is it clean, readable, and maintainable?
3. **Performance** — Does it introduce unnecessary overhead?
4. **Compatibility** — Does it work with Manifest V3 constraints?
5. **Privacy** — Does it handle user data responsibly?
6. **Documentation** — Is the change documented?

---

## ✅ Review Process

1. **Automated Checks** — GitHub Actions runs CI pipeline (linting, tests)
2. **Code Review** — At least one maintainer must approve
3. **Discussion** — Address any feedback or questions
4. **Merge** — Maintainer merges when approved and checks pass

### Responding to Feedback

```bash
# Make requested changes
git add .
git commit -m "fix: address review feedback on error handling"
git push origin feature/your-branch
```

The PR will automatically update with your new commits.

---

## 🏷️ Release Process

Releases are managed by maintainers:

1. Update version in `manifest.json`
2. Update `CHANGELOG.md`
3. Create a Git tag: `git tag -a v1.1.0 -m "Release v1.1.0"`
4. Push tag: `git push origin v1.1.0`
5. GitHub Actions automatically creates a release draft
6. Publish release on GitHub

---

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/pranavapp2024-sys/LayoverNow/discussions)
- Create an [Issue](https://github.com/pranavapp2024-sys/LayoverNow/issues)
- Check existing documentation in the `docs/` folder

---

Thank you for contributing to LayoverNow! 🛫
