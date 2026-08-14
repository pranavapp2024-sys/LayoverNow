# System Testing Report Generation Prompt

## Objective
Perform a repository-based system testing analysis and generate a professional System Testing Report that answers:

1. What system has been implemented?
2. What versions/releases of the system can be identified?
3. What capabilities and functional requirements are expected?
4. Which requirements have system-level verification evidence?
5. Which requirements are only partially tested?
6. Which requirements have no identifiable system-level test evidence?
7. What additional system tests should be performed?
8. Are there behaviors encountered during test analysis that are missing, ambiguous, or incompletely specified?
9. How strong is the overall system-level verification evidence?

## Evidence Classifications
- **VERIFIED:** Direct repository evidence supports the statement.
- **PARTIALLY VERIFIED:** Some evidence exists but is incomplete.
- **INFERRED:** Behavior appears likely but cannot be conclusively verified.
- **NOT VERIFIED:** Expected behavior cannot be supported by repository evidence.
- **NOT IMPLEMENTED:** Requirement or capability appears absent.

## Repository Inspection Checklist
- README, PRD, functional requirements, risk analysis
- Source code, tests, test data, test scripts
- Configuration files, dependency files, environment files
- CI/CD workflows, GitHub Actions, branches, tags, releases
- Commit history, issue records, change records
- Deployment instructions, API definitions

## Deliverables
1. System Under Test (SUT) description
2. Requirements Baseline table
3. Requirements-to-System-Test Traceability Matrix
4. Q1/Q2/Q3 Coverage Analysis
5. Test Environment and Reproducibility documentation
6. Version-by-Version System Testing
7. Requirements Discovery Register
8. Testing Gap Analysis (prioritized)
9. Defects and Unexpected Behavior Register
10. System Test Procedures with steps, expected results, actual results
11. Engineering Assessment and Release Confidence
12. Student Engineering Decisions Required
13. Conclusions and Recommended Next Actions

## Important Rules
- Do not claim something exists, was tested, passed, or failed unless repository evidence supports it.
- Do not convert INFERRED or NOT VERIFIED behavior into VERIFIED behavior.
- A generated test case is NOT evidence that the test passed.
- Distinguish clearly between what the repository proves, what can be inferred, what is planned, and what has been executed.
