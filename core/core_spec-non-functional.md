# core_spec-non-functional.md

# core/core_spec-non-functional.md | Non-Functional Requirements

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — written by requirements agent
AUDIENCE:   all agents
OWNED BY:   agent_spec-requirements.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [spec version]
STATUS:         DRAFT | REVIEWED | FINAL
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-requirements
```

Non-functional requirements define system qualities.
Every NFR must have a measurable threshold.
Vague statements (“the system must be fast”) are not accepted.

-----

## [SECTION] performance

```
NFR-P-001
STATEMENT: [service / component] must respond to [operation]
           within [Xms] at the [Nth] percentile under [Y concurrent users].
BASELINE:  [target or range — with unit]
VERIFIED:  load test | benchmark | profiling

NFR-P-002
STATEMENT: Application startup time (cold) must not exceed [Xs].
BASELINE:  [target]
VERIFIED:  automated timing in CI
```

Frontend performance budget (from domain config if applicable):

```
LCP:       < [X]s
CLS:       < [X]
FID/INP:   < [X]ms
Bundle:    < [X]KB gzipped initial load
```

-----

## [SECTION] availability

```
NFR-A-001
STATEMENT: System must achieve [X]% uptime measured monthly,
           excluding planned maintenance windows.
BASELINE:  [e.g., 99.5% = ~3.6h downtime/month]
VERIFIED:  uptime monitoring

NFR-A-002
STATEMENT: Planned maintenance windows must not exceed [X] hours per month
           and must be announced [Y] hours in advance.
BASELINE:  [target]
VERIFIED:  documented maintenance log
```

-----

## [SECTION] scalability

```
NFR-S-001
STATEMENT: System must support [X] concurrent users without
           degrading below NFR-P-001 thresholds.
BASELINE:  [number]
VERIFIED:  load test

NFR-S-002
STATEMENT: System must scale horizontally to [X] instances
           without requiring code changes.
BASELINE:  [number]
VERIFIED:  staging test with multiple instances
```

-----

## [SECTION] security

```
NFR-SEC-001
STATEMENT: All data in transit must be encrypted using TLS [version]+.
BASELINE:  TLS 1.2 minimum, TLS 1.3 preferred
VERIFIED:  TLS scan in CI

NFR-SEC-002
STATEMENT: All PII at rest must be encrypted using AES-256 or equivalent.
BASELINE:  AES-256
VERIFIED:  infrastructure configuration review

NFR-SEC-003
STATEMENT: Authentication tokens must expire after [X] minutes of inactivity.
BASELINE:  [value — informed by security policy and UX tradeoff]
VERIFIED:  automated test

NFR-SEC-004
STATEMENT: OWASP Top 10 vulnerabilities must be mitigated before release.
BASELINE:  Zero OWASP Top 10 findings in production
VERIFIED:  security scan + manual review
```

-----

## [SECTION] compliance

One entry per active compliance framework. Derived from discovery.

```
NFR-C-001
FRAMEWORK: [GDPR | SOC 2 | ISO 27001 | etc.]
STATEMENT: System must comply with [framework] as defined in
           .compliance/comp_spec-[name].md
BASELINE:  Zero CRITICAL compliance findings at release
VERIFIED:  qa_spec-conformance.md — all CRITICAL findings RESOLVED
```

-----

## [SECTION] reliability

```
NFR-R-001
STATEMENT: Recovery Time Objective (RTO) must not exceed [X] hours
           after a full system failure.
BASELINE:  [value]
VERIFIED:  DR drill in staging

NFR-R-002
STATEMENT: Recovery Point Objective (RPO) must not exceed [X] minutes
           of data loss in a failure scenario.
BASELINE:  [value]
VERIFIED:  backup restore test
```

-----

## [SECTION] maintainability

```
NFR-M-001
STATEMENT: Test coverage for business logic must be ≥ [X]%.
BASELINE:  [e.g., 80%]
VERIFIED:  CI coverage report

NFR-M-002
STATEMENT: All public API endpoints must have complete documentation.
BASELINE:  100% endpoint documentation coverage
VERIFIED:  documentation linting in CI
```

-----

## [SECTION] retention-and-data-lifecycle

Required when PII = true. Derived from compliance discovery.

```
NFR-D-001
DATA CATEGORY:  [e.g., user accounts]
RETENTION:      [X days | years | until account deletion]
LEGAL BASIS:    [GDPR Art. 5(1)(e) — legitimate purpose]
DELETION:       [automated on expiry | triggered by subject request]
VERIFIED:       automated test or retention enforcement test
```