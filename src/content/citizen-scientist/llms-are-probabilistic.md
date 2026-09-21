---
title: "LLMs Are Probabilistic. Test Them Like It."
date: 2026-04-11
description: "How Karpathy's autoresearch loop generalizes beyond code — and why your AI tool isn't ready after one successful run."
authors: "Mat Coalson & Claude Opus 4.6 (Anthropic)"
sourceUrl: "https://github.com/mbcoalson/ai-engineering-toolkit/tree/master/engineering-eval-harnesses"
draft: false
---

In early March, Andrej Karpathy released autoresearch — a 630-line Python script that gives an AI agent one training file, one metric, and a five-minute timer. The agent modifies the code, trains, checks if the number went down, keeps or reverts, and repeats. All night.

It found 20 improvements on code Karpathy had already hand-tuned for months, including a bug in his attention implementation he'd missed entirely. Shopify's CEO ran the same pattern on their templating engine: 53% faster rendering, 61% fewer memory allocations, 93 automated commits. Overnight.

The loop is dead simple. And almost nobody is applying it outside of code.

I build AI tools that generate structured engineering documents from source PDFs. The outputs aren't training loss curves — they're spreadsheets, reports, technical deliverables that other engineers need to trust and use. Over the past several months I've been learning, the hard way, that the same loop Karpathy formalized for ML research is the only thing that makes these tools reliable.

Here's what that looks like.

## "It Worked Once" Is Not a Test

Here's what happens when most people build an LLM-powered tool: they write a prompt, feed it real input, get a good output, and ship it. Maybe they run it three or four more times. The outputs look right. They move on.

This is the equivalent of running one trial and calling it a study.

LLMs are probabilistic systems. The same prompt with the same input produces a different output every time. Sometimes the differences are cosmetic — a rephrased sentence, a reordered list. Sometimes they're structural. A hallucinated field that doesn't exist in the source data. A requirement silently dropped. A value pulled from the wrong section of a document.

You won't know which category you're in until you've run enough tests to see the distribution.

## Treat Every LLM Step Like a Statistical Universe

If your tool chains multiple LLM calls together — extract data from a document, interpret it, generate a structured output — every one of those calls is sampling from a probability distribution. You don't get to assume the distribution is tight just because the first few samples looked good.

How many runs do you need?

**7** is the bare minimum. It gets you into t-test territory — enough to detect gross inconsistencies, not enough to characterize the full shape of what's possible.

**30+** starts to approximate a normal distribution. Now you can talk about confidence intervals. Now you can say "this step produces the correct output 94% of the time" instead of "it worked when I tried it."

This isn't academic rigor for its own sake. It's the difference between a tool that works on your machine and a tool that works when you hand it to someone who didn't build it.

## Generalizing the Loop

Karpathy's autoresearch works because it has three components:

1. **A modifiable artifact.** The training script.
2. **An objective metric.** Validation loss.
3. **A fixed time box.** Five minutes per experiment.

That pattern doesn't require code. It requires a measurable outcome.

Outside of code — in engineering documents, reports, structured outputs from technical PDFs — "correct" isn't a single number. It's a rubric. Did the tool extract the right data from the right source? Is it structured in the right format? Are there hallucinated values? Are there omissions? That rubric is a checklist, not a loss function, and defining it is real engineering work.

This is where most people give up. The metric is hard, so they skip the loop entirely and go back to eyeballing outputs. But the loop is the only thing that gets you from "it works sometimes" to "it works reliably." You have to do the work of defining what "correct" means before you can test for it at scale.

## The Harness

Here's the architecture I've landed on after months of iteration. I've open-sourced the scaffolding as a [Claude Code skill on GitHub](https://github.com/mbcoalson/ai-engineering-toolkit/tree/master/engineering-eval-harnesses).

The core loop has four stages:

**Generator agent** → produces the output from source material. This is the LLM doing the actual work — reading documents, extracting data, building the deliverable.

**Deterministic scorer** → evaluates the output against the rubric. This is Python, not another LLM call. The scorer checks structure, completeness, data accuracy against known values. Keeping scoring deterministic is critical — if you use an LLM to evaluate LLM output, you've introduced a second probabilistic system and you're testing noise against noise.

**Analyzer agent** → reviews the scores and identifies what to adjust. This is where the LLM earns its keep on the evaluation side — not scoring, but diagnosing. "The data table was extracted correctly but the summary section is missing two required fields. The source document has those fields on page 12 — the extraction step isn't reaching that page."

**Orchestrator** → decides whether to loop or stop. Tracks state in JSON — what's been tested, what passed, what failed, what to try next. Repeats until the scores hit the threshold or the budget runs out.

A few principles that keep it honest:

**Separate generation from evaluation.** The agent that creates the output cannot be the agent that judges it. This sounds obvious. It gets violated constantly.

**Make everything deterministic that you can.** Before the LLM touches your data, use OCR, regex, structured parsers — whatever gets you furthest without probabilistic inference. Every step you pull out of the LLM's hands is a step you don't have to test 30 times.

**Isolate the LLM steps.** If your tool chains five LLM calls and the final output is wrong, which call failed? You need structured intermediate outputs so you can test each step independently. One monolithic prompt that does everything is untestable.

**Define the rubric before you start testing.** If you can't articulate what a correct output looks like — what the failure modes are, what "close enough" means, where hallucination risk is highest — you can't automate evaluation. And if you can't automate evaluation, you can't run the loop.

## Why This Matters

There's an enormous gap right now between "I got an LLM to do a thing" and "I built a tool other people can rely on." Most of the industry is on the first side of that gap, demo-ing impressive one-shot outputs and wondering why adoption stalls when they hand the tool to someone else.

The first working prototype is maybe 20% of the total effort. The testing harness — defining the rubric, building the scorer, running enough iterations to characterize the distribution, iterating on the prompts and extraction logic until the numbers are where they need to be — that's the other 80%.

Karpathy showed us the loop. It's not new. What's new is recognizing that the same discipline applies outside of ML training — anywhere an LLM is producing outputs that humans need to trust.

The tools that survive adoption won't be the ones that worked once. They'll be the ones that were tested like the probabilistic systems they are.
