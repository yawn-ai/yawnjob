# Integration Guide

How to connect your YawnJob to the yawn.ai ecosystem.

---

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INTEGRATION FLOW                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. FORK yawn-ai/yawnjob on GitHub                                          │
│         ↓                                                                   │
│  2. EDIT ROOT.yawn (fill in placeholders)                                   │
│         ↓                                                                   │
│  3. LOGIN to yawn.ai (GitHub OAuth)                                         │
│         ↓                                                                   │
│  4. IMPORT via Dashboard UI                                                 │
│         ↓                                                                   │
│  5. SYSTEM parses ROOT.yawn → JSON                                          │
│         ↓                                                                   │
│  6. YAWN appears in your holarchy                                           │
│         ↓                                                                   │
│  7. SUBMIT evidence as you work                                             │
│         ↓                                                                   │
│  8. COHERENCE score increases                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Prepare Your ROOT.yawn

Fill in all `{{PLACEHOLDERS}}` in your ROOT.yawn:

```yaml
# Before
title: "{{YOUR_YAWNJOB_TITLE}}"
intention: "{{What you want to be true}}"

# After  
title: "Daily Security Audit"
intention: "All production endpoints pass security checks"
```

Required fields for import:
- Title (from `# Title` header)
- At least one AWAKENING field
- At least one FORCES blocker
- THE JOB.acceptance_test
- At least one COMPLETION condition

---

## Step 2: Import via Dashboard

