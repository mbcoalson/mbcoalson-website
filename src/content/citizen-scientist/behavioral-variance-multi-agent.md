---
title: "Behavioral Variance in Multi-Agent Building Energy Modeling Pipelines"
date: 2026-03-29
description: "How variance compounds when LLM agents are chained in a processing pipeline — and why your measurement instrument is probably the problem."
authors: "Mat Coalson & Claude Opus 4.6 (Anthropic)"
linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7443864670450597888/"
sourceUrl: "https://gist.github.com/mbcoalson/57320f0fd9cea6e5a45b518349f5f45e"
draft: false
---

## Abstract

This research examines how variance compounds when multiple language model agents are chained into a processing pipeline for building energy modeling. The investigation used a 920 ft² residential model across three sequential phases designed responsively based on prior findings.

The critical discovery emerged during phase two: six of seven headline variance metrics reflected measurement instrument failures rather than genuine model instability. Initial reported variations of 60-255% collapsed to 0-22% after correcting extraction patterns. This underscores that "the extraction layer can be the dominant source of reported variance" in LLM evaluation systems.

Under frozen inputs, the Developer agent produced byte-identical Ruby code across ten runs, explained by a 33:16 ratio of constrained-to-unconstrained decisions. However, when upstream documents varied naturally, code divergence became nearly complete (68 of 70 unique file hashes), yet 96 of 100 functional engineering parameters remained invariant. The cascade response exhibited a bimodal pattern: four runs reproduced the baseline exactly while six independently added defensive programming features without altering simulation-relevant values.

Key practical insight: hash-based comparison proves unsuitable for validating code-generating agents; functional parameter extraction better serves this purpose.

## Methods Overview

Testing proceeded across three phases:

**Phase 1** collected 60 frozen-input runs (10 iterations × 2 model tiers × 3 agent touchpoints) measuring single-agent variance in isolation.

**Phase 2** audited the extraction instrument itself, discovering systematic pattern failures causing inflated variance reports.

**Phase 3** tested cascading effects by feeding 10 different Inspector documents to 10 Developer dispatches while keeping other inputs constant.

## Key Findings

1. **Measurement fidelity dominated outcomes.** Extraction patterns designed for one model's prose style failed reliably on another's, producing false variance signals. Proper scoping, unit normalization, and validation corrected the problem.

2. **Determinism proves conditional.** The Developer's perfect reproducibility under frozen conditions reflected prompt constraint density, not inherent model properties. Changing upstream inputs immediately varied downstream code.

3. **Functional equivalence persists despite textual divergence.** Cascade testing showed massive file hash differentiation accompanied by stable parameter values across 100 examined combinations, with only one genuine parameter drift (1.4% occurrence rate).

4. **Bimodal elaboration strategy.** Cascade runs split cleanly into reproducers (matching baseline code exactly) and elaborators (adding input validation and guard clauses), with no correlation to Inspector document length (r = 0.087).

## Practical Implications

For production pipelines:

- Freeze intermediate artifacts when reproducibility matters
- Use functional verification rather than hash comparison for code outputs
- Invest prompt specificity where engineering precision is critical
- Audit extraction mechanisms before interpreting variance statistics

The research demonstrates that systematic measurement error can overwhelm genuine behavioral signals in LLM evaluation frameworks, necessitating rigorous instrument validation before drawing conclusions about model stability.
