# Changelog

All notable changes to YawnJob will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Example YawnJobs in `examples/` directory
- GitHub issue templates (bug report, feature request)
- Pull request template
- SECURITY.md for vulnerability reporting
- CODE_OF_CONDUCT.md (Contributor Covenant)
- Directory README files for better navigation

### Changed
- Enhanced README with badges and diagrams

---

## [2.0.0] - 2026-02-04

### Added
- Complete schema reference (`docs/SCHEMA.md`)
- Integration guide (`docs/INTEGRATION.md`)
- Whitepaper on autonomous AI landscape (`docs/WHITEPAPER.md`)
- CONTRIBUTING.md with contribution guidelines
- Coherence metadata in frontmatter
- Navigation section for holarchy connection
- 8-phase lifecycle documentation (SENSE → LEARN)
- Evidence types: `artifact`, `test_log`, `screenshot`, `link`, `self_attest`
- Risk levels: `read`, `write`, `spend`, `critical`
- Graduation criteria for spawning children

### Changed
- Updated ROOT.yawn to schema v2.0.0
- Restructured sections for clarity
- Added YAML code blocks for better syntax highlighting

### Breaking Changes
- Schema version changed from 1.0.0 to 2.0.0
- Added required `coherence` and `navigation` frontmatter
- `FORCES` section now requires `blockers` and `boosters` structure

---

## [1.0.0] - 2026-01-28

### Added
- Initial release of YawnJob template
- ROOT.yawn base template
- MIT License
- Basic README documentation

---

## Migration Guide

### From 1.0.0 to 2.0.0

1. **Add coherence metadata** to frontmatter:
   ```yaml
   coherence:
     score: 0.0
     last_check: null
     questions_answered: 0
     questions_total: 18
     status: draft
   ```

2. **Add navigation section** to frontmatter:
   ```yaml
   navigation:
     parent: null
     domain: null
     keywords: []
     in_index: false
   ```

3. **Update FORCES section** to use structured format:
   ```yaml
   blockers:
     - statement: "Description"
       category: skill_gap | confusion | resource_limit | threat
       intensity: 1-3
   
   boosters:
     - statement: "Description"
       category: existing_skill | tool | momentum | support
       intensity: 1-3
   ```

4. **Add THE JOB section** for executable tasks:
   ```yaml
   job:
     title: "Job title"
     type: on_demand | scheduled | continuous
     risk_level: read | write | spend | critical
   ```

---

[Unreleased]: https://github.com/yawn-ai/yawnjob/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/yawn-ai/yawnjob/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/yawn-ai/yawnjob/releases/tag/v1.0.0
