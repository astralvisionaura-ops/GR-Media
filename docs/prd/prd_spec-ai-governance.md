# prd_spec-ai-governance.md

# docs/prd/prd_spec-ai-governance.md | AI Governance

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION — when AI component = true
AUDIENCE:   Instructor, stakeholders, regulators, auditors

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        [e.g., 1.0.0]
STATUS:         DRAFT | IN REVIEW | APPROVED
DATE:           [YYYY-MM-DD]
AI COMPONENTS:  [list AI/ML components in this product]
EU AI ACT:      [risk classification — or: not applicable]
```

-----

## [SECTION] ai-system-description

```
WHAT THE AI DOES:
  [Plain-language description of AI functionality.
   What does it take as input? What does it output?
   What decisions does it influence or make?]

TRAINING DATA:
  [What data was the model trained on?
   Source, scope, date range, known limitations.]

MODEL TYPE:
  [Classification | Regression | Generation | Recommendation | Other]
  [Proprietary | Third-party — if third-party: vendor and model name]

UPDATE CADENCE:
  [How often is the model retrained or updated?]
```

-----

## [SECTION] risk-assessment

```
EU AI ACT CLASSIFICATION:
  [Unacceptable | High-risk | Limited risk | Minimal risk]
  JUSTIFICATION: [why this classification applies — cite Art. / Annex]

POTENTIAL HARMS:
  [List potential harms from AI failure or misuse.
   Include: false positives, false negatives, bias, over-reliance.]

SEVERITY PER HARM:
  [CRITICAL | HIGH | MEDIUM | LOW — with rationale]

AFFECTED GROUPS:
  [Who could be harmed? Are vulnerable groups affected?]
```

-----

## [SECTION] bias-and-fairness

```
KNOWN BIASES:
  [What biases are present or suspected in the training data or model?]

EVALUATION PERFORMED:
  [What fairness evaluation was performed before deployment?
   Datasets used, metrics measured, results.]

MITIGATION MEASURES:
  [What was done to reduce bias?]

RESIDUAL RISK:
  [What bias risk remains? Accepted by Instructor — document here.]
```

-----

## [SECTION] human-oversight

```
OVERSIGHT MECHANISM:
  [How can humans review, override, or correct AI outputs?]

AUTOMATION LEVEL:
  Fully automated decision:  [YES | NO]
  Human-in-the-loop:         [YES | NO — describe when and how]
  Human override available:  [YES | NO — describe mechanism]

ESCALATION:
  [Under what conditions is the AI decision escalated to a human?]

AUDIT TRAIL:
  [How are AI decisions logged for review?
   Retention period, access controls.]
```

-----

## [SECTION] transparency

```
USER DISCLOSURE:
  [How are users informed they are interacting with AI?
   Timing: before first interaction | inline | on request]

EXPLAINABILITY:
  [Can the system explain its outputs?
   Level of explanation available to users vs. administrators]

LIMITATIONS COMMUNICATED:
  [How are the AI's limitations communicated to users?]
```

-----

## [SECTION] performance-standards

```
PRIMARY METRIC:     [e.g., accuracy, F1-score, precision, recall]
TARGET:             [threshold — with justification]
CURRENT:            [actual measured value — with date and dataset]
MINIMUM ACCEPTABLE: [floor below which the system is not deployed]

DRIFT MONITORING:
  [How is model performance monitored in production?
   What triggers a retraining or re-evaluation?]
```

-----

## [SECTION] incident-response

```
AI-SPECIFIC INCIDENTS:
  [What counts as an AI-related incident?
   e.g., bias complaint, unexplained decision, significant accuracy drop]

RESPONSE PROCEDURE:
  1. [step]
  2. [step]
  3. [notification — who, when, how]

ROLLBACK:
  [How is the AI component disabled or rolled back if needed?]
```