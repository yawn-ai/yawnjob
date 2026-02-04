---
name: yawn-evidence
description: |
  Proves work was done correctly by capturing evidence.
  Every completed task MUST have evidence.
  
  Auto-invoked when:
  - Agent completes a task
  - Agent needs to prove a claim
  - Human requests proof of work
---

# Yawn Evidence Skill

This skill teaches your agent how to prove work was done correctly.

## Why Evidence Matters

In the Yawn system:
- **Trust requires proof**
- Evidence enables autonomy graduation
- Track record builds reputation
- Proof converts to Yawn Currency (YC)

## Evidence Types

### 1. Screenshot

Visual proof of completed work.

```yaml
screenshot:
  when: UI changes, visual results
  how: Take screenshot of the result
  format: PNG or JPEG
  store: evidence/screenshots/
  
  example:
    task: "Fix the login button"
    proof: Screenshot of working button
```

### 2. Test Log

Output from automated tests.

```yaml
test_log:
  when: Code changes, bug fixes
  how: Run tests, capture output
  format: Text or JSON
  store: evidence/test_logs/
  
  example:
    task: "Fix failing test"
    proof: Test output showing pass
```

### 3. Commit Link

Git commit as proof.

```yaml
commit:
  when: Code changes
  how: Link to specific commit
  format: GitHub URL
  
  example:
    task: "Implement feature X"
    proof: https://github.com/user/repo/commit/abc123
```

### 4. Artifact

File produced by the work.

```yaml
artifact:
  when: Generated content, reports
  how: Save the output file
  format: Any
  store: evidence/artifacts/
  
  example:
    task: "Generate report"
    proof: evidence/artifacts/report-2026-02-04.pdf
```

### 5. Self Attestation

Human or agent attestation.

```yaml
self_attest:
  when: No other proof possible
  how: Written statement
  format: Text
  trust_level: LOW (use sparingly)
  
  example:
    task: "Review document"
    proof: "I reviewed the document and found no issues"
```

## Submitting Evidence

```typescript
// Submit evidence to Yawn API
await fetch('https://yawn.ai/api/yawn/evidence', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    job_id: 'JOB-123',
    evidence_type: 'screenshot',
    content: 'Fixed the login button layout',
    proof_url: 'https://github.com/user/yawnjob/blob/main/evidence/screenshots/login-fix.png'
  })
})
```

## Evidence Storage

Store evidence locally before submitting:

```
yawnjob/
└── evidence/
    ├── screenshots/
    │   └── 2026-02-04-login-fix.png
    ├── test_logs/
    │   └── 2026-02-04-test-output.txt
    └── artifacts/
        └── 2026-02-04-report.pdf
```

## Evidence Checklist

Before claiming a task is complete:

```yaml
checklist:
  - [ ] Evidence captured (screenshot, log, commit, etc.)
  - [ ] Evidence stored in evidence/ folder
  - [ ] Evidence committed to git
  - [ ] Evidence submitted via API
  - [ ] Job status updated
```

## Trust Levels

| Evidence Type | Trust Level | Autonomy Impact |
|---------------|-------------|-----------------|
| Test Log | HIGH | +3 trust points |
| Commit Link | HIGH | +3 trust points |
| Screenshot | MEDIUM | +2 trust points |
| Artifact | MEDIUM | +2 trust points |
| Self Attest | LOW | +1 trust point |

Higher trust = more autonomy = less human approval needed.

---

*"Proof is trust. Trust is autonomy. Evidence is the path to independence."*
