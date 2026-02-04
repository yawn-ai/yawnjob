# Evidence Folder

This folder stores evidence for your YawnJob.

## Purpose

Every YawnJob requires **proof of completion**. Evidence transforms "I did it" into "Here's proof I did it."

## Evidence Types

Store different types of evidence here:

| Type | File Format | Example |
|------|-------------|---------|
| `artifact` | Any produced file | `report-2026-02-04.pdf`, `build.log` |
| `test_log` | Text/JSON | `security-scan-results.json` |
| `screenshot` | PNG/JPG | `before-after.png` |
| `link` | Markdown/text | `links.md` with URLs to external proof |
| `self_attest` | Markdown | `attestation-2026-02-04.md` |

## Naming Convention

Use descriptive names with dates:

```
evidence/
├── 2026-02-04-security-audit.json      # test_log
├── 2026-02-04-deployment-screenshot.png # screenshot
├── 2026-02-05-backup-checksum.txt      # artifact
└── attestations/
    └── 2026-02-04-manual-review.md     # self_attest
```

## Linking Evidence to Evaluations

Reference evidence in your ROOT.yawn `EVALUATIONS` section:

```yaml
## EVALUATIONS

| Metric | Current | Target | Evidence Type | Status |
|--------|---------|--------|---------------|--------|
| Security scan | Passed | Pass | test_log | Complete |

Evidence: `evidence/2026-02-04-security-audit.json`
```

## Best Practices

1. **Date your evidence** - Include timestamps for audit trails
2. **Be specific** - Name files by what they prove
3. **Keep originals** - Don't modify evidence after creation
4. **Link in .yawn** - Reference evidence files in EVALUATIONS
5. **Version control** - Commit evidence with your .yawn updates

## For yawn.ai Integration

When imported to yawn.ai, evidence can be:
- Uploaded via the dashboard
- Submitted via API (`POST /api/yawn/{id}/evidence`)
- Linked as external URLs

See [docs/INTEGRATION.md](../docs/INTEGRATION.md) for API details.

---

*"Evidence is the language of trust. This folder speaks it."*
