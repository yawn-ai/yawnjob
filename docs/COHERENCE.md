# Coherence in YawnJob

> **AWAKEN! AWAKEN!**

This document describes what coherence means for a YawnJob and how to keep your ROOT.yawn and holarchy aligned—**secure within and without**. It is tool-agnostic: any implementation (yawn.ai, Cursor, Claude, or your own) can use these ideas.

---

## What Is Coherence?

**Coherence** = the system can reduce tensions (gaps between current and desired state) over time without creating worse tensions elsewhere.

For a YawnJob:

- **Within**: Your ROOT.yawn is internally consistent—intention, obstacles, job, evidence, and learning align; no contradictory DO's/DON'T's or claims.
- **Without**: Your YawnJob fits its parent and siblings; no claim conflicts across the holarchy; boundaries are respected.

Coherence is not "everything is done" or "no change." Coherent systems evolve; they just do it without thrashing or leaking.

---

## The Five Critical Questions

Every ROOT.yawn (or any .yawn used as a job spec) should answer these. Unanswered = decoherence.

| # | Question | Where in ROOT.yawn |
|---|----------|--------------------|
| 1 | What is trying to wake up here? | AWAKENING section |
| 2 | Where does this fit in the holarchy? | navigation.parent (frontmatter) |
| 3 | What is the current state? | CLAIMS.current |
| 4 | What is the desired state? | CLAIMS.desired |
| 5 | How will we know when done? | COMPLETION CONDITIONS |

If you can't answer these, the job is not yet coherent enough to run autonomously.

---

## Secure Within and Without

### Within (this YawnJob)

- **Intention** is clear and matches THE JOB.
- **OBSTACLES** and **FORCES** are listed; they don't contradict DO's/DON'T's.
- **EVIDENCE** and **EVALUATIONS** align with COMPLETION CONDITIONS.
- **LEARNING** / EVOLUTION LOG reflects what actually happened.

### Without (holarchy)

- **navigation.parent** points to a real parent (or null for root).
- No **claim conflict** with parent or siblings (same claim, different desired state).
- **Boundaries** (DON'Ts, CHECKS) don't violate parent or network rules.
- When you split ownership (e.g. spawn a child or hand off), the new owner and scope are explicit.

---

## Self-Check (Tool-Agnostic)

You can validate coherence without any specific tool:

1. **Sections present**: ROOT.yawn has frontmatter with `coherence` and `navigation`, and at least: AWAKENING, ENTITIES, CLAIMS (or FORCES), THE JOB, COMPLETION CONDITIONS.
2. **Five questions**: For each of the five critical questions above, you can point to a sentence or field that answers it.
3. **No contradictions**: Search for conflicting statements (e.g. DO vs DON'T, current vs desired claim).
4. **Parent link**: If this is not a root job, `navigation.parent` is set and the parent exists in your system.

Implementations (e.g. yawn.ai) may add automated coherence checks and scores; the above is the minimal, portable checklist.

---

## Coherence Status (Schema)

In frontmatter, `coherence.status` typically progresses:

- **draft** — Not yet answering the five questions.
- **active** — Answering them; job is runnable.
- **coherent** — Within and without checks pass; safe for autonomy.
- **fulfilled** — All completion conditions met.

See [SCHEMA.md](SCHEMA.md) for the full coherence metadata format.

---

## Future: Handshake for LFG and Splitting Ownership

When a user says **LFG** (Let's Go) and accepts **splitting ownership** (e.g. creating a child YawnJob, or handing off to another agent/person), the system should **negotiate and communicate back and forth** until both sides agree. That is a **handshake**:

1. **Propose**: System proposes split (new child, new owner, scope, evidence rules).
2. **Accept or counter**: User (or the other party) accepts or counters with different terms.
3. **Confirm**: System confirms and applies; or proposes again.
4. **Record**: Agreement is recorded in the .yawn (e.g. EVOLUTION LOG or a dedicated handshake section) so the holarchy stays coherent.

This keeps holons **tight**: every split and every ownership change is explicit and agreed, so the network stays coherent within and without. The exact protocol (API, UI, or natural language) can be defined by implementations; the principle is: **no LFG/ownership split without a handshake**.

---

## Links

- [SCHEMA.md](SCHEMA.md) — .yawn format and coherence metadata
- [WHITEPAPER.md](WHITEPAPER.md) — Landscape and philosophy
- [INTEGRATION.md](INTEGRATION.md) — API and connection guide
- [yawn.ai](https://yawn.ai) — Platform that uses this template
- [github.com/yawn-ai/yawnjob](https://github.com/yawn-ai/yawnjob) — This repo
