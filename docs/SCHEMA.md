# .yawn File Schema Reference

> Version 2.0.0

The complete reference for the `.yawn` file format used by YawnJobs.

---

## Overview

A `.yawn` file is a YAML-based document with:
- **Frontmatter** - Coherence metadata and navigation
- **Sections** - Standardized content blocks
- **Evidence** - Proof of completion

---

## File Structure

```yaml
---
# FRONTMATTER (required)
schema_version: 2.0.0
coherence: {...}
navigation: {...}
---

# TITLE (required)

## AWAKENING (required)
## ENTITIES (required)
## CLAIMS (optional)
## FORCES (required)
## THE JOB (required for YawnJobs)
## DO's (optional)
## DON'T's (optional)
## CHECKS (optional)
## EVALUATIONS (required)
## COMPLETION CONDITIONS (required)
## GRADUATION CRITERIA (optional)
## EVOLUTION LOG (required)
## META (required)
```

---

## Frontmatter

### Coherence Metadata

```yaml
coherence:
  score: 0.0              # 0-100, computed by system
  last_check: null        # ISO date of last coherence check
  questions_answered: 0   # How many fields filled
  questions_total: 18     # Total fields for 100% score
  status: draft           # draft | active | coherent | fulfilled
```

**Status Progression**:
- `draft` (0-30% complete)
- `active` (30-70% complete)
- `coherent` (70-100% complete)
- `fulfilled` (all completion conditions met)

### Navigation

```yaml
navigation:
  parent: null            # Parent yawn ID or null for root
  domain: null            # architecture | core | system | feature | etc.
  keywords:               # For search/discovery
    - keyword1
    - keyword2
  in_index: false         # True after registration
  created_from: "source"  # Template or parent repo
  created_by: "username"  # GitHub username
  created_at: "date"      # ISO date
```

---

## Sections

### AWAKENING (Required)

What's trying to wake up here?

```yaml
## AWAKENING

**Intention**: What you want to be true

**Observer Story**: A narrative of the situation

**Transformation**: From "current state" → To "desired state"
```

### ENTITIES (Required)

Who/what is involved?

```yaml
## ENTITIES

```yaml
subject:
  entity_id: null         # UUID after import
  name: "Name"
  role: subject

target:
  entity_id: null
  name: "Name"
  role: target

other_participants:
  - name: "Name"
    role: observer | executor | approver | etc.
```
```

### CLAIMS (Optional)

Current vs desired state with evidence.

```yaml
## CLAIMS

```yaml
current:
  - domain: "area"
    statement: "What is true now"
    evidence: []
    confidence: 0.5  # 0-1

desired:
  - domain: "area"
    statement: "What should be true"
    evidence: []
    confidence: 0.8
```
```

### FORCES (Required)

What blocks or accelerates progress?

```yaml
## FORCES

```yaml
blockers:
  - statement: "What's blocking"
    category: skill_gap | confusion | resource_limit | threat | social | energy
    intensity: 2  # 1-3
    affects_claims: []

boosters:
  - statement: "What helps"
    category: existing_skill | tool | momentum | support
    intensity: 2
    affects_claims: []
```
```

**Blocker Categories**:
| Category | Description |
|----------|-------------|
| `skill_gap` | Don't know how to do something |
| `confusion` | Unclear what to do |
| `resource_limit` | Don't have what's needed |
| `threat` | Something scary/risky |
| `social` | Others blocking progress |
| `energy` | Too tired/overwhelmed |

### THE JOB (Required for YawnJobs)

The executable task definition.

```yaml
## THE JOB

```yaml
job:
  title: "Clear action title"
  type: on_demand | scheduled | continuous

  schedule:
    cron: null            # "0 9 * * *" for daily 9am
    timezone: "UTC"
    enabled: false

  task:
    type: manual | api_call | agent_invoke | script_run
    target: null          # API route, agent name, script path
    params: {}

  acceptance_test: "Measurable success condition"

  risk_level: read | write | spend | critical

  heartbeat_api: null     # For scheduled jobs
