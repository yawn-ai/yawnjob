# Integration Guide

How to connect your YawnJob to the yawn.ai ecosystem.

---

## Quickstart: 1-Touch Creation (Recommended)

The fastest way to get started — one button, one name, everything automated.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     1-TOUCH CREATION FLOW                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. TAP "New Yawn" in the sidebar                                           │
│         ↓                                                                   │
│  2. TYPE a repo name (validated in real-time)                               │
│         ↓                                                                   │
│  3. TAP "Create — Start Free"                                               │
│         ↓ (automatic: fork + host + stripe trial)                           │
│  4. YOUR YAWN appears on your feed, live and hosted                         │
│                                                                             │
│  ✅ GitHub repo forked to your account                                      │
│  ✅ 30-day free hosting (no credit card)                                    │
│  ✅ $4.99/mo after trial · Cancel anytime                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### What Happens Behind the Scenes

1. Stars `yawn-ai/yawnjob` on your behalf
2. Forks the template to `github.com/{you}/{your-name}`
3. Creates a Stripe subscription with 30-day free trial
4. Inserts `yawn_files` record with GitHub linkage
5. Creates `yawn_hosting_subscriptions` record
6. Sends you an inbox notification
7. Redirects to your feed with the yawn expanded

### Repo Name Validation

Your repo name goes through the same validation as usernames:

- **Length**: 3–30 characters
- **Pattern**: Starts with a letter, lowercase + numbers + hyphens/underscores
- **Reserved**: System words are blocked
- **Profanity**: Filtered
- **GitHub**: Checked for availability under your account

---

## Manual Integration (Advanced)

For users who already have a repo or want more control:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MANUAL INTEGRATION FLOW                                  │
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

## Quick Actions Integration

Every yawn card can include a **Quick Actions** split-button that drives engagement and economics. When building a UI that renders YawnJobs, integrate Quick Actions to enable the full social + economic loop.

### Adding Quick Actions

```typescript
import { YawnStarButton } from '@/components/yawnbook/yawn-star-button'

<YawnStarButton
  feedSlot={yawn.slug}
  yawnId={yawn.id}
  user={user ? { id: user.id } : null}
  variant={theme === 'dark' ? 'dark' : 'light'}
  isStarred={starredSlots.includes(yawn.slug)}
  onStarChange={(starred) => updateStarred(yawn.slug, starred)}
  onMonetize={() => openCoinPurchase()}
  onConnect={() => connectToNetwork(yawn.id)}
  onShare={() => shareYawn(yawn.slug)}
  onPreview={() => openPreview(yawn.slug)}
  onFork={() => openForkModal()}
  showFork={true}
/>
```

### Quick Actions API

| Action | Method | Endpoint | Notes |
|--------|--------|----------|-------|
| Star | POST | `/api/yawns/star` | Also stars on GitHub via provider token |
| Unstar | DELETE | `/api/yawns/star` | Does not unstar on GitHub |
| List stars | GET | `/api/yawns/star` | Returns all starred feed slots for user |

### Economic Actions

- **Monetize**: Opens Stripe Checkout for Yawn Compute Coins (3 tiers: $1.99 / $7.99 / $24.99)
- **Fork**: Forks `yawn-ai/yawnjob` to user's GitHub, creates Stripe subscription with 30-day free trial
- **Connect**: Links the yawn into the user's holarchy (future API)

See [docs/QUICK_ACTIONS.md](QUICK_ACTIONS.md) for the full specification.

---

## Enterprise API Handshake

The Enterprise API enables yawn-to-yawn communication through a handshake protocol. This is how yawns discover, link, and exchange data with each other.

### Establishing a Handshake

```bash
POST /api/enterprise/handshake
Content-Type: application/json
x-api-key: yawn_sk_your_api_key
# OR
Cookie: [session cookie]

{
  "source_slug": "trademark",
  "target_slug": "trademark-bitch",
  "link_type": "fork",
  "capabilities": ["read", "reference"]
}
```

