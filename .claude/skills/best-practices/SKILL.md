---
name: best-practices
description: "Research and document best practices for the project's technology stack, domain, and class. Runs at project init (T1), mid-implementation (T2), and pre-release (T3)."
user-invocable: true
disable-model-invocation: true
context: fork
agent: Explore
argument-hint: "[T1 | T2 | T3 | topic]"
---

# Best Practice Research

## Resource Usage

Expected: 2–5 turns with web search. T1 (project init) covers full stack + domain. T2/T3 are scoped to a specific topic and are significantly cheaper. Avoid invoking without an argument — always pass a trigger (`T1`, `T2`, `T3`) or specific topic.

Trigger / topic: **$ARGUMENTS**

## Trigger Points

### T1 — Project Init
After discovery, before specification. Establish baseline best practices for:
- Chosen technology stack
- Target domain (web-saas, desktop, mobile, embedded)
- Project class and compliance requirements

### T2 — Mid-Implementation
When unknown technical terrain is encountered:
- Web search for current best practices
- Evaluate against project constraints
- Document findings with confidence level

### T3 — Pre-Release
Regulatory and security delta check:
- Have best practices changed since T1?
- Are there new security advisories for dependencies?
- Have compliance standards been updated?

## Research Protocol

1. Identify the topic requiring research
2. Search for recent, authoritative sources
3. Cross-reference minimum 2 sources
4. Assess confidence: HIGH (established consensus) / MEDIUM (recent, emerging) / LOW (contested)
5. Document with source references

## Output Format

```
BEST PRACTICE: [title]
DOMAIN:        [technology | security | compliance | architecture]
CONFIDENCE:    [HIGH | MEDIUM | LOW]
SOURCES:       [references]
APPLIES TO:    [which agents / phases]
RECOMMENDATION: [actionable guidance]
```
