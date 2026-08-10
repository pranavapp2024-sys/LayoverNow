# Quick Reference: LayoverNow CM Artifacts

## File Locations

```
LayoverNow/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                 # GitHub Actions CI pipeline
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md          # Bug report template
│   │   └── feature_request.md     # Feature request template
│   ├── pull_request_template.md   # PR checklist template
│   └── dependabot.yml             # Auto dependency updates
├── lib/
│   └── validateAdvice.js          # Advice validation logic
├── __tests__/
│   └── validateAdvice.test.js     # Jest unit tests
├── docs/
│   ├── CONFIGURATION_MANAGEMENT_REPORT.md
│   ├── TRACEABILITY_MATRIX.md
│   └── CM_PLAN.md
├── scripts/
│   └── create-release.sh          # Release tagging script
├── jest.config.js                 # Jest test configuration
└── README_CM_FILES.md             # This guide
```

## One-Command Setup

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm test

# 3. Run linter
npm run lint

# 4. Create release tag
./scripts/create-release.sh 1.0.1
```

## GitHub Settings to Enable

1. **Settings → Branches → Add rule**
   - Branch name pattern: `main`
   - ☑ Require a pull request before merging
   - ☑ Require approvals: 1
   - ☑ Require status checks to pass before merging
   - ☑ Require branches to be up to date before merging
   - Status checks: `lint-and-test`
   - ☑ Do not allow bypassing the above settings

2. **Settings → Secrets and variables → Actions**
   - Add any required secrets (API keys for deployment)

3. **Settings → Security → Code security**
   - Enable Dependabot alerts
   - Enable Dependabot security updates