**Response:**
```json
{
  "success": true,
  "handshake": {
    "id": "abc123...",
    "source": { "slug": "trademark", "title": "Trademark Claims" },
    "target": { "slug": "trademark-bitch", "title": "Trademark Bitch" },
    "link_type": "fork",
    "inverse_link_type": "forked_from",
    "bidirectional": true,
    "auth_method": "api_key",
    "capabilities": ["read", "reference"],
    "established_at": "2026-02-07T..."
  },
  "api": {
    "links_endpoint": "/api/yawn/link?slug=trademark",
    "target_links_endpoint": "/api/yawn/link?slug=trademark-bitch"
  }
}
```

### Checking Handshake Status

```bash
GET /api/enterprise/handshake?source=trademark&target=trademark-bitch
```

### Link Types

| Link Type | Inverse | Use Case |
|-----------|---------|----------|
| `fork` | `forked_from` | Yawn derived from another |
| `parent_child` | `child_of` | Hierarchical relationship |
| `inherits` | `inherited_by` | Policy/rule inheritance |
| `references` | `referenced_by` | Knowledge reference |
| `import` | `exported_to` | Data dependency |

### Authentication Methods

| Method | Header | Use Case |
|--------|--------|----------|
| API Key | `x-api-key: yawn_sk_...` | Service-to-service |
| Session | Cookie-based | User-initiated |

---

## Fork Permission System

Forking is gated by an approval system with rate limiting:

### Flow

1. **Logged out** — Fork button shows "Sign in to fork"
2. **Logged in, no request** — Fork button shows "Request Fork"
3. **Request submitted** — 1 request per slug per 24 hours
4. **Approved** — Fork button becomes active

### API

```bash
# Check fork eligibility
GET /api/yawn/fork-request?slug=trademark

# Submit fork request
POST /api/yawn/fork-request
Content-Type: application/json
Cookie: [session]

{
  "source_slug": "trademark",
  "source_yawn_id": "uuid"   # optional
}
```

### Rate Limiting

- **1 request per user per slug per 24 hours**
- Tracked via `approval_requests` table
- Status: `pending` → `approved` | `rejected` | `expired`
- Expired after 24 hours if not acted on

---

## Yawn Links API

Query and create links between yawns:

### Query Links

```bash
GET /api/yawn/link?slug=trademark
```

Returns all incoming and outgoing links with connected yawn metadata.

### Create Links

```bash
POST /api/yawn/link
Content-Type: application/json
Cookie: [session]
# OR x-api-key: yawn_sk_...

{
  "from_slug": "trademark",
  "to_slug": "trademark-bitch",
  "link_type": "fork",
  "bidirectional": true
}
```

Creates both forward (`fork`) and inverse (`forked_from`) links automatically.

---

## Independent Hosting

YawnJobs can be hosted anywhere while remaining connected to the yawn.ai network. This enables true holon independence — each yawnjob is a self-contained entity that can be deployed, scaled, and managed independently.

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  Your Hosted YawnJob (Vercel / Netlify / Cloudflare / self-hosted)  │
│                                                                     │
│  ┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐    │
│  │ Your App    │───>│ YawnConnect SDK  │───>│ yawn.ai API     │    │
│  │ (Next.js,   │    │ (server-side)    │    │ (HTTPS + API    │    │
│  │  static,    │    │                  │    │  key auth)      │    │
│  │  etc.)      │    │ yawn_sk_...      │    │                 │    │
│  └─────────────┘    └──────────────────┘    └─────────────────┘    │
│                                                                     │
│  .env: YAWN_API_KEY=yawn_sk_...                                    │
│  .env: YAWN_BASE_URL=https://yawn.ai                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Setup

