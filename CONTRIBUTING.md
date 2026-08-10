# Contributing to LayoverNow

Thank you for your interest in contributing!

## Development Workflow

### Branching Strategy

We use a simplified GitFlow model:

| Branch | Purpose | Rules |
|--------|---------|-------|
| `main` | Production-ready code | Protected — changes only via Pull Request |
| `develop` | Integration branch | Merge feature branches here for testing |
| `feature/*` | New features | Branch from `develop`, merge back via PR |
| `fix/*` | Bug fixes | Branch from `main` or `develop`, merge via PR |
| `docs/*` | Documentation | Branch from `main`, merge via PR |

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(radar): add zoom controls to map"
git commit -m "fix(api): handle 429 rate limit errors gracefully"
git commit -m "docs(readme): update installation instructions"
```

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes with clear, descriptive commits
3. Test your changes in Chrome Developer Mode
4. Open a Pull Request against `main` or `develop`
5. Fill out the PR template completely
6. Address any review feedback
7. Merge only after approval

### Code Review Checklist

- [ ] Code follows existing style and patterns
- [ ] No console errors or warnings
- [ ] Manifest V3 compliance verified
- [ ] No API keys or secrets in code
- [ ] Changes tested in Chrome Developer Mode
- [ ] Documentation updated if needed
