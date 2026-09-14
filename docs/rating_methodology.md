# Retailer/company ESG rating — methodology & roadmap (draft)

Status: **exploratory prototype design**, not yet built. Written 2026-09-14 to regiment the idea before implementation starts. Same discipline as the rest of this project: real data wherever possible, gaps labeled honestly, no invented precision.

## What this is

A rating layer on top of the existing regulatory console: instead of only tracking *what regulations are changing*, score real CPG companies on how exposed and how ready they are for them. Two levels, built in order:

1. **Company-level rating** (primary, built first) — scores real companies at scale.
2. **Product-level preview** (secondary, illustrative only) — a single worked example card, not a scored product line. Product-level scoring can only be done meaningfully per-retailer/per-SKU, which is a much bigger data problem — this stays a "here's the direction" pitch artifact until the company layer is solid.

## Entity model: two supply-chain roles, not one

A "company" here splits into two roles that the regulations already tracked in this repo treat differently:

- **Brand owners / manufacturers** (e.g. Unilever, Nestlé, P&G, Mondelez) — primarily exposed to EUDR (deforestation-linked commodities) and CSDDD (supply-chain due diligence).
- **Retail sellers** (e.g. Tesco, Walmart, Sainsbury's, Kroger) — primarily exposed to UK pEPR, UK Plastic Tax, PPWR, and point-of-sale green-claims rules (EmpCo/FTC Green Guides).

A company's role (or both, if vertically integrated) is itself a real, citable fact and determines which pillars below actually apply to it. The rating must keep this distinction visible rather than flattening every company into one undifferentiated score.

## Five rating pillars

Mapped directly onto the regulations already in `data/raw/regulatory_calendar.csv`:

| Pillar | Regulations | Existing repo data to build on |
|---|---|---|
| Climate & Emissions Disclosure | CSRD, SEC Climate Rule, SB253/SB261 | Calendar dates only — company metrics not yet wired in |
| Deforestation & Sourcing | EUDR | `ingredient_exposure.csv` (commodity side) — company side not yet wired in |
| Packaging & Waste | PPWR, UK pEPR, UK Plastic Tax | `packaging_data_sources.csv` — partial |
| Supply-Chain Human Rights | CSDDD | Calendar dates only |
| Green Claims Integrity | EU Green Claims/EmpCo, FTC Green Guides | Calendar dates only |

## Data foundation: three layers per pillar, not three competing methods

For each pillar, a company's rating combines:

1. **Regulatory exposure/readiness** — derived from the existing calendar + ingredient-exposure data: is this company subject to regulation X, by when, and is there any public sign of compliance readiness. Fastest layer to build — it reuses data already in this repo.
2. **Disclosed metrics** — real, self-reported numbers from the company's own CSRD report, CDP submission, or SEC 10-K/climate filing (Scope 1-2-3 figures, % recycled packaging content, % deforestation-free certified volume, etc.).
3. **Third-party benchmark citation** — MSCI ESG letter grade, Sustainalytics risk score, or CDP letter grade, shown as a cited anchor with original commentary on what it means *specifically for CPG regulatory exposure* — cited, not recomputed. Cheapest way to get real numbers into the prototype without a research slog per company.

## Scoring format: banded, not a fabricated precise number

Given this is an exploratory prototype and data completeness will vary a lot company to company, a false-precision score (e.g. "73.2/100") would overclaim rigor the underlying data doesn't support. Instead, reuse the confidence-labeling pattern already established in `docs/data_sources.md`:

- Each pillar gets a band: **Leading / Developing / Exposed / Unrated**
- Each pillar's band is tagged with its data-confidence layer: **Verified disclosure** / **Cited third-party** / **Regulatory-exposure-only** / **Gap**
- An overall company band rolls up from the five pillar bands, but the per-pillar breakdown (and its confidence tags) stays visible — never collapse to a single opaque number.

## Product-level preview (illustrative only)

One card, one product, one company (e.g. a Unilever soap or a Nestlé product containing a real EUDR-covered commodity like palm oil or cocoa), manually annotated using the same three-layer logic scaled down to product level. Labeled explicitly:

> **Preview — illustrative, not yet a scored product line.**

This exists to show a pitch audience the direction, not to imply product-level coverage that doesn't exist yet.

## A risk worth naming plainly

Rating real, named companies — even as a prototype — carries more exposure than a general regulatory tracker: if a rating reads as reputational and turns out wrong, that's a different risk class than "here's when EUDR takes effect." Mitigations to carry through the build, not bolt on later:
- Cite every input transparently (source + date, same as `regulatory_calendar.csv` already does)
- Always surface the confidence layer alongside any band
- Frame the output as independent analysis/opinion, not an authoritative certification

## Phasing

- **Phase 1** — deploy the current console as-is (regulatory calendar, ingredient exposure, packaging sources). Already built and tested; ships independently of everything below.
- **Phase 2** — pick a real sample set of 8-10 companies (mix of brand owners + retailers), build the regulatory-exposure layer (layer 1 above) using data already in this repo.
- **Phase 3** — add the disclosed-metrics and third-party-citation layers (layers 2-3), build the rating UI, add the one product-level preview card.
- **Phase 4** — expand company coverage / pillar depth; revisit scoring rigor if this graduates past prototype status.

## Open, not yet decided

- The initial 8-10 company sample list (brand owners + retailers) — pending your shortlist.
- Whether MSCI/Sustainalytics scores are freely citable or behind access restrictions that would need checking before layer 3 is built.
- Naming/branding for the rating itself.