1. **Get an API key**: Sign up at [yawn.ai/jobs](https://yawn.ai/jobs) and verify your email. Your `yawn_sk_` key is revealed once — store it securely.

2. **Copy the SDK**: Copy `connect/yawn-connect.ts` into your project's `lib/` directory.

3. **Configure environment**:
   ```bash
   # .env (never commit)
   YAWN_API_KEY=yawn_sk_your_key_here
   YAWN_BASE_URL=https://yawn.ai
   ```

4. **Initialize the connector**:
   ```typescript
   import { YawnConnect } from '@/lib/yawn-connect'

   const yawn = new YawnConnect({
     apiKey: process.env.YAWN_API_KEY!,
     yawnSlug: 'your-yawn-slug',
   })
   ```

5. **Establish handshake**:
   ```typescript
   // On first deploy or in an init script
   await yawn.handshake('parent-yawn-slug', 'child')
   ```

6. **Submit evidence as you work**:
   ```typescript
   // After each meaningful event
   await yawn.submitEvidence('your-yawn-uuid', {
     type: 'link',
     content: 'Customer purchase completed',
     proof_url: 'https://your-site.com/receipt/123',
   })
   ```

### Security Model

| Layer | Protection |
|-------|-----------|
| Transport | HTTPS/TLS for all requests |
| Authentication | `yawn_sk_` API key in `x-api-key` header |
| Storage | SHA-256 hash of key stored in DB (never plaintext) |
| Authorization | Scoped access via `yawn_links` (only connected yawns) |
| Rate Limiting | Per-key limits enforced server-side |
| Audit | All handshakes logged to `inbox_items` |
| Isolation | Each holon gets its own key — no shared secrets |

### Example: Next.js API Route

```typescript
// app/api/yawn-status/route.ts
import { YawnConnect } from '@/lib/yawn-connect'
import { NextResponse } from 'next/server'

const yawn = new YawnConnect({
  apiKey: process.env.YAWN_API_KEY!,
  yawnSlug: 'trademark-bitch',
})

export async function GET() {
  const [ping, links] = await Promise.all([
    yawn.ping(),
    yawn.getLinks(),
  ])

  return NextResponse.json({
    connected: ping.status === 'ok',
    links: links.total,
  })
}
```

### Real-World Example

See [examples/trademark-bitch.yawn](../examples/trademark-bitch.yawn) — the first independently hosted yawnjob. It runs at `yawn.ai/trademark-bitch` and connects back to the network via the YawnConnect SDK. The repo lives at [github.com/yawn-ai/trademark-bitch](https://github.com/yawn-ai/trademark-bitch).

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

## Global Footer (Required)

Every YawnJob page MUST include the global footer. This ensures proper attribution and trust signals across the network.

### Footer Content

```
A secure open source yawnjob.com powered by yawn.ai
```

Where:
- **yawnjob.com** links to `https://yawnjob.com`
- **yawn.ai** links to `https://yawn.ai`

### React Component

Import and use the `YawnJobFooter` component as the **last visible child** in your page's EmbedContent:

```tsx
import { YawnJobFooter } from '@/components/yawnbook/yawnjob-footer'

export function MyPageEmbedContent() {
  // ... theme setup ...
  return (
    <div>
      {/* ... your page sections ... */}
      <YawnJobFooter variant={variant} />
    </div>
  )
}
```

### HTML / Static Sites

For non-React implementations, use this HTML structure:

```html
<footer style="width:100%;border-top:1px solid #333;padding:1.5rem;text-align:center;">
  <p style="font-size:12px;font-family:monospace;color:#737373;">
    🔒 A secure open source
    <a href="https://yawnjob.com" style="font-weight:600;color:#d4d4d4;">yawnjob.com</a>
    powered by
    <a href="https://yawn.ai" style="font-weight:600;color:#f59e0b;">yawn.ai</a>
  </p>
</footer>
```

### Rules

1. The footer MUST appear on every page
2. It MUST be the last visible element (before modals)
3. Links MUST point to the correct domains
4. Do NOT modify the footer text or remove branding

---

*"Integration is how we become part of something larger."*
