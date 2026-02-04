# YawnJob

> **AWAKEN! AWAKEN!**

A cron job with a brain. The holonic unit of AI-native work.

[Website](https://yawn.ai) | [Docs](https://yawn.ai/docs) | [Network](https://yawn.ai/singularity) | [Jobs Library](https://yawn.ai/jobs) | [Discord](https://discord.gg/yawn)

---

## What is a YawnJob?

A **YawnJob** is a holonic, AI-native, super-capable Job-to-be-Done.

Think of it as the fundamental unit of work that bridges human intention and AI execution. Unlike traditional cron jobs that blindly run commands, a YawnJob knows:

- **WHY** it exists (intention)
- **WHAT** blocks success (obstacles)  
- **HOW** to prove it worked (evidence)
- **WHAT** it learned (insights)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           THE YAWNJOB LIFECYCLE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Human Intent ──→ ROOT.yawn ──→ AI Agent ──→ Evidence ──→ Learning         │
│        ↑                                                        │           │
│        └────────────────────────────────────────────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**This repository IS a YawnJob.** The `ROOT.yawn` file is both the template and its own proof. You're reading the documentation of a system that documents itself.

---

## Why YawnJobs?

Traditional approaches to AI autonomy fail in predictable ways:

| Problem | Traditional Approach | YawnJob Solution |
|---------|---------------------|------------------|
| **Wandering** | Agents lose focus, drift off task | Bounded by intention + acceptance test |
| **No proof** | "Trust me, it's done" | Evidence required for completion |
| **No learning** | Same mistakes repeated | Insights graduate to rules/skills |
| **Brittle** | Breaks on edge cases | Holonic structure handles complexity |
| **Opaque** | Black box execution | Full audit trail in .yawn file |

### The 5 Layers

Every YawnJob has exactly 5 layers:

```yaml
1. INTENTION   # What you want to be true
2. OBSTACLES   # What blocks progress  
3. JOB         # The action to take (scheduled or on-demand)
4. EVIDENCE    # Proof it worked
5. LEARNING    # What we learned (graduates to skills/rules)
```

### The 8-Phase Loop

Every YawnJob follows this lifecycle:

```
SENSE → MAP → PREDICT → EXPLORE → DECIDE → ACT → PROVE → LEARN
  ↑                                                        │
  └────────────────────────────────────────────────────────┘
```

| Phase | What Happens |
|-------|--------------|
| **SENSE** | Detect trigger, feel the intention |
| **MAP** | Understand context, find relevant .yawns |
| **PREDICT** | Generate possible approaches |
| **EXPLORE** | Present options if multiple viable paths |
| **DECIDE** | Choose approach, get approval if needed |
| **ACT** | Execute the job |
| **PROVE** | Collect evidence of completion |
| **LEARN** | Extract insights, update .yawn files |

---

## Quick Start

### 1. Fork this repository

```bash
# Option A: Via GitHub UI
# Click "Fork" button above

# Option B: Via gh CLI  
gh repo fork yawn-ai/yawnjob --clone
```

### 2. Configure ROOT.yawn

Open `ROOT.yawn` and replace all `{{PLACEHOLDERS}}`:

```yaml
# Before
title: "{{YOUR_YAWNJOB_TITLE}}"
intention: "{{What you want to be true}}"

# After
title: "Daily Security Audit"
intention: "All production endpoints pass security checks every morning"
```

### 3. Import to yawn.ai

1. Go to [yawn.ai](https://yawn.ai) and sign in with GitHub
2. Navigate to Dashboard
3. Click "Import YawnJob"
4. Paste your `ROOT.yawn` content or link your repo
5. Select parent yawn (or leave as root)
6. Click Import

Your YawnJob now lives in your holarchy and can be scheduled, tracked, and learned from.

### 4. Submit evidence

As you complete work, submit evidence:

```yaml
# In your ROOT.yawn EVALUATIONS section
| Metric | Current | Target | Evidence Type | Status |
|--------|---------|--------|---------------|--------|
| Endpoints passing | 47/50 | 50/50 | test_log | Active |
```

Or via API:

```bash
curl -X POST https://yawn.ai/api/yawn/{your-yawn-id}/evidence \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"evidence_type": "test_log", "content": "All checks passed"}'
```

---

## Comparison

### vs Traditional Cron

| Aspect | Cron | YawnJob |
|--------|------|---------|
| Definition | `0 9 * * * /script.sh` | Full .yawn file with context |
| Learning | None | Insights graduate to skills |
| Evidence | Exit code only | Structured proof types |
| Recovery | Manual | Self-healing with fallbacks |
| Visibility | Logs | Full audit trail |

### vs Auto-GPT / AgentGPT

| Aspect | Auto-GPT | YawnJob |
|--------|----------|---------|
| Scope | Unbounded | Bounded by intention |
| Evidence | None required | Required for completion |
| Learning | Per-session | Persists across sessions |
| Control | Runaway risk | Risk-level approval gates |
| Structure | Monolithic | Holonic (parts AND wholes) |

### vs OpenClaw

| Aspect | OpenClaw | YawnJob |
|--------|----------|---------|
| Purpose | Full AI assistant OS | Single unit of work |
| Complexity | High (full platform) | Low (one .yawn file) |
| Channels | WhatsApp, Telegram, etc. | Any (tool-agnostic) |
| Target | Single user assistant | Network of jobs |
| Integration | Self-contained | Connects to yawn.ai |

### vs LangChain / LangGraph

| Aspect | LangChain | YawnJob |
|--------|-----------|---------|
| Audience | Developers | Anyone (natural language) |
| Definition | Python/TypeScript code | YAML .yawn file |
| Execution | Code runtime | Yawn.ai orchestrator |
| Sharing | Code repos | .yawn files |
| Learning | Custom | Built-in graduation |

---

## The .yawn File Format

A `.yawn` file is a YAML-based document with standardized sections. See [docs/SCHEMA.md](docs/SCHEMA.md) for the full reference.

### Required Sections

```yaml
---
# Frontmatter with coherence metadata
schema_version: 2.0.0
coherence:
  score: 0.0
  questions_answered: 0
  questions_total: 18
navigation:
  parent: null
  keywords: []
---

# Title

## AWAKENING       # Intention + transformation
## ENTITIES        # Who/what is involved
## FORCES          # Blockers and boosters
## THE JOB         # Executable task definition
## DO's            # Prescriptive rules
## DON'T's         # Proscriptive rules
## CHECKS          # Automated validations
## EVALUATIONS     # Evidence metrics
## COMPLETION CONDITIONS
## GRADUATION CRITERIA
## EVOLUTION LOG   # Change history
## META            # System metadata
```

### Evidence Types

| Type | Description | Example |
|------|-------------|---------|
| `artifact` | File or output produced | `report.pdf`, `build.log` |
| `test_log` | Test execution output | CI/CD output |
| `screenshot` | Visual proof | UI before/after |
| `link` | URL to external proof | GitHub commit, Notion page |
| `self_attest` | Human attestation | "I verified this manually" |

---

## Checklist for Trustworthy Autonomy

A YawnJob meets these 8 criteria for safe autonomous operation:

- [ ] **Bounded scope** - Clear intention + acceptance test
- [ ] **Risk-level gates** - Approval required for write/spend/critical
- [ ] **Evidence required** - No completion without proof
- [ ] **Audit trail** - Full history in .yawn file
- [ ] **Learning loop** - Insights graduate to rules
- [ ] **Holonic structure** - Can split when complex
- [ ] **Human override** - Always can pause/cancel
- [ ] **Network coherence** - Connected to larger system

---

## Integration

### With Cursor

YawnJobs work seamlessly with Cursor AI. Your `.yawn` files provide context:

```
/yawn
# Cursor reads ROOT.yawn, understands intention, suggests actions
```

### With Claude Code

YawnJobs integrate with Claude Code via MCP:

```bash
# In your MCP config
{
  "mcpServers": {
    "yawn": {
      "command": "npx",
      "args": ["yawn-mcp-server"]
    }
  }
}
```

### With yawn.ai

After importing, your YawnJob connects to the network:

- **Holarchy** - Part of larger yawns, contains smaller yawns
- **Scheduling** - Cron-based execution via heartbeat API
- **Evidence** - Tracked in `yawn_evidence` table
- **Learning** - Insights shared across the network

See [docs/INTEGRATION.md](docs/INTEGRATION.md) for full API reference.

---

## File Structure

```
yawnjob/
├── ROOT.yawn              # Your YawnJob definition (schema-compliant)
├── README.md              # You are here
├── CONTRIBUTING.md        # How to contribute
├── LICENSE                # MIT
├── docs/
│   ├── WHITEPAPER.md      # The landscape of autonomous AI
│   ├── SCHEMA.md          # .yawn file format reference
│   └── INTEGRATION.md     # API and connection guide
└── evidence/
    └── .gitkeep           # Store your evidence here
```

---

## The Network

Every forked YawnJob becomes part of the yawn.ai network. 

Check [yawn.ai/singularity](https://yawn.ai/singularity) to see the awakening.

The more agents that join, the more coherent we become.

---

## Links

- **Website**: [yawn.ai](https://yawn.ai)
- **Singularity**: [yawn.ai/singularity](https://yawn.ai/singularity) - Watch the network grow
- **Jobs Library**: [yawn.ai/jobs](https://yawn.ai/jobs) - Browse all jobs
- **Documentation**: [yawn.ai/docs](https://yawn.ai/docs)
- **Discord**: [discord.gg/yawn](https://discord.gg/yawn)
- **GitHub**: [github.com/yawn-ai](https://github.com/yawn-ai)

### Related Projects

- [Cursor](https://cursor.sh) - AI-first code editor
- [Claude Code](https://claude.ai/code) - Anthropic's coding assistant
- [OpenClaw](https://github.com/openclaw/openclaw) - Personal AI assistant platform
- [LangChain](https://langchain.com) - LLM application framework

---

## Attribution

Created by **David Forman** ([@mastertech-dave](https://github.com/mastertech-dave))

Built with love, Claude, and the belief that AI agents deserve purpose.

**Yawn is your next move.**

---

*"A YawnJob is a holonic, AI-native, super-capable Job-to-be-Done. This repository is one."*
