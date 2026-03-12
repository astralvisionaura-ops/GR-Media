# qa_spec-test-cases.md

# qa/qa_spec-test-cases.md | Test Cases

-----

## [CONTEXT]

INHERITS:   —
PHASE:      QM — written by qm agent
AUDIENCE:   qm agent, all implementation agents
OWNED BY:   agent_spec-qm.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [version]
STATUS:         DRAFT | IN PROGRESS | COMPLETE
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-qm
```

Test cases operationalize acceptance criteria.
Minimum one test case per acceptance criterion.
Test types applied per class as defined in agent_spec-qm.md#testing-standards.

-----

## [SECTION] test-case-format

```
TC-NNN
AC:       AC-[NNN] (source criterion)
TYPE:     UNIT | INTEGRATION | E2E | PERFORMANCE | SECURITY | ACCESSIBILITY | EDGE
PRIORITY: HIGH | MEDIUM | LOW
STATUS:   PENDING | PASS | FAIL | SKIP
RUN DATE: [YYYY-MM-DD — or: —]

SETUP:    [preconditions and test data]
STEPS:    [numbered steps to execute]
EXPECTED: [precise expected result]
ACTUAL:   [actual result — fill after execution]
NOTES:    [observations, defect reference — or: —]
```

-----

## [SECTION] unit-tests

Tests for individual functions or modules in isolation.

```
TC-001
AC:       AC-001
TYPE:     UNIT
PRIORITY: HIGH
STATUS:   PENDING
RUN DATE: —

SETUP:    [test data or mocks]
STEPS:    1. [step]
EXPECTED: [expected return value or state]
ACTUAL:   —
NOTES:    —
```

-----

## [SECTION] integration-tests

Tests for component interactions and API contract verification.

```
[TC-NNN blocks for integration tests]
[Each API endpoint should have at least one integration test verifying
 the contract defined in core_arch-system-design.md#api-contracts]
```

-----

## [SECTION] e2e-tests

Tests for complete user journeys.

```
[TC-NNN blocks for end-to-end tests]
[Cover: happy path per user journey, key failure paths,
 authentication flows, critical business operations]
```

-----

## [SECTION] performance-tests

Tests verifying NFRs from core_spec-non-functional.md#performance.

```
TC-PERF-001
AC:       NFR-P-001
TYPE:     PERFORMANCE
PRIORITY: HIGH
STATUS:   PENDING
RUN DATE: —

SETUP:    [load profile: X concurrent users, Y duration]
STEPS:    1. Execute load test with defined profile
EXPECTED: [Xth percentile response time < Yms]
ACTUAL:   —
NOTES:    —
```

-----

## [SECTION] security-tests

Tests verifying security requirements. Minimum for Class 2+.

```
TC-SEC-001
AC:       NFR-SEC-001
TYPE:     SECURITY
PRIORITY: HIGH
STATUS:   PENDING

SETUP:    [tool or manual approach]
STEPS:    1. [step]
EXPECTED: [expected finding: no vulnerabilities in scope]
ACTUAL:   —
NOTES:    [link to scan report when complete]
```

-----

## [SECTION] edge-case-tests

Tests derived from core_spec-edge-cases.md.

```
TC-EC-001
AC:       EC-I-001
TYPE:     EDGE
PRIORITY: HIGH
STATUS:   PENDING

SETUP:    [boundary condition setup]
STEPS:    1. [step]
EXPECTED: [expected handling of edge condition]
ACTUAL:   —
NOTES:    —
```

-----

## [SECTION] execution-summary

Updated after each test run:

```
RUN DATE:     [YYYY-MM-DD]
SCOPE:        [what was tested]
ENVIRONMENT:  [staging | local | CI]

RESULTS:
  TOTAL:       [N]
  PASS:        [N]
  FAIL:        [N]
  SKIP:        [N]

DEFECTS:      [list TC-NNN entries with FAIL + one-line description]
RELEASE:      READY | NOT READY
BLOCKER:      [list or —]
```