# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in YawnJob, please report it responsibly.

**DO NOT** create a public GitHub issue for security vulnerabilities.

### How to Report

1. **Email**: Send details to [security@yawn.ai](mailto:security@yawn.ai)
2. **Subject**: Include "YawnJob Security" in the subject line
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Resolution Target**: Within 30 days for critical issues

---

## Security Model

### YawnJob Permission Model

YawnJobs operate under a **risk-level based approval system**:

| Risk Level | Description | Approval Required |
|------------|-------------|-------------------|
| `read` | Queries, checks, reports | None (automatic) |
| `write` | Create, update, delete operations | Yes (before execution) |
| `spend` | Financial transactions | Yes (explicit confirmation) |
| `critical` | System-level changes, destructive ops | Yes (multi-step confirmation) |

### Key Security Principles

1. **No Root Access by Default**
   - YawnJobs execute within user-defined permissions
   - No job can escalate privileges without explicit approval

2. **Approval Gates**
   - Operations above `read` risk level require human approval
   - Approval requests include full context of the proposed action

3. **Full Audit Trail**
   - Every execution is logged in the `.yawn` file's EVOLUTION LOG
   - Evidence is required for completion
   - All changes are tracked and reversible where possible

4. **Credential Isolation**
   - Credentials should NEVER be stored in `.yawn` files
   - Use environment variables or secret management systems
   - See DON'T's section in ROOT.yawn template

### What YawnJobs CAN'T Do

- Access files outside their defined scope
- Execute without proper risk-level approval
- Modify other YawnJobs without explicit permission
- Bypass the evidence requirement for completion
- Run indefinitely without heartbeat checks (for scheduled jobs)

---

## Best Practices

### For YawnJob Authors

1. **Always specify the correct risk level**
   ```yaml
   risk_level: write  # Be honest about what the job does
   ```

2. **Never store secrets in .yawn files**
   ```yaml
   # BAD
   api_key: "sk-1234567890"
   
   # GOOD
   api_key: "${API_KEY}"  # Reference environment variable
   ```

3. **Define clear acceptance tests**
   ```yaml
   acceptance_test: "All endpoints return 200 and pass validation"
   ```

4. **Use evidence types appropriately**
   ```yaml
   # For automated jobs
   evidence_type: test_log
   
   # For manual verification
   evidence_type: self_attest
   ```

### For Platform Operators

1. **Implement rate limiting** on YawnJob execution
2. **Monitor for anomalous patterns** in job behavior
3. **Regularly rotate credentials** used by jobs
4. **Review approval requests** promptly to avoid bottlenecks

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

Only the latest major version receives security updates.

---

## Future Security Enhancements

We're actively working on:

- [ ] **Sandboxed Execution**: Isolated runtime environments for jobs
- [ ] **Key Management Integration**: Native support for HashiCorp Vault, AWS Secrets Manager
- [ ] **Scope Restrictions**: Fine-grained permission boundaries per job
- [ ] **Anomaly Detection**: AI-powered detection of unusual job behavior
- [ ] **Multi-Party Approval**: Require N-of-M approvers for critical operations

---

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve YawnJob security (with permission).

---

*"Security is not a feature, it's a foundation. YawnJobs are built on trust."*
