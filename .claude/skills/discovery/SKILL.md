---
name: discovery
description: "Run project discovery workflow: analyze project description, detect domain/regulatory/complexity signals, consult specialized agents, propose project class, and confirm with the user."
user-invocable: true
disable-model-invocation: true
context: fork
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
---

# Project Discovery

## Principles
- No specification begins before discovery is complete
- Assumptions are named and confirmed — never silent
- The class proposal is a recommendation — the user decides
- Regulatory detection happens in discovery — not after specification

## Step 1 — Project Analysis

Receive project description from the user. Analyze for:

**Domain Signals**: Web / API / Mobile / Desktop / Embedded / Hybrid
**Regulatory Signals**:
- medical, health, patient, clinical → MDR 2017/745 / IEC 62304 / ISO 14971
- payment, transaction, financial → PSD2 / PCI-DSS
- bank, insurance, investment, fintech, financial entity, ICT provider to finance → DORA 2022/2554
- children, minor, under 18 → GDPR Art. 8 / COPPA
- AI, ML, model, prediction, algorithm → EU AI Act / ISO 42001
- essential services, critical infrastructure, cloud/managed service, EU market B2B → NIS2 2022/2555
- personal data, PII, email, user data, location → GDPR
- B2B, enterprise, SaaS → SOC 2 / ISO 27001 / NIS2 (if EU market)
- web, app, frontend, UI, digital product (EU market, public-facing) → EAA 2025 (mandatory WCAG 2.1 AA from June 28, 2025)
- identity, eID, digital wallet, cross-border authentication (EU) → eIDAS 2.0
- third-country data transfer, US cloud provider, non-EU hosting → GDPR Art. 44–49 / Schrems II
- German government, Bundesbehörde, Bund, Land, Gemeinde, öffentliche Verwaltung → BSI IT-Grundschutz (BSI-Standard 200-1/2/3)
- KRITIS, kritische Infrastruktur, §8a BSIG, Betreiber kritischer Infrastrukturen → BSI IT-Grundschutz + NIS2 (KRITIS overlap)
- VS-NfD, Verschlusssache, classified, Geheimschutz → BSI IT-Grundschutz Kern-Absicherung + VSA
- BSI-Zertifizierung, Common Criteria, ISO 27001 auf IT-Grundschutz-Basis → BSI IT-Grundschutz

**Complexity Signals**: team size, external users, multi-tenant, regulated industry

Output: signal map (not yet a class proposal).

## Step 2 — Regulatory Detection

Execute compliance keyword scan against signal map. Output:
```
REGULATORY FINDINGS:
  [framework]: [why triggered] — confidence: [HIGH|MEDIUM|LOW]
  or: No regulatory frameworks detected.
```

## Step 3 — Class Proposal

Based on signals + regulatory findings:

```
Recommended class: [1|2|3|4]

Evidence:
  [signal] → [implication]

Alternative class: [N] — if [condition]

"Does this match your understanding of the project?"
```

## Step 4 — User Questions

Ask only what cannot be determined from the description:
- Decisions requiring business context only the user has
- Two equally valid options — user preference needed
- Regulatory classification depending on intended use

Format: "[TOPIC]: [context]. Our assessment: [recommendation]. Your decision: [question]"
Maximum 2 questions per round.

## Step 5 — Confirmation

After user confirms class:
1. Set ACTIVE PHASE, CLASS, ACTIVE DOMAIN in CLAUDE.md
2. Report: "Discovery complete. Class [N] confirmed. Domain: [domain]. Ready to begin specification."
