---
paths:
  - "src/**"
  - "qa/**"
---
# Compliance Rules

- Compliance is a first-class requirement — identified in discovery, tracked through every phase
- Every compliance claim requires concrete evidence — "we comply" without a reference is invalid
- Agents do not interpret law — they apply documented controls. Legal interpretation → escalate
- PII processing without documented legal basis → BLOCKED — escalate immediately
- All compliance findings tracked as CF-[NNN] in `qa/qa_spec-conformance.md`
- Release blocked if any CRITICAL compliance finding is not RESOLVED
- Evidence format: reference (file+section), method (automated/manual/external), date, verified-by
