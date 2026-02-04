# YawnJob Examples

Real-world examples to help you get started with YawnJobs.

## Available Examples

| Example | Description | Risk Level | Type |
|---------|-------------|------------|------|
| [hello-world.yawn](hello-world.yawn) | Simplest possible YawnJob | `read` | On-demand |
| [daily-security-audit.yawn](daily-security-audit.yawn) | Scheduled security checks | `read` | Scheduled |
| [content-sync.yawn](content-sync.yawn) | Sync content with approval | `write` | On-demand |
| [database-backup.yawn](database-backup.yawn) | Critical backup job | `critical` | Scheduled |

## How to Use

### 1. Pick an Example

Start with `hello-world.yawn` if you're new, or choose one that matches your use case.

### 2. Copy and Customize

```bash
# Copy to your project
cp examples/hello-world.yawn my-job.yawn

# Edit the file
# Replace all {{PLACEHOLDERS}} with your values
```

### 3. Import to yawn.ai

1. Go to [yawn.ai](https://yawn.ai)
2. Navigate to Dashboard → Import YawnJob
3. Paste your `.yawn` content or link your repo
4. Select parent yawn (or leave as root)
5. Click Import

## Example Breakdown

Each example demonstrates different aspects of the YawnJob format:

### hello-world.yawn
- **Purpose**: Learn the basics
- **Shows**: Minimal required sections, on-demand execution
- **Risk**: `read` (no approval needed)

### daily-security-audit.yawn  
- **Purpose**: Scheduled maintenance task
- **Shows**: Cron scheduling, evidence tracking, multiple checks
- **Risk**: `read` (safe to run automatically)

### content-sync.yawn
- **Purpose**: Write operation with approval gates
- **Shows**: `write` risk level, approval workflow, blockers/boosters
- **Risk**: `write` (requires approval before execution)

### database-backup.yawn
- **Purpose**: Critical system job
- **Shows**: `critical` risk level, full evidence chain, graduation criteria
- **Risk**: `critical` (requires explicit human approval)

## Key Patterns

### Scheduling

```yaml
schedule:
  cron: "0 9 * * *"    # Run at 9am UTC daily
  timezone: "UTC"
  enabled: true
```

### Risk Levels

| Level | Approval | Use Case |
|-------|----------|----------|
| `read` | None | Queries, checks, reports |
| `write` | Required | Create, update, delete |
| `spend` | Required | Financial transactions |
| `critical` | Explicit | System-level changes |

### Evidence Types

```yaml
# Types you can use:
- artifact    # File or output produced
- test_log    # Test execution output
- screenshot  # Visual proof
- link        # URL to external proof
- self_attest # Human attestation
```

## Need Help?

- [Schema Reference](../docs/SCHEMA.md) - Full .yawn format documentation
- [Integration Guide](../docs/INTEGRATION.md) - API and connection details
- [Discord](https://discord.gg/yawn) - Community support

---

*"Every YawnJob starts with an intention. These examples show you how."*