1. Go to [yawn.ai](https://yawn.ai)
2. Sign in with GitHub (grants read access)
3. Navigate to **Dashboard**
4. Click **"Import YawnJob"**
5. Either:
   - Paste your ROOT.yawn content, OR
   - Enter your GitHub repo URL
6. Select parent yawn (optional)
7. Click **Import**

Your yawn will be created with:
- `owner_id` = your user ID
- `yawn_source` = 'user'
- `status` = 'active'
- `parent_yawn_id` = selected or null

---

## Step 3: Connect to Holarchy

Your imported yawn can connect to the holarchy:

### As Root Yawn
- Leave parent selection empty
- Your yawn becomes a top-level yawn

### As Child Yawn
- Select existing yawn as parent
- Creates `parent_yawn_id` link
- Appears in parent's children list

### Holarchy Structure

```
Your Root Yawn
├── Child Yawn 1
│   ├── Grandchild 1
│   └── Grandchild 2
└── Child Yawn 2
```

---

## Step 4: Submit Evidence

As you complete work, submit evidence:

### Via Dashboard UI

1. Go to your yawn's detail page
2. Click **"Add Evidence"**
3. Select evidence type
4. Provide content/URL
5. Click **Submit**

### Via API

```bash
POST /api/yawn/{yawn_id}/evidence
Content-Type: application/json
Cookie: [your session cookie]

{
  "evidence_type": "test_log",
  "content": "All 47 endpoints passed security scan",
  "proof_url": "https://github.com/you/repo/actions/runs/123"
}
```

### Evidence Types

| Type | Use For | Example |
|------|---------|---------|
| `artifact` | Files produced | PDF report, build output |
| `test_log` | Test results | CI/CD output |
| `screenshot` | Visual proof | UI before/after |
| `link` | External proof | GitHub commit, Notion page |
| `self_attest` | Human verification | "I manually checked" |

---

## Step 5: Track Coherence

Your coherence score increases as you:
- Fill in more sections
- Submit evidence
- Update the evolution log
- Meet completion conditions

### Score Calculation

```
coherence_score = (questions_answered / questions_total) * 100
```

### Status Progression

| Score | Status |
|-------|--------|
| 0-30% | `draft` |
| 30-70% | `active` |
| 70-100% | `coherent` |
| 100% + all conditions | `fulfilled` |

---

## API Reference

### Import Yawn

```bash
POST /api/yawn/import
Content-Type: application/json
Cookie: [session]

{
  "schema_version": "2.0.0",
  "yawn": {
    "title": "My YawnJob",
    "slug": "my-yawnjob",
    "description": "From AWAKENING.intention",
    "yawn_type": "context",
    "status": "active",
    "scope": "mine",
    "level": "L2",
    "parsed_json": {
      "awakening": {...},
      "entities": {...},
      "forces": {...},
      "job": {...},
      "dos": [...],
      "donts": [...],
      "checks": [...],
      "evaluations": [...],
      "completion": {...},
      "graduation": {...},
      "evolution": [...],
      "meta": {...}
    }
  },
  "coherence": {
    "score": 0,
    "questions_answered": 0,
    "questions_total": 18,
    "status": "draft"
  },
  "navigation": {
    "parent": null,
    "keywords": ["yawnjob"]
  }
}
```

**Response:**
```json
{
  "yawn_id": "uuid",
  "snapshot_id": "uuid",
  "coherence_score": 45
}
```

### Submit Evidence

```bash
POST /api/yawn/{yawn_id}/evidence
Content-Type: application/json
Cookie: [session]

{
  "evidence_type": "test_log",
  "content": "Description",
  "proof_url": "https://..."
}
```

### Export Yawn

```bash
GET /api/yawn/{yawn_id}/export
Cookie: [session]
```

Returns the yawn as a JSON snapshot, convertible back to .yawn format.

### Create Child Yawn

```bash
POST /api/yawn/{parent_id}/children
Content-Type: application/json
Cookie: [session]

{
  "title": "Child Yawn Title",
  "description": "What this child handles"
}
```

---

## Database Schema

Your imported yawn creates these records:

### yawn_files

```sql
id: uuid (auto)
owner_id: uuid (your user ID)
username: text (from profile)
slug: text (from title)
title: text
parent_yawn_id: uuid | null
yawn_source: 'user'
status: 'active'
scope: 'mine'
level: 'L2'
parsed_json: jsonb
current_coherence_score: numeric
created_at: timestamp
```

### yawn_snapshots

```sql
id: uuid
yawn_id: uuid
kind: 'import'
snapshot_data: jsonb
content_hash: text
created_at: timestamp
```

### yawn_evidence

```sql
id: uuid
yawn_id: uuid
evidence_type: text
content: text
proof_url: text | null
created_at: timestamp
created_by: uuid
```

---

## Security

### Authentication

- GitHub OAuth required
- Session cookie for all API calls
- `owner_id` automatically set from `auth.uid()`

### Authorization

- You can only modify your own yawns
- `scope: 'mine'` keeps yawns private by default
- Can share by changing scope

### Validation

- ROOT.yawn parsed and validated before import
- Schema version checked
- Required fields enforced

---

## Graduation

When your user yawn becomes architecturally significant:

### Triggers

1. Complexity > 500 lines
2. Referenced by 3+ other yawns
3. Manual promotion

### Process

```bash
POST /api/yawns/graduate
Content-Type: application/json
Cookie: [session]

{
  "yawn_id": "uuid"
}
```

Creates file: `YAWNS/Graduated/{username}/{slug}.yawn`

Updates record:
- `yawn_source`: 'user' → 'graduated'
- `graduated_file_path`: path
- `graduated_at`: timestamp

---

## Scheduling (Coming Soon)

For scheduled YawnJobs:

```yaml
job:
  schedule:
    cron: "0 9 * * *"  # Daily at 9am
    timezone: "UTC"
    enabled: true
  
  heartbeat_api: "https://yawn.ai/api/heartbeat/{job_id}"
```

The heartbeat system will:
1. Trigger at cron schedule
2. Call your task endpoint
3. Record evidence
4. Update coherence

---

## Troubleshooting

### Import Fails

- Check YAML syntax is valid
- Ensure required sections exist
- Verify frontmatter format

### Evidence Not Showing

- Check you're logged in
- Verify yawn_id is correct
- Check evidence_type is valid

### Coherence Score Stuck

- Fill in more sections
- Add evidence
- Update evolution log

---

## Support

- **GitHub Issues**: [yawn-ai/yawnjob](https://github.com/yawn-ai/yawnjob/issues)
- **Discord**: [discord.gg/yawn](https://discord.gg/yawn)
- **Email**: support@yawn.ai

---

*"Integration is how we become part of something larger."*
