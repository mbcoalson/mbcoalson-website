---
title: "Build It Better"
date: 2026-09-21
description: "AI infrastructure should be built cleanly, transparently, and with engineering discipline—not treated as a blank check for irresponsible growth."
authors: "Mat Coalson"
draft: false
---

*Working draft — personal essay*

I recently argued with a coworker about whether we have reached AGI.

We both build with AI every day: tools, skills, plugins, and MCP connectors that other people at our company use. Since January 2026, the practical shift in these models has been unmistakable. They can read across disciplines, reason over huge numbers of files, write code, revise code, and distill complicated projects down to human digestable levels. What took a team can now be done by one person and a team of agents. I have come to think that this is a meaningful form of general intelligence, even if the label remains debatable.

My coworker’s objections are fair. AI is jagged. Models make strange mistakes that feel obvious to humans. They can project confidence when a basic Google search would have settled the question. They are brilliant one moment and brittle the next. 

But that gap does not settle the practical question. A tool does not need to be a person, or a perfect employee, to reshape the work around it. The systems in front of us already expand what a person can investigate, model, compare, and communicate. That makes the next question urgent: what do we build with this capability?

I'm thinking more. But better.

But, wanting it to be more than it isn't an excuse for a bad power contract, a private subsidy, or another gas generator powering a slapped-together data center. The demand for computing is real because the capability is real. The answer is to build this new industrial base with the seriousness we should bring to any other: clean power, efficient systems, transparent performance, and useful local integration. A private data center should be more than a large box consuming public capacity.

The engineering playbook already exists. DOE and the national labs recommend getting more work from existing servers before adding capacity; managing airflow and containment; using economizers where climate and equipment allow; right-sizing UPS and electrical distribution; and preparing for liquid cooling as density rises. They also make an important distinction: PUE measures the overhead required to support computing. It does not tell us whether the computing is useful or whether its electricity is clean.[19]

ASHRAE makes a related point. The temperature range in which a server can operate is not automatically the range in which it should operate. Facilities should be designed around the recommended thermal envelope; the wider allowable range means equipment can keep functioning there, not that reliability or efficiency is optimized.[20] As AI hardware gets denser, liquid cooling is becoming less a futuristic option than a practical one. ASHRAE recommends that new data centers at least be able to add it, even if they begin air-cooled.[21]


LEED layers on top of these standards-setting bodies and points us towards the edge of cost prohibitive and aspirational. Its data-center adaptation incorporates ASHRAE 90.4 systems optimization, building-level energy metering, commissioning and cooling-water requirements, demand response, and renewable generation.[27] LEED v5 uses a data-center-specific energy path within New Construction that can reward performance beyond ASHRAE 90.4.[26] That gives owners, engineers, and commissioning teams a shared language for building more efficient facilities.

It cannot tell us whether the computation itself is worth the energy. It does not require disclosure of the energy behind a major training run. It cannot decide who pays for a transmission upgrade, whether a community benefits from the grid capacity it gives up, whether a campus is actually clean-powered around the clock, or what happens to hardware at the end of its useful life.

Those questions should be answered in public.

What do I have to add to this conversation? Nothing especially novel. It's certainly been said before, but let me echo it here, in my own words. These AI companies that have built their empires on, 'ahem', public datasets, they owe us disclosure. Disclosure of the energy used to train these new models. What grid region it was trained on and a credible carbon estimate. Over time, we should ask more. What useful work did that energy enable? How much load can a campus shift when clean power is abundant?

These massive facilities asking for land, power, and public approvals should be liquid-ready, transparent about their load, and required to study nearby uses: housing, schools, pools, laboratories, or commercial hot-water demand. When the numbers work, the developer should build connections so that a data center's waste heat isn't wasted. 

Am I clear? I'm not anti-growth. I'm anti-irresponsible growth.

The most hopeful part of this story is that AI can help us build better infrastructure while also driving demand for more of it.

That is close to my own work. I work on energy modeling, commissioning automation, and documentation systems. The goal is not to hand an AI a set of drawings and ask it to replace an engineer. It is to lower the cost of careful review.

A complicated project produces thousands of pages of owner requirements, specifications, model outputs, submittals, RFIs, equipment schedules, commissioning plans, trend logs, and cost records. The information is usually there; connecting it is expensive. A missed requirement becomes an RFI. An ambiguous control sequence becomes a field failure. A hidden energy-model assumption becomes a bad decision dressed up as a spreadsheet.


Used with discipline, AI can change the economics of project review. It can turn an approved, revision-tagged project record into something an engineer can interrogate: find a requirement, point to the page or model element, compare revisions, identify missing submittal information, group duplicated coordination issues, and build an exception queue for an engineer or commissioning authority to review.

That last clause matters: **for a real engineer to review**. The simulation engine, BIM rule, meter calculation, or functional test remains the system of record. AI should find evidence, explain discrepancies, and reduce the time needed to examine them. It should not quietly change a model, approve a submittal, revise a schedule, alter a control sequence, or declare a project compliant.

There is evidence that this is more than a fantasy. USACE has used a source-cited AI system over a vetted collection of more than a thousand documents; it reported hundreds of hours saved and knowledge-article production cycles reduced from months to weeks.[29] LBNL researchers have demonstrated controlled workflows that inspect and modify building-energy models, run deterministic simulations, and sharply reduce the time required for simple modeling tasks in a testbed.[30] I wrote about one piece of this work in [*LLMs Are Probabilistic. Test Them Like It.*](/citizen-scientist/llms-are-probabilistic/). I ran 60 frozen-input trials through a multi-agent workflow built around a small residential OpenStudio model.

These efficiencies will spread into other industries, especially intelligence work. Much of the cost of a good analysis is gathering, reading, reconciling, and remembering evidence. AI lets one person hold more material in view, ask better questions, and make reasoning easier to inspect.

None of that guarantees wisdom. A cheaper answer can still be wrong; a faster design can still make a worse building. The human obligation becomes clearer: decide what evidence counts, what risks are acceptable, where automation stops, and who is accountable when the project meets the real world.

That is the point. AI is already valuable enough to justify building infrastructure for it. The choice is whether we build thoughtlessly or build deliberately: cleanly, transparently, sustainably, and with systems that make the rest of the built world better too.

## Sources

[19] https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design_0.pdf — DOE/NREL Best Practice Guide: Data Center Design
[20] https://www.ashrae.org/file%20library/technical%20resources/bookstore/supplemental%20files/therm-gdlns-5th-r-e-refcard.pdf — ASHRAE TC 9.9 Thermal Guidelines reference card
[21] https://www.ashrae.org/file%20library/technical%20resources/bookstore/emergence-and-expansion-of-liquid-cooling-in-mainstream-data-centers_wp.pdf — ASHRAE: Liquid Cooling in Mainstream Data Centers
[26] https://support.usgbc.org/hc/en-us/articles/12154267763987-Applying-LEED-to-data-center-projects — USGBC: Applying LEED to data center projects
[27] https://leedonline-api.usgbc.org/Credit/sampleForm/v4_1.bNc/V02/EA104 — LEED v4.1 Data Centers Optimize Energy Performance form
[29] https://www.usace.army.mil/Media/News-Releases/News-Release-Article-View/Article/3864711/construction-management-innovation-office-uses-ai-to-help-build-new-online-reso — USACE JAQI cited-answer AI case
[30] https://eta-publications.lbl.gov/sites/default/files/2026-06/mcp-enabled_agentic_ai_workflow_for_building_energy_modelling_framework_and_use_cases.pdf — LBNL MCP-enabled AI workflow for building energy modeling
