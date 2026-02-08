# Quick Actions

> **Star. Love. Monetize. Connect. Share. Preview. Fork.**

Every YawnJob surfaces a set of **Quick Actions** — a split-button dropdown that lets users engage with a yawn in one click. Quick Actions turn passive readers into active participants by placing the entire social-engagement and economic loop at their fingertips.

---

## Overview

Quick Actions appear as a compact **split-button** on every yawn card:

```
┌───────────────────────────────────┐
│        Yawn Card Content          │
│                                   │
│                      [ ✦ | ▾ ]   │  ← Split Button (top-right)
│                                   │
└───────────────────────────────────┘
```

- **Left side** (Sparkles icon): Click to **Star** — saves the yawn and stars the GitHub repo.
- **Right side** (Chevron): Opens the **Quick Actions dropdown** with 7 actions.

### The 7 Quick Actions

| # | Action | Icon | What It Does | Economic Effect |
|---|--------|------|-------------|-----------------|
| 1 | **Star** | Sparkles | Save the yawn + star on GitHub | Increases network visibility |
| 2 | **Love** | Heart | Express deep appreciation | Social signal for ranking |
| 3 | **Monetize** | DollarSign | Purchase Compute Coins (YCC) | Direct revenue via Stripe |
| 4 | **Connect** | Network | Link this yawn to your network | Grows the holarchy |
| 5 | **Share** | Share2 | Share via native share or clipboard | Distribution / reach |
| 6 | **Preview** | Eye | Preview the yawn like a social post | Engagement / evaluation |
| 7 | **Fork** | GitFork | Fork the yawn to your own GitHub | Creates origin-fee chain |

---

## Why Quick Actions Matter

### For Users

Quick Actions collapse the distance between **seeing** and **doing**. Instead of hunting through menus, every meaningful interaction is one click away:

- **Star** = "I want to remember this"
- **Love** = "This resonates deeply"
- **Monetize** = "I want to pay for this knowledge"
- **Connect** = "I want this in my network"
- **Share** = "Others need to see this"
- **Preview** = "Let me evaluate this before committing"
- **Fork** = "I want to build on this"

### For the Network

Every Quick Action generates a **signal** that feeds back into the system:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         QUICK ACTION SIGNAL LOOP                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  User clicks Quick Action                                                   │
│         ↓                                                                   │
│  Signal recorded (star, love, monetize, connect, share, preview, fork)      │
│         ↓                                                                   │
│  Network learns what's valuable                                             │
│         ↓                                                                   │
│  High-signal yawns surface higher in feed                                   │
│         ↓                                                                   │
│  More users discover → more actions → more signal                           │
│         ↓                                                                   │
│  Flywheel accelerates                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### For Economics

Three Quick Actions directly drive the YawnJob economy:

| Action | Economic Flow |
|--------|--------------|
| **Monetize** | User purchases YCC → Stripe checkout → coins in wallet → spent on AI features |
| **Fork** | User forks yawn → creates downstream yawn → original author earns 5% origin fees |
| **Connect** | User links yawn → holarchy grows → context inheritance improves AI quality |

---

## Design Principles

### 1. Split-Button Pattern

The split-button separates the **primary action** (Star) from **secondary actions** (dropdown). This follows established UI patterns from GitHub, GitLab, and Figma:

```
Primary action          Secondary actions
     ┌──┐  ┌──┐
     │ ✦│  │ ▾│
     └──┘  └──┘
      │       │
      │       └── Opens dropdown with 7 actions
      └────────── Immediately stars (most common action)
```

**Why split?** Because starring is the most frequent action and should never require two clicks.

### 2. Progressive Disclosure

Actions are grouped by **intent**:

```
┌─────────────────────────────┐
│  ✦ Star              saved  │  ← Engagement (save/react)
│  ♡ Love                     │
├─────────────────────────────┤
│  $ Monetize            CC   │  ← Economic (pay/earn)
│  ⊞ Connect                  │
├─────────────────────────────┤
│  ⇗ Share                    │  ← Distribution (spread/evaluate)
│  👁 Preview                  │
├─────────────────────────────┤
│  ⑂ Fork              GitHub │  ← Creation (build on this)
└─────────────────────────────┘
```

Separators between groups help users scan quickly.

### 3. Contextual Badges

Some actions show contextual badges:

- **"saved"** — appears on Star when already starred
- **"CC"** — indicates Compute Coins are involved
- **"GitHub"** — indicates this action interacts with GitHub

### 4. Theme-Aware

The dropdown respects the active theme:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | White | Neutral-900 |
| Text | Neutral-800 | Neutral-200 |
| Hover | Neutral-50 | Neutral-800 |
| Accent colors | Standard-600 | Standard-400 |

Each action has its own accent color on hover:
- Star → Amber
- Love → Pink
- Monetize → Emerald
- Connect → Cyan
- Share → Blue
- Preview → Violet
- Fork → Amber

### 5. Conditional Actions

Not every action is always available:

| Action | Condition | When Hidden |
|--------|-----------|-------------|
| **Fork** | `showFork` prop | When forking isn't applicable |
| **Monetize** | Always visible | Never (always offer) |
| **Connect** | Always visible | Never |

---

## Implementation

### Component Architecture