```
```

**Risk Levels**:
| Level | Description | Approval |
|-------|-------------|----------|
| `read` | Only reads data | Auto |
| `write` | Modifies data | May require |
| `spend` | Costs money | Required |
| `critical` | Irreversible | Always required |

### DO's (Optional)

Prescriptive rules.

```yaml
## DO's

```yaml
rules:
  - [ ] Rule statement
        When: Condition
        Why: Rationale
```
```

### DON'T's (Optional)

Proscriptive rules.

```yaml
## DON'T's

```yaml
rules:
  - [ ] Never anti-pattern
        Symptom: How to recognize
        Risk: What goes wrong
```
```

### CHECKS (Optional)

Automated validations.

```yaml
## CHECKS

| Check | Query/Command | Pass Condition | Frequency |
|-------|---------------|----------------|-----------|
| Name | query | expected | when |
```

### EVALUATIONS (Required)

Evidence-based metrics.

```yaml
## EVALUATIONS

| Metric | Current | Target | Evidence Type | Status |
|--------|---------|--------|---------------|--------|
| name | value | target | type | status |
```

**Evidence Types**:
| Type | Description | Example |
|------|-------------|---------|
| `artifact` | File produced | report.pdf |
| `test_log` | Test output | CI log |
| `screenshot` | Visual proof | UI capture |
| `link` | URL to proof | GitHub commit |
| `self_attest` | Human says so | "I verified" |

### COMPLETION CONDITIONS (Required)

When is this yawn fulfilled?

```yaml
## COMPLETION CONDITIONS

```yaml
fulfilled_when:
  - [ ] Condition 1
  - [ ] Condition 2

success_metrics:
  - "Measurable outcome"

timing:
  frequency: once | daily | weekly | continuous
  deadline: null | ISO date
```
```

### GRADUATION CRITERIA (Optional)

When to spawn children or graduate to primitives.

```yaml
## GRADUATION CRITERIA

```yaml
spawn_child_yawn_when:
  - complexity_lines: "> 500"
  - multiple_objectives: "> 1"

spawn_skill_when:
  - pattern_repeats: ">= 3"

spawn_rule_when:
  - invariant_discovered: true
```
```

### EVOLUTION LOG (Required)

History of changes.

```yaml
## EVOLUTION LOG

```yaml
- date: "YYYY-MM-DD"
  change: "What changed"
  trigger: "What caused it"
  insight: |
    Key learning from this change
```
```

### META (Required)

System metadata.

```yaml
## META

```yaml
created: "YYYY-MM-DD"
last_awakened: null
status: draft | active | coherent | fulfilled | archived
criticality: LOW | MEDIUM | HIGH | MAXIMUM
forked_from: "source repo"
registered: false
registration_id: null
```
```

---

## Coherence Scoring

Coherence score is computed based on filled fields:

| Field | Points |
|-------|--------|
| AWAKENING.intention | 1 |
| AWAKENING.transformation | 1 |
| ENTITIES.subject | 1 |
| FORCES has blocker | 1 |
| THE JOB.title | 1 |
| THE JOB.acceptance_test | 1 |
| EVALUATIONS has metric | 1 |
| COMPLETION has condition | 1 |
| EVOLUTION has entry | 1 |
| ... | ... |

**Total: 18 questions for 100%**

---

## Validation

A valid .yawn file must:

1. Have valid YAML syntax
2. Include frontmatter with schema_version
3. Have at least: AWAKENING, ENTITIES, FORCES, EVALUATIONS, COMPLETION, META
4. For YawnJobs: Include THE JOB section

---

## Parsing

The yawn.ai parser handles:
- Frontmatter extraction
- Section detection
- YAML block parsing
- Markdown content
- Evidence linking

See [INTEGRATION.md](INTEGRATION.md) for API details.

---

*"The schema is the contract. The evidence is the proof."*
