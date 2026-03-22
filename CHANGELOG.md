# Changelog

All notable changes to the [RaptorQ Article](https://github.com/Dicklesworthstone/raptorq_article) are documented here.

This project has no formal release tags or GitHub releases. The changelog is organized into logical development phases derived from the full commit history. Each commit hash links to its GitHub diff.

---

## Table of Contents

- [Phase 4: Repository Metadata & Housekeeping](#phase-4-repository-metadata--housekeeping-2026-02-11--2026-02-22)
- [Phase 3: Voice, Research & Editorial Polish](#phase-3-voice-research--editorial-polish-2026-02-10)
- [Phase 2: Design System & Visualization Overhaul](#phase-2-design-system--visualization-overhaul-2026-02-10)
- [Phase 1: Content Foundation](#phase-1-content-foundation-2026-02-09)
- [Initial Commit](#initial-commit-2026-02-09)

---

## Phase 4: Repository Metadata & Housekeeping (2026-02-11 -- 2026-02-22)

Four commits covering licensing, social branding, and code quality. No changes to article content or visualizations.

### Licensing

The project's license was changed from plain MIT to MIT with an OpenAI/Anthropic Rider, which restricts use by OpenAI, Anthropic, and their affiliates without express written permission from Jeffrey Emanuel. The README badge and license section were updated to match.

- Added MIT + OpenAI/Anthropic Rider license file -- [`b95d7d9`](https://github.com/Dicklesworthstone/raptorq_article/commit/b95d7d9fbcc0e754d60099462ca94a3d891491d2)
- Updated README license badge and references -- [`5c86589`](https://github.com/Dicklesworthstone/raptorq_article/commit/5c86589e05ddfb20bde8271f6ba59572b934ece9)

### Social Preview

- Added 1280x640 GitHub social preview image (`gh_og_share_image.png`) for consistent link previews when sharing the repository URL -- [`72f451f`](https://github.com/Dicklesworthstone/raptorq_article/commit/72f451f15736d365d7cb081b73694ca7156806f7)

### Python Code Quality

- Replaced unnecessary f-string prefixes with plain string literals in `02_lt_code_simulation.py` and `03_raptorq_precoding.py`, eliminating F541 (ruff) and W1309 (pylint) lint warnings with no behavioral change -- [`fda0b81`](https://github.com/Dicklesworthstone/raptorq_article/commit/fda0b815865a19a4fd17ec47214826486370c09e)

---

## Phase 3: Voice, Research & Editorial Polish (2026-02-10)

Eight commits between 00:48 and 01:31 that reshaped the article's prose voice, integrated late-stage research, and synchronized visualization colors with the redesigned article theme. No structural or layout changes.

### Research Content Additions

Seven factual items were woven into the article's existing sections, adding depth without creating new sections:

- **Feedback implosion**: why ACK-based protocols fail at scale and why rateless codes eliminate the problem
- **Block size caveat**: practical limits on K (the RFC caps at K_max = 56,403)
- **Permanent inactivation scaling**: the sqrt(K) heuristic for PI count
- **Capacity-achieving proof**: sketch of why Raptor codes asymptotically reach channel capacity
- **Digital Fountain Inc. history**: the company behind the original commercial deployment
- **Raptor etymology**: origin of the name (Rapid Tornado)
- **RaptorQ finite-length framing**: how finite block lengths affect overhead guarantees

This commit also re-applied voice edits to the hero subtitle, section intros, and heading rewrites that had been partially reverted by an earlier tooling artifact. Both `index.html` (1,122 lines changed) and `visualizations.js` (263 lines changed) were touched.

- [`ebcd7e6`](https://github.com/Dicklesworthstone/raptorq_article/commit/ebcd7e618f5146c6b49cb65f03ed6ca0f656e538)

### Voice & Prose Overhaul

A multi-pass editorial rewrite that removed AI writing artifacts and established a consistent first-person, conversational tone modeled on the author's natural writing style.

**De-slopification pass** -- Targeted removal of formulaic AI patterns: emdash overuse, "Here's why" openers, "It's not X it's Y" constructions, performative headings, and forced enthusiasm. Replaced with genuine curiosity, honest asides, and concrete language over polish.

- [`c4e3ba7`](https://github.com/Dicklesworthstone/raptorq_article/commit/c4e3ba73ad0c6d4b5e5f344f41dc4879a0dc8013)

**Text restoration** -- Corrected 16 lines where a commit-splitting tool had inadvertently kept pre-existing HEAD text instead of the intended working-tree version. Affected sections: "Packets Are Equations" intro, Fungibility paragraph, Coupon Collector emphasis, Precode workflow, Peeling intro, Engineering tricks, Comparisons intro, "Where RaptorQ Lives" intro, and closing synthesis.

- [`a122bf0`](https://github.com/Dicklesworthstone/raptorq_article/commit/a122bf07c8e1f5cf4e1db2ae97a205b75cb53f75)

**Three prose-tightening passes** -- Progressive refinement across the full article:

1. Active voice throughout, em-dash-to-comma substitutions, tighter hero subtitle ("sparse matrix, dense core, precode -> fungible packets recoverable from K+2"), shorter footer thesis ("Sparse + Dense. Fast + Correct.") -- [`de4a42a`](https://github.com/Dicklesworthstone/raptorq_article/commit/de4a42a127e4215c0d559cd93db614bc1e8f0846)
2. Cut meta-commentary ("Let's make it concrete" becomes just the example), reframed section intros as questions rather than proclamations, shortened headings -- [`2dee0d1`](https://github.com/Dicklesworthstone/raptorq_article/commit/2dee0d17ef1d88796b4b732da34dc12f5fa92426)
3. Final removal of remaining throat-clearing, active voice corrections -- [`6e4007d`](https://github.com/Dicklesworthstone/raptorq_article/commit/6e4007d8c21a1a8111a4bb2ed7f7607de0d1d9ff)

### Visualization Color Sync

- Updated visualization interactions and color palette in `visualizations.js` to match the editorial redesign from Phase 2 -- [`489bcc0`](https://github.com/Dicklesworthstone/raptorq_article/commit/489bcc042b1049c1cffa14152e10c60bdc0a6387)

---

## Phase 2: Design System & Visualization Overhaul (2026-02-10)

Five commits between 00:03 and 00:47 that completely reworked the article's visual language, rebuilt all five interactive visualizations, redesigned the hero animation, and added substantial new educational content.

### New Educational Content

Concrete worked examples and historical context were added to strengthen multiple sections. All changes in a single commit -- [`e7770af`](https://github.com/Dicklesworthstone/raptorq_article/commit/e7770afbceac9bddf5b6cb6513365514a36404bf):

**Packets Are Equations section:**
- Complete worked XOR encoding example using four byte-valued symbols (A=5, B=3, C=7, D=2) with four coefficient vectors and computed XOR results
- Reframed "standard file transfer equation" as a trivial special case of the general principle

**Coupon Collector's Tax section:**
- Added centered thesis statement: "Dense equations = solvable but slow. / Sparse equations = fast but broken."
- Added K=1,000 concrete example showing 7,500 draws = 7.5x overhead, making the logarithmic penalty visceral before the general K=10,000 case

**LT Codes section:**
- Expanded Ideal Soliton fragility explanation with the "bathtub drain" metaphor: maintaining an expected ripple of exactly one is like tuning inflow to exactly match outflow
- Explained Robust Soliton as deliberately targeting a ripple of 5-10 instead of 1

**Peeling & Inactivation section:**
- Added concrete stopping set (2-core) example: five degree-2 equations forming a cycle A-B-C-D-E-A where no variable is directly solvable
- Added worked inactivation example: marking A as inactive makes y1=A xor B solvable for B, triggering a cascade that resolves the entire cycle
- Added "fast path / slow path" systems engineering analogy

**What RaptorQ Costs section:**
- Explained that extra symbols beyond K buy rank (escaping linear dependence), not information

**How We Got Here timeline:**
- Added 1997 Tornado Codes entry (Luby, Mitzenmacher, Shokrollahi, Spielman)

### All Five Visualizations Rebuilt

Every interactive visualization was substantially reworked for better clarity, animation quality, and pedagogical value in a single commit -- [`a08b105`](https://github.com/Dicklesworthstone/raptorq_article/commit/a08b1054ad2e9f5ada73af93e04430ec2a66fe34):

**GF(2) Matrix Rank Builder (Interactive 1):**
- GSAP-driven cell entrance animations with rotate:-45 reveal
- "Linearly Independent" / "Dependent" label per packet row
- 6xl font-black status display with conditional cyan glow and drop-shadow on full rank
- Larger cell gaps and richer empty-state with pulsing "Waiting for Data..." text

**Degree Distribution & Ripple (Interactive 2):**
- Trimmed displayed degree range from 1-30 to 1-12 (tail beyond d=12 is negligible)
- Simplified RFC 6330 distribution to explicit 12-element probability vector
- Replaced O(K) bipartite-graph peeling simulation with O(1) parametric ripple model to avoid UI freezes at large K
- Stroke-dashoffset self-drawing animation for the ripple line

**Precode Repair (Interactive 3):**
- Increased from K=24, P=4 to K=30, P=6 for better visual density
- Cleaner animation stages with `.rx` class naming
- Stroke-width 3 repair paths with 6,3 dash pattern

**Toy Decode Walkthrough (Interactive 4):**
- Horizontal pill-layout equations replacing stacked list
- Enlarged symbol cards (p-6, rounded-3xl, border-2) with 30px active glow
- "TRACE: STEP 1 / 6" capitalized status

**Peeling Cascade (Interactive 5):**
- Expanded graph from K=8, M=12 to K=12, M=18
- Added degree-3 packets (30% probability) alongside degree-1 (20%) and degree-2 (50%)
- Replaced static positioned layout with D3 force simulation (forceLink, forceManyBody, forceCenter)
- Proper enter/update/merge pattern with `<g>` group elements
- Simulation reheats (alpha=0.3) after each peel step

### Hero Animation Redesign

Replaced the "fountain droplet" particle system with a calmer "data rain" aesthetic that better matches the article's editorial tone -- [`9238ebd`](https://github.com/Dicklesworthstone/raptorq_article/commit/9238ebd7e80bf5311fc7cdf838a36dc7daf53759):

- Increased particle count from 2,000 to 3,000 at lower opacity (0.5 to 0.4) and smaller point size (0.8 to 0.5)
- Added per-particle velocity array for depth parallax (speeds 0.1-0.5)
- Pushed camera z from 50 to 60 for a wider, more ambient field of view
- Expanded particle spread from 80x100x40 to 120x120x100 for full-viewport fill
- Added subtle THREE.GridHelper floor (200x40 subdivisions, cyan/dark, 10% opacity, y=-50) for spatial grounding
- Slowed global rotation from 0.002 to 0.001 rad/frame

### CSS Design System Overhaul

Two commits that progressively refined the article's visual design language:

**Foundation refresh** -- [`6e0b748`](https://github.com/Dicklesworthstone/raptorq_article/commit/6e0b748912fc66c8121dd1c557eae006018abed4):
- Updated CSS custom properties (brighter cyan, lighter text)
- Increased editorial spacing
- Refactored Three.js hero into "fountain droplet" metaphor (later replaced by data rain)

**Full overhaul** -- [`d5367df`](https://github.com/Dicklesworthstone/raptorq_article/commit/d5367dfb4e5277a3a9ec3ef0f0fb7f5f7fb7a69d):

- *Color:* Removed redundant accent variables (--accent-blue, --accent-purple, --accent-emerald, --glass-bg, --glass-border); kept only --accent-cyan as the primary interactive color. Shifted --text-muted from #94a3b8 to #64748b.
- *Typography:* Switched headings from Bricolage Grotesque to Inter at font-weight 900 with -0.05em tracking. Added OpenType features ss03, cv05, tnum for numeral alignment. Capped paragraphs at 65ch with text-wrap:pretty. Added typographic scale variables (--fs-base: 1.1rem, --lh-base: 1.6).
- *Components:* Reduced border-radius globally. Removed insight-card ::after pseudo-element. Simplified section dividers from gradient to flat white/10 line. Tightened button sizing with consistent tracking. Switched btn-action from white to cyan-500 background.
- *New utilities:* `.drop-cap`, `.data-grid-cell` / `.cell-1` / `.cell-0` / `.cell-pivot`, `.viz-overlay-stats` / `.stat-value` / `.stat-label`.
- *Removed:* CSS keyframe animations (slideIn, flashGreen), replaced by GSAP-driven animations.

---

## Phase 1: Content Foundation (2026-02-09)

Three commits that built the article's editorial structure on top of the initial scaffold, adding two major new sections.

### PAR Files Bridge Section

Added a new "What You Already Know" section that bridges from familiar PAR2 repair files and RAID 5 to fountain codes, giving readers with practical data-recovery experience a concrete on-ramp -- [`77f1d9b`](https://github.com/Dicklesworthstone/raptorq_article/commit/77f1d9bf330064633781e7eed7e87d5445eeb3ab):

- Explains Reed-Solomon's MDS (Maximum Distance Separable) property: any K of K+R symbols perfectly reconstruct K source symbols
- Two-card layout explaining why Reed-Solomon is not the end of the story: fixed-rate (must choose R in advance) and O(K^2) encoding complexity
- Expanded mathematical notation and LT -> Raptor -> RaptorQ progression with precise complexity and overhead comparisons

The heading was subsequently softened from "What You Already Know" to "What You **May** Already Know" to avoid assuming reader familiarity with PAR2/RAID 5 -- [`3ac2f15`](https://github.com/Dicklesworthstone/raptorq_article/commit/3ac2f15473b496e7e0caf81c86e1cc3e76b284cd)

### "RaptorQ in the Wild" Section

Added a 136-line section grounding the article's theoretical content in concrete, real-world deployments -- [`1d58753`](https://github.com/Dicklesworthstone/raptorq_article/commit/1d58753c1187db3b3ce90d596c21384591030bdc):

**Cellular standards (3 cards, blue/purple/cyan theming):**
- 3G/4G MBMS & eMBMS: 3GPP TS 26.346 mandates Raptor/RaptorQ for one-to-many file delivery. Cited deployments: KT Korea streaming 4K during the 2018 PyeongChang Olympics, Verizon go90 using eMBMS for live video.
- 5G Broadcast (5G-BC): 3GPP Release 16+ continues with RaptorQ as application-layer FEC. Use cases: connected car firmware updates (BMW/Audi testing), IoT fleet provisioning, emergency alerts.
- ATSC 3.0 (NextGen TV): RaptorQ adopted for over-the-air file delivery via ROUTE protocol. Deployments: WHUT-TV datacasting in Washington D.C., New Mexico PBS emergency alert data distribution.

**Author's projects (3 cards, emerald/amber/sky theming, with GitHub links):**
- asupersync: ground-up RFC 6330 implementation with GF(256) arithmetic, systematic encoding, two-phase inactivation decoder. Used for distributed state recovery at ~1.2x storage (vs. Nx replication).
- FrankenSQLite: SQLite reimplementation embedding RaptorQ into every persistent layer. WAL self-healing (.wal-fec sidecar, R=2 default, ~10^-7 failure rate), database-level FEC, fountain-coded snapshot shipping.
- Flywheel Connectors: symbol-first mesh protocol over Tailscale where data never exists as files on the wire, only as encrypted RaptorQ symbols with capability-based access control.

Includes synthesis callouts connecting deployments back to the article's mathematics.

---

## Initial Commit (2026-02-09)

[`3925004`](https://github.com/Dicklesworthstone/raptorq_article/commit/3925004b1487b0df2a91320909cf482ffa8ee229) -- Full project scaffold: 8,091 lines across 17 files.

### Article (`index.html`)

Single-page interactive article covering the full RaptorQ (RFC 6330) construction from first principles through inactivation decoding. Eight major sections:

1. **Packets Are Equations** -- Why every received packet is a linear constraint over GF(2)
2. **The Coupon Collector's Tax** -- Why sparse random codes need O(K log K) packets
3. **LT Codes & The Ripple** -- Soliton distributions and the peeling decoder
4. **The Precode Trick** -- Be sloppy (97%), then fix the tail deterministically
5. **Intermediate Symbols** -- What the decoder actually solves for (LDPC + HDPC + LT constraints)
6. **Peeling & Inactivation** -- Confining cubic cost to a tiny dense core
7. **Engineering Tricks** -- Systematic encoding, ESI/ISI, K' padding, permanent inactivation
8. **The Deep Math** -- Rank-Nullity, Shamir parallels, GF(256) rank probabilities, stopping sets

### Interactive Visualizations (`visualizations.js`)

Five interactive visualizations built with D3.js, Three.js, and GSAP (1,364 lines):

1. **GF(2) Matrix Rank Builder** -- Add random equations one at a time, watch rank grow toward full rank
2. **Degree Distribution & Ripple** -- Compare Ideal Soliton, Robust Soliton, and RFC 6330 degree tables; simulate peeling with live ripple
3. **Precode Repair** -- Animated walkthrough of precode redundancy recovering missed symbols
4. **Toy Decode Walkthrough** -- Step-by-step K=4 decode with every XOR computed visually
5. **Peeling Cascade** -- Bipartite graph visualization of degree-1 resolution cascading through the constraint graph

Plus a Three.js particle-stream hero animation and GSAP scroll-triggered section transitions.

### Python Demos

Three standalone pedagogical scripts (Python 3.8+, NumPy):

- `01_xor_encoding_decoding.py` (312 lines) -- Basic XOR encoding/decoding with Gaussian elimination
- `02_lt_code_simulation.py` (510 lines) -- LT code simulation with Robust Soliton distribution and belief propagation
- `03_raptorq_precoding.py` (647 lines) -- RaptorQ-style precoding: LDPC precode + LT fountain layer

### Research & Planning Notes

Eight research/planning documents (3,534 lines total):

- `raptorq_article_research.md` (2,927 lines) -- Primary research notes
- `raptorq_fountain_codes_research.md` -- Fountain code family survey
- `raptorq_math_foundations.md` -- Mathematical foundations deep-dive
- `raptorq_shamir_connection.md` -- Shamir's Secret Sharing parallels
- `raptorq_precoding_section.md` -- Precoding section draft notes
- `raptorq_blog_sections.md` -- Section planning notes
- `raptorq_conclusion.md` -- Conclusion draft notes
- `lt_codes_section.md` -- LT codes section draft notes

### Tooling & Configuration

- `tools/scroll_perf_probe.mjs` (323 lines) -- Scroll performance diagnostic
- `.gitignore`, `README.md`, `TODO.md`

---

## Cumulative File Inventory

| File | Role | Phases Touched |
|------|------|----------------|
| `index.html` | Single-page article (HTML + Tailwind + MathJax) | Initial, 1, 2, 3 |
| `visualizations.js` | All 5 interactive visualizations + hero animation | Initial, 2, 3 |
| `01_xor_encoding_decoding.py` | Python demo: XOR + Gaussian elimination | Initial |
| `02_lt_code_simulation.py` | Python demo: LT codes + Robust Soliton | Initial, 4 |
| `03_raptorq_precoding.py` | Python demo: precode + fountain composition | Initial, 4 |
| `tools/scroll_perf_probe.mjs` | Scroll performance diagnostic | Initial |
| `gh_og_share_image.png` | GitHub social preview (1280x640) | 4 |
| `LICENSE` | MIT + OpenAI/Anthropic Rider | 4 |
| `README.md` | Project documentation | Initial, 4 |
| `raptorq_article_research.md` | Primary research notes | Initial |
| `raptorq_math_foundations.md` | Mathematical foundations | Initial |
| `raptorq_fountain_codes_research.md` | Fountain code family survey | Initial |
| `raptorq_shamir_connection.md` | Shamir's Secret Sharing parallels | Initial |
| `raptorq_precoding_section.md` | Precoding section draft | Initial |
| `raptorq_blog_sections.md` | Section planning | Initial |
| `raptorq_conclusion.md` | Conclusion draft | Initial |
| `lt_codes_section.md` | LT codes section draft | Initial |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Layout & styling | Tailwind CSS (CDN) | Dark-theme editorial design |
| Typography | Inter, Crimson Pro, JetBrains Mono | Headings, body, code |
| 3D animation | Three.js | Data-rain hero |
| Charts | D3.js v7 | Bar/line charts, bipartite graphs, force layouts |
| Scroll animation | GSAP + ScrollTrigger | Section transitions |
| Math rendering | MathJax 3 | LaTeX equations |
| Python demos | Python 3.8+ / NumPy | Pedagogical simulations |
