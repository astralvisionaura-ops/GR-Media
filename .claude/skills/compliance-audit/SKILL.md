---
name: compliance-audit
description: "Run compliance intelligence: detect regulatory frameworks from project signals, assess priority, generate compliance detection report, and identify gaps before release."
user-invocable: true
disable-model-invocation: true
context: fork
model: claude-opus-4-6
agent: Explore
hooks:
  Stop:
    - hooks:
        - type: command
          command: "\"${CLAUDE_PROJECT_DIR}\"/.claude/hooks/skill-complete.sh compliance-audit"
          async: true
---

# Compliance Audit

ultrathink

## Resource Usage

Expected: 3–8 turns, 5,000–20,000 tokens depending on project complexity and number of active compliance frameworks. Class 4 projects with multiple active frameworks may reach the upper bound. If this skill is invoked repeatedly in the same session, consider whether a targeted gap check (Step 4 only) is sufficient instead of a full re-audit.

## Principles
- Detection is automatic — not triggered by the user asking
- Priority is assigned by the system — confirmed by the user
- A compliance signal is treated as CRITICAL until assessed otherwise
- Silence is not clearance — no detection does not mean no obligation

## Step 1 — Regulatory Detection

Scan the project for keyword triggers:

| Keywords | Framework | Confidence |
|---|---|---|
| medical, health, patient, clinical, diagnostic | MDR 2017/745, IEC 62304, ISO 14971 | HIGH |
| payment, transaction, financial, banking | PSD2, PCI-DSS | HIGH/MEDIUM |
| bank, insurance, investment, fintech, crypto, trading, financial entity, ICT provider to finance | DORA 2022/2554 | HIGH |
| essential services, critical infrastructure, cloud provider, managed service, DNS, CDN, data centre, EU market B2B | NIS2 2022/2555 | HIGH |
| B2B, enterprise, SaaS, multi-tenant (EU market, 50+ employees or €10M+ revenue) | NIS2 2022/2555 | MEDIUM |
| children, minor, under 18 | GDPR Art. 8, COPPA | HIGH/MEDIUM |
| personal data, PII, user data, email, location | GDPR | HIGH |
| AI, ML, model, prediction, algorithm | EU AI Act, ISO 42001 | MEDIUM |
| B2B, enterprise, SaaS, multi-tenant | SOC 2, ISO 27001 | MEDIUM/LOW |
| industrial, OT, SCADA, PLC, safety | IEC 61508, IEC 62443 | HIGH/MEDIUM |
| web, frontend, UI, app, digital product, SaaS (EU market, public-facing) | EAA 2025 (European Accessibility Act), WCAG 2.1 AA | HIGH |
| identity, authentication, eID, digital wallet, cross-border (EU) | eIDAS 2.0 | MEDIUM |
| data transfer, third-country, US provider, cloud (non-EU) | GDPR Art. 44–49, Schrems II (standard contractual clauses) | HIGH |

**NIS2 note**: Applies to medium/large entities (50+ employees OR €10M+ revenue) in essential sectors (energy, transport, health, digital infrastructure, banking) and important sectors (digital providers, manufacturing, postal, food). ICT products serving these sectors may also fall in scope as third-party providers.

**DORA note**: Applies to financial entities AND their ICT third-party service providers. If the software IS a financial service or is sold to financial entities, DORA compliance is mandatory from Jan 2025.

## Step 2 — Priority Assignment

- **CRITICAL**: No legal basis for PII, no MDR classification, no AI Act classification, no NIS2 incident reporting plan (where applicable), active data breach
- **HIGH**: GDPR DPIA required, DORA ICT Risk Management Framework missing, NIS2 security measures undocumented, SOC 2 Type I required, ISO 27001 scope undefined, IEC 62304 docs incomplete, EAA 2025 WCAG 2.1 AA not implemented (EU-facing digital product post June 28, 2025), Schrems II SCC missing for third-country data transfers
- **MEDIUM**: Cookie consent, privacy policy, DPA with processors, vulnerability disclosure, NIS2 supplier security assessment, DORA third-party risk register, eIDAS 2.0 compliance scope assessment, NIS2 incident reporting procedure missing
- **LOW**: WCAG AAA, ISO 27001 certification vs conformance, DORA TLPT (systemic-level only), eIDAS 2.0 wallet integration (if not in scope)

## Step 3 — Detection Report

```
COMPLIANCE DETECTION REPORT
Project: [name] | Class: [N] | Date: [date]

CRITICAL: [list or None detected]
HIGH:     [list or None detected]
MEDIUM:   [list or None detected]
LOW:      [list or None detected]

ESCALATION RECOMMENDED: YES/NO — [reason]
Action: Load [comp_spec files] for active compliance tracking.
```

## Step 4 — Gap Detection (Pre-Release)

For each active compliance spec:
1. Cross-reference against `qa/qa_spec-conformance.md`
2. Identify requirements with no CF entry, open CF entries beyond threshold, pending evidence
3. Any CRITICAL gap → block release

Report gaps to QM agent for CF creation.