```
YawnStarButton (split-button)
├── StarButton (left side — primary action)
│   ├── Sparkles icon
│   ├── Sparkle animation (on star)
│   ├── Loading pulse
│   └── Auth toast (when not signed in)
├── Divider
├── ChevronButton (right side — dropdown trigger)
│   └── DropdownMenu
│       ├── Star item
│       ├── Love item
│       ├── ── separator ──
│       ├── Monetize item
│       ├── Connect item
│       ├── ── separator ──
│       ├── Share item
│       ├── Preview item
│       ├── ── separator ──
│       └── Fork item (conditional)
└── SparkleParticles (animation overlay)
```

### Props

```typescript
interface YawnStarButtonProps {
  feedSlot: string           // Which yawn card this belongs to
  yawnId?: string            // Database yawn ID
  user?: { id: string }      // Current user (null = not signed in)
  variant?: 'light' | 'dark' // Theme variant
  isStarred?: boolean        // Controlled star state
  onStarChange?: (starred: boolean) => void
  onMonetize?: () => void    // Opens CoinPurchaseModal
  onConnect?: () => void     // Links to user's network
  onShare?: () => void       // Native share or clipboard
  onPreview?: () => void     // Opens preview modal
  onFork?: () => void        // Opens fork/create modal
  showFork?: boolean         // Whether Fork action is visible
}
```

### API Endpoints

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| Star | POST | `/api/yawns/star` | `{ feed_slot, yawn_id }` |
| Unstar | DELETE | `/api/yawns/star` | `{ feed_slot }` |
| Star (GitHub) | PUT | `api.github.com/user/starred/yawn-ai/yawnjob` | — |
| Monetize | — | Opens Stripe Checkout | — |
| Fork | — | Opens CreateYawnModal | — |

### State Management

```
Star state:
  - Optimistic update (instant UI feedback)
  - API call in background
  - Revert on failure
  - Syncs with sidebar "Saved" section

Love state:
  - Local toggle (client-side)
  - Future: persisted via API

Share:
  - navigator.share() when available
  - Clipboard fallback
  - URL: yawn.ai/{slot-name}
```

---

## Integration with Existing Systems

### Action Bar Coexistence

Quick Actions (top-right star dropdown) complement the **YawnBookActionBar** (bottom of card):

```
┌───────────────────────────────────────────┐
│                                [ ✦ | ▾ ] │  ← Quick Actions (compact, top-right)
│                                           │
│        Yawn Card Content                  │
│                                           │
├───────────────────────────────────────────┤
│  👍 Like  │  💬 Comment  │  ➤ Share  │  💰🚀 LFG  │  ← Action Bar (full-width, bottom)
└───────────────────────────────────────────┘
```

**Division of responsibility:**
- **Quick Actions** = Save, discover, economic, distribution
- **Action Bar** = React, discuss, promote

### Preview Modal

The Preview action opens `LandingSlotPreviewModal`, which shows:
- Yawn title, emoji, and URL
- Description
- Full Action Bar (Like, Comment, Share, LFG)

This is the "social post preview" — what you'd see when someone shares a yawn link.

### CoinPurchaseModal

The Monetize action opens `CoinPurchaseModal` with three tiers:

| Tier | Coins | Price | Best For |
|------|-------|-------|----------|
| Starter | 10 | $1.99 | Trying it out |
| Builder | 50 | $7.99 | Regular use |
| Power | 200 | $24.99 | Heavy compute |

### Fork Flow

The Fork action opens `CreateYawnModal`:

1. User enters a repo name
2. Name validated (length, pattern, availability)
3. On submit: forks `yawn-ai/yawnjob` to user's GitHub
4. Creates Stripe subscription (30-day free trial)
5. Yawn appears on user's feed

---

## Adding Quick Actions to Your YawnJob

If you're building a UI that renders YawnJobs, here's how to add Quick Actions:

### Minimal Example

```typescript
import { YawnStarButton } from '@/components/yawnbook/yawn-star-button'

<YawnStarButton
  feedSlot="my-yawn"
  user={currentUser}
  variant="dark"
  isStarred={isStarred}
  onStarChange={handleStar}
  onMonetize={() => openCoinPurchase()}
  onPreview={() => openPreview()}
  onFork={() => openForkModal()}
  onShare={() => shareYawn()}
/>
```

### With All Actions

```typescript
<YawnStarButton
  feedSlot={yawn.slug}
  yawnId={yawn.id}
  user={user ? { id: user.id } : null}
  variant={theme === 'dark' ? 'dark' : 'light'}
  isStarred={starredSlots.includes(yawn.slug)}
  onStarChange={(starred) => updateStarred(yawn.slug, starred)}
  onMonetize={() => setCoinPurchaseOpen(true)}
  onConnect={() => connectToNetwork(yawn.id)}
  onShare={() => shareYawn(yawn.slug)}
  onPreview={() => openPreview(yawn.slug)}
  onFork={() => setCreateYawnOpen(true)}
  showFork={yawn.forkable}
/>
```

---

## Accessibility

- All actions have `aria-label` attributes
- Dropdown is keyboard-navigable (Arrow keys, Enter, Escape)
- Focus management follows WAI-ARIA combobox pattern
- Color contrast meets WCAG AA standards in both themes
- Screen readers announce action names and states

---

## Future Enhancements

| Enhancement | Description | Status |
|-------------|-------------|--------|
| **Tip action** | Direct YC tipping from dropdown | Planned |
| **Reaction picker** | Emoji reactions beyond heart | Planned |
| **Connect modal** | Choose which yawn to link to | Planned |
| **Analytics** | Track which actions drive most engagement | Planned |
| **Keyboard shortcuts** | `s` to star, `f` to fork, etc. | Future |

---

*"Every action is a signal. Every signal strengthens the network."*
