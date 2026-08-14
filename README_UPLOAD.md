# LayoverNow System Testing Files

## Files Included

| File | Purpose | Upload Location |
|---|---|---|
| `System-Testing-Report.md` | Complete system testing report with 18 test procedures | `.github/repo/docs/System-Testing-Report.md` |
| `Test-Report-Prompt-V1.md` | The prompt used to generate this report | Repository root (same level as README.md) |

## How to Upload to GitHub

### Option A: GitHub Web Interface
1. Go to https://github.com/pranavapp2024-sys/LayoverNow
2. Click **Add file** -> **Create new file**
3. For the report: type `.github/repo/docs/System-Testing-Report.md` as the file path
4. Paste the contents of `System-Testing-Report.md`
5. Commit with message: `docs: add system testing report`
6. For the prompt: create `Test-Report-Prompt-V1.md` at root level
7. Commit with message: `docs: add testing prompt`

### Option B: Git Command Line (Recommended for nested directories)
```bash
git clone https://github.com/pranavapp2024-sys/LayoverNow.git
cd LayoverNow
mkdir -p .github/repo/docs
cp /path/to/System-Testing-Report.md .github/repo/docs/
cp /path/to/Test-Report-Prompt-V1.md .
git add .
git commit -m "docs: add system testing report and prompt"
git push origin main
```

## What You Must Do After Uploading

1. **Execute the tests in Chrome** using the setup instructions in Section 2.3-2.4 of the report.
2. **Fill in the Actual Result and Status columns** for all 18 tests in Section 8.
3. **Take screenshots** of test execution as evidence (especially for UI tests like ST-09).
4. **Commit your updated report** with actual results filled in.
5. **Export as PDF** for submission to your professor.
6. **Submit your GitHub link** and attach the PDF.

## Grading Alignment

| Rubric Criterion | How This Report Addresses It |
|---|---|
| **Test Documentation (20 pts)** | Sections 2.1-2.4 detail dev/test software with versions, setup instructions for both environments |
| **Test Cases (80 pts)** | 18 detailed system test procedures with steps, expected results, actual results, Q1/Q2/Q3 coverage |

---
*Generated: August 14, 2026*
