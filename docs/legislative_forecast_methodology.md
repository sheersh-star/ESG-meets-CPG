# Legislative & political forecast — methodology

Status: first real pass, live prototype. Written 2026-09-14 in the same session that added the frontend panel rendering this data. Structured data lives in `data/raw/political_landscape.csv` (who controls what) and `data/raw/legislative_forecast.csv` (which direction each of the 12 tracked regulations is trending as a result). This document is the reasoning and the honest gaps.

## The premise

Regulatory and compliance research mostly originates from legislators, not from the regulations themselves — a rule's text tells you what's required *today*, but who currently holds the relevant chamber, agency chair, or executive office tells you where it's headed *next*. This layer tries to make that visible: for each of the 12 regulations already in `regulatory_calendar.csv`, who controls the body that can change it, and what direction (real votes, appointments, and public statements) shows they're actually taking it.

## No APIs, on purpose

This session's sandbox has no outbound network access (same constraint documented in `docs/data_sources.md`). Every fact in both CSVs was pulled by hand via WebSearch during this session and saved as static data — the same pattern the rest of this console already uses. There is no live congress.gov/EUR-Lex/Hansard API wired in here, and building this without one first was the explicit point: prove the data model and the pipeline join are correct on a real (if partial) dataset before deciding whether a live feed is worth the engineering cost.

## What the join actually does (the "mechanics" part)

`data_pipeline.py` reads `legislative_forecast.csv` and joins it onto every row of `regulatory_calendar.csv` by `regulation_id` — the same key both files already share. Each calendar row comes out of the pipeline carrying three new fields: `political_trajectory`, `political_lean`, and `political_actors`. If a regulation_id in the calendar has no matching forecast row, the join fails soft: it stamps `"not_researched"` rather than crashing or silently dropping the field. This was tested by running the pipeline and printing every row's join result — all 19 calendar rows across the 12 regulations resolved correctly.

## Why trajectory and lean are never color-coded on the frontend

Red and blue mean opposite things depending on where you are — red is Republican/right in the US but Labour/left in the UK, so any red/green or red/blue treatment of "left vs right" would be backwards for a meaningful share of readers. Trajectory (strengthening/weakening/rollback/stable) carries the same problem in a subtler way: "weakening" reads as bad news to an environmental audience and good news to a deregulation-minded one. Both fields are rendered as plain text with a neutral directional glyph (▲/▼/→/?) instead of a severity color, on purpose — this is meant to present the facts, not editorialize on whether a direction is good or bad.

## The five real dynamics this pass actually found

1. **US federal rollback, in progress.** SEC Chair Paul Atkins (Trump-appointed) formally proposed rescinding the 2024 climate disclosure rule on 29 May 2026, after the Commission had already ended its legal defense of the rule in March 2025. Called it "a dramatic overreach of the Commission's statutory authority."
2. **A state pushing the opposite direction, explicitly.** California's SB253/SB261 (authored by Democratic state senators Wiener, Stern, and Gonzalez) are being actively defended, not rolled back — Sen. Wiener publicly responded to the SEC's move by saying "California's climate leadership is more critical than ever." Real federal-vs-state divergence along party lines, stated in the legislators' own words.
3. **A center-right/far-right working coalition in the EU, twice.** The European Parliament's EPP (its largest group) formed a working alliance with Patriots for Europe and the ECR — described by multiple outlets as a "right-wing alliance" — to pass both the Omnibus I simplification of CSRD/CSDDD (382-249-13, Nov 2025) and a second delay/simplification of EUDR (402-250). This is the same coalition doing the same thing twice on two different files, which is itself a pattern worth tracking going forward.
4. **A confirmed number that closes an old gap.** `docs/data_sources.md` previously flagged CSRD's "1,073→320" ESRS datapoint-reduction figure as sourced only to the original briefing deck. This pass independently confirms it via the actual Omnibus I vote and Council approval reporting (Sphera, Clifford Chance) — a real example of the political layer feeding back into strengthening the regulatory-fact layer.
5. **A mid-year change of government mid-pass.** UK PM Keir Starmer resigned on 22 June 2026 amid a Labour leadership crisis; Andy Burnham became PM on 20 July 2026, with Dame Angela Eagle appointed Defra Secretary the same day. This is a same-party succession (Labour to Labour), not a change of governing party — but it's real proof of exactly the kind of drift this layer needs to be re-checked against periodically, since it happened within the same year this dataset is dated.

## Honest gaps

- **4 of 12 regulations have no researched political trajectory yet**: PPWR, EU Green Claims Directive, EmpCo, and FTC Green Guides. Each is marked `uncertain_gap` / `confidence: gap` rather than guessed at, including on the frontend (dashed card border). Green Claims and EmpCo in particular could plausibly be under the same EPP-led simplification pressure as CSRD/CSDDD/EUDR, given it's the same Parliament and the same Commission — but "plausible" isn't evidence, and no source tying a specific vote or proposal to those two files specifically turned up this pass.
- **FTC Green Guides is an absence-of-evidence case, not a confirmed direction.** Chair Ferguson's stated 2026 priorities don't mention it either way. That's genuinely different from the EU cases, where there's a real recorded vote — it's marked as a gap for that reason, not lumped in with "stable."
- **This is single-pass, non-exhaustive research**, done via general web search rather than a systematic pull of voting records, committee transcripts, or party manifestos. Treat every row as a real, sourced starting point, not a finished political-science analysis — see the same caveat already established for `docs/retailer_risk_assessment.md`.
- **Political control changes faster than this document does.** The UK PM changed twice in the same year this dataset is dated (Starmer → Burnham), and California's Governor Newsom is term-limited out in January 2027 — both are concrete dates to re-verify this against, not hypothetical risk.
- **No quantitative "probability" is computed anywhere.** `trajectory` is a qualitative label backed by real evidence (a vote, an appointment, a public statement), not a percentage — consistent with the "no invented precision" principle already established in `docs/rating_methodology.md`.

## What a live version would need, if this graduates past prototype

- A real legislative-data API (e.g., a EUR-Lex or congress.gov feed) to catch new votes automatically instead of re-searching by hand each pass.
- The 4 gap rows actually researched, and the existing 8 re-verified on a schedule (quarterly, or triggered by a known event like a US midterm or EU Commission reshuffle).
- The company-financial-data layer already flagged as missing in `docs/data_sources.md`, so a "how exposed is company X" prediction could combine political trajectory with actual company size/sector data rather than jurisdiction alone.
