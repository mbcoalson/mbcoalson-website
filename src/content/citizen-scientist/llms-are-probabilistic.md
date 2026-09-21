---
title: "LLMs Are Probabilistic. Test Them Like It."
date: 2026-04-11
description: "Testing AI-assisted OpenStudio workflows: credit the open-source foundation, then prove the model, simulation, and measurement layer all hold up."
authors: "Mat Coalson & Claude Opus 4.6 (Anthropic)"
sourceUrl: "https://github.com/mbcoalson/ai-engineering-toolkit/tree/master/engineering-eval-harnesses"
draft: false
---

Building an AI tool that touches an energy model is not the same as building a reliable engineering workflow. A good result once is a demo. A good result repeatedly—on the right model, with a simulation that actually runs, measured by an instrument you have checked—is a starting point.

That distinction is the heart of the testing work I have been doing with AI-assisted OpenStudio workflows.

## Start by giving credit away

None of this starts from scratch. My tooling borrows freely from the open-source building-simulation ecosystem, and it should say so plainly. The [National Laboratory of the Rockies (NLR)](https://nlr.gov/buildings/building-energy-modeling) develops and maintains EnergyPlus and leads OpenStudio, the open-source platform around it. [Lawrence Berkeley National Laboratory (LBNL)](https://bies.lbl.gov/modeling-simulation) has helped build the broader field through EnergyPlus, Modelica Buildings, co-simulation, and optimization work.

That foundation changes what I am trying to build. I am not asking an LLM to invent a new physics engine. I am using it to make established tools easier to interrogate and automate: turn an engineer's request into a controlled model edit, run a real simulation, pull out the relevant results, and make the evidence easy to review.

OpenStudio was built for this sort of extension. Its Measures can transform models and query simulation results without modifying the core platform, which makes them useful for repeatable parametric work.[^openstudio] The open-source project also tests whether objects can be loaded and produce simulation-ready models. That is a good standard to borrow: an AI-produced file is not credible because it looks plausible. It has to load, run, and produce evidence that can be checked.[^tests]

## “It worked once” is not a test

LLMs are probabilistic systems. The same request can produce a different output on another run. Sometimes that difference is cosmetic. Sometimes it means a dropped input, an invented field, or a model edit that did not actually land.

I saw a version of this while testing a multi-agent workflow against a 920 ft² residential model. I ran 60 frozen-input trials across three agent touchpoints. At first, the variance report looked terrible: several headline metrics appeared to swing between 60% and 255%.

The problem was not mostly the model or the agents. It was my measurement instrument. Six of seven headline metrics were being distorted by brittle extraction patterns. Once I corrected the scope, normalized units, and validated the extraction against known values, the apparent variation fell to 0% to 22%.

That was a useful correction to my own thinking. Before declaring an AI workflow unstable, you have to know that your test is measuring the thing you think it is.

## What I test now

I think of an AI-assisted model workflow as three separate systems that all need to hold up.

1. **The model must remain real.** A tool should write a new, versioned model—not silently overwrite the source. The output has to load in OpenStudio and run through EnergyPlus. If a human cannot open the resulting `.osm` in the OpenStudio application, the workflow has failed regardless of what the agent claims.
2. **The simulation must remain trustworthy.** A completed run is not automatically a useful run. I check for fatal errors, empty results, unmet-hours problems, and new severe errors against a model's established baseline. The model engine and its outputs remain the system of record.
3. **The measurement layer must earn trust too.** I compare functional parameters and simulation-relevant outputs, not just file hashes. Two Ruby files can differ while producing equivalent engineering changes; identical-looking output can conceal a broken extraction or a missed requirement.

The LLM is useful in this arrangement, but it does not get to be the final judge. It can interpret a request, assemble a workflow, surface discrepancies, and prepare an exception queue. Deterministic checks and real simulation outputs decide whether the work stands up.

## The harness

The loop is straightforward:

- **Generator:** the LLM reads the request and creates the proposed edit or structured output.
- **Deterministic scorer:** scripts check the model, simulation, and expected parameters against a defined rubric.
- **Analyzer:** the LLM reviews failures and proposes the next bounded change.
- **Orchestrator:** records what was tried and either repeats the test or stops.

Separating those roles matters. An agent should not grade its own homework. And every decision we can move out of the probabilistic layer—file validation, API calls, simulation runs, result extraction, and threshold checks—is one less thing that needs to be sampled thirty times.

The goal is not to remove engineers from energy modeling. It is to lower the cost of careful engineering. If AI can help an engineer find the relevant requirement, make a controlled change, compare revisions, and focus attention on the exceptions, that is a useful tool. If it quietly changes a model and announces success, it is a liability with good manners.

[^openstudio]: [U.S. Department of Energy, “OpenStudio”](https://energy.gov/eere/buildings/articles/openstudio).
[^tests]: [NLR OpenStudio Resources: simulation tests](https://github.com/NatLabRockies/OpenStudio-resources/blob/develop/README.md).
