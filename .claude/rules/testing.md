---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "qa/**"
---
# Testing Rules

- One acceptance criterion per MUST requirement (Gherkin format: Given/When/Then)
- One test case per acceptance criterion minimum
- Test execution order: unit → integration → E2E → performance → security → accessibility → edge cases
- Class 1: manual acceptance only. Class 2: unit + manual E2E. Class 3: unit + integration + E2E + perf. Class 4: + security + regulatory evidence
- Every RESOLVED compliance finding requires: file reference, verification method, date
