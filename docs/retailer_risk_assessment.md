# Retailer risk assessment — least to most likely to be sued on regulatory or ESG grounds

Status: first pass, Phase 2 of `docs/rating_methodology.md`. Structured data lives in `data/raw/retailer_risk_assessment.csv`; this document carries the reasoning and the short-/long-term recommendations per entity. Written 2026-09-14.

## What this is, and what it isn't

This ranks 14 real UK/US grocery entities — bricks-and-mortar retailers plus online/delivery platforms — from **least to most likely to face a regulatory or ESG-grounds legal action**, using the layer-1 methodology from `rating_methodology.md` (regulatory exposure/readiness), grounded in real, cited evidence for each entity: ownership structure, disclosure track record, business model, and — where it exists — actual enforcement/litigation history.

It is **not** a statistical probability model. It's analytical judgment applied to real facts, appropriate for an exploratory prototype. Every claim in the evidence column is sourced; the *ordering itself* is Claude's synthesis of that evidence, which is why the CSV's `confidence` column describes the underlying evidence as real rather than claiming the rank itself is a measured quantity. Treat the order as a considered starting hypothesis to pressure-test, not a finished score.

## Entity universe and one scope note

Covers the traditional UK "Big 6+"-style grocery set (Tesco, Sainsbury's, Asda, Aldi, Lidl, M&S Food, Morrisons, Co-op, Waitrose, Iceland) plus four online/delivery entities chosen to represent the "even an online store needs to be considered compliance-wise" point: Ocado (pure online-only UK supermarket that owns/sells its own inventory), Amazon Fresh/Whole Foods (global scale, dual UK+US exposure), Getir (a now-inactive-in-UK cautionary case for the quick-commerce/dark-store model), and Instacart (a pure marketplace that never owns inventory, so its exposure profile is structurally different from the other 13 — its risk lives almost entirely in labor classification, not packaging/sourcing).

**On "Instamart"-type platforms specifically:** Swiggy Instamart and comparable quick-commerce apps operate in India, which sits outside this console's current EU/UK/US regulatory scope (see `docs/data_sources.md`). Rather than force a fact-free entry into the ranking, the *archetype* is represented by Getir and Instacart, both of which are within scope and both of which show the two distinct failure modes that quick-commerce/marketplace platforms carry (unit-economics-driven exit, and labor-classification liability). If you want India brought into the console's actual jurisdiction coverage, that's a real scope-expansion decision worth its own conversation rather than a quiet addition here.

## The ranking, least to most likely to be sued

| Rank | Entity | Ownership | Band | Why (one line) |
|---|---|---|---|---|
| 1 | Co-op | Cooperative | Lower | Member-owned incentives, ETI-code sourcing, 100% Fairtrade core lines since 2017, no enforcement history found |
| 2 | Waitrose (JLP) | Employee-owned partnership | Lower | Externally validated net-zero targets, disclosed 40% Scope 1-2 cut, specific dated packaging targets |
| 3 | M&S Food | Public (LSE) | Low-moderate | 10/10 RSPO scorecard, ~99% segregated palm oil — but broad "carbon neutral" framing is exactly what Green Claims rules target |
| 4 | Lidl GB | Private multinational | Low-moderate | Strong specific metrics, but group large enough for looming CSRD-equivalent disclosure not yet matched in UK reporting |
| 5 | Aldi UK | Private multinational | Low-moderate | Same profile as Lidl; company-level EUDR sourcing traceability not yet publicly evidenced |
| 6 | Ocado Retail | Public (LSE) | Moderate | Proactive EPR tooling (Polytag), but a first-mover test case for online-only pEPR enforcement — genuine regulatory ambiguity |
| 7 | Sainsbury's | Public (LSE) | Moderate | Real, adjudicated ASA history: Fairtrade tea claims rebuke + plant-based claims dispute |
| 8 | Tesco | Public (LSE) | Moderate | Widest multi-country footprint of the UK set; teabag greenwashing accusation + same ASA plant-based dispute as Sainsbury's |
| 9 | Amazon Fresh/Whole Foods | Public (NASDAQ) | Moderate | Strong grocery-specific packaging program, but sits inside a group with its own separate labor/antitrust scrutiny pattern |
| 10 | Asda | Private equity (TDR Capital) | Elevated | Leveraged buyout structure, no LSE-driven disclosure cadence |
| 11 | Morrisons | Private equity (CD&R) | Elevated | Debt-funded asset sales already drew political criticism; public 2030 net-zero-farms pledge is a hard, checkable deadline |
| 12 | Iceland Foods | Private, founder-owned | Elevated | High-profile 2018 palm-oil ban pledge, later partially reversed — exactly the pattern green-claims rules target |
| 13 | Getir (archetype, inactive in UK) | Private multinational | Elevated | Exited UK/DE/NL Apr 2024; dark-store + gig-rider model structurally combines high packaging intensity with labor exposure |
| 14 | Instacart | Public (NASDAQ) | Highest | Already has a real, paid $46.5M settlement for worker misclassification — the only entity here with an adjudicated outcome, not just exposure |

## Reasoning and solutions, entity by entity

### 1. Co-op — Lower risk
**Why:** Member-owned governance aligns incentives away from the profit-driven overclaiming that usually triggers green-claims scrutiny; ETI Base Code and 100%-Fairtrade core lines are long-standing, specific, and verifiable.
- **Short-term:** Run a self-audit against the five console pillars now, before any of them are mandatory for a business of Co-op's size — cheap while nothing is on fire.
- **Long-term:** Publish a CSDDD-style supply-chain human-rights due-diligence statement pre-emptively; the cooperative structure is a genuine differentiator worth using as the anchor of that story.

### 2. Waitrose (John Lewis Partnership) — Lower risk
**Why:** First UK retailer with externally validated net-zero targets; disclosed emissions figures are specific and dated, which is the strongest defense against a claims challenge.
- **Short-term:** Nothing urgent — maintain the third-party validation cadence.
- **Long-term:** Extend the Polytag-style packaging traceability (currently milk-focused) across the full own-label range ahead of pEPR's reporting requirements becoming mandatory in detail.

### 3. M&S Food — Low-moderate risk
**Why:** Genuinely strong, specific palm-oil credentials (10/10 RSPO scorecard). The residual risk is legacy broad framing like "carbon neutral," which is a category regulators are specifically targeting even when the underlying work is real.
- **Short-term:** Get an independent assurance statement on any remaining broad net-zero/carbon-neutral claims before the EU Green Claims Directive's substantiation bar applies.
- **Long-term:** Finish the move from mass-balance to fully segregated palm oil on the stated timeline; stand up a formal legal review step for all environmental marketing copy.

### 4. Lidl GB — Low-moderate risk
**Why:** Detailed, specific, tracked metrics (29% plastic cut, 43% food-waste cut) are a strong defense. The gap is structural: a private multinational at Schwarz Gruppe's scale will eventually be pulled into CSRD-equivalent group disclosure, and UK-specific reporting isn't yet in that format.
- **Short-term:** Publish UK figures in a CSRD-aligned structure now rather than only in "Good Food" report language, so the transition isn't a scramble.
- **Long-term:** Disclose a group-level (Schwarz Gruppe) CSRD-alignment roadmap publicly, not just GB-specific initiatives.

### 5. Aldi UK — Low-moderate risk
**Why:** Same private-multinational profile as Lidl, with strong specific packaging metrics (4,500 tonnes removed) but no visible company-level EUDR sourcing traceability yet.
- **Short-term:** Same CSRD-readiness disclosure step as Lidl.
- **Long-term:** Build and publish ingredient-level EUDR sourcing traceability for own-brand cocoa/palm-oil-adjacent lines — this also directly closes the "company side not yet wired in" gap flagged in `data/raw/ingredient_exposure.csv`.

### 6. Ocado Retail — Moderate risk
**Why:** Proactively investing in EPR compliance tooling (Polytag), which is the right instinct — but as one of the few pure online-only grocers, it's effectively a test case for how pEPR enforcement gets applied to online-only retail. That's real regulatory ambiguity, not a compliance failure.
- **Short-term:** Publish explicit pEPR registration/compliance status rather than leaving it implicit in the sustainability microsite — first movers benefit from being loudly, verifiably compliant.
- **Long-term:** Extend Polytag traceability from milk + ~100 SKUs to the full own-label range, and offer the resulting compliance template as an informal industry reference — turning first-mover ambiguity into first-mover authority.

### 7. Sainsbury's — Moderate risk
**Why:** Has real, adjudicated ASA history in this exact space — a Fairtrade tea claims rebuke and a "contrasting" ruling (alongside Tesco) on plant-based environmental claims. This is precedent, not speculation.
- **Short-term:** Legal review of every live environmental/plant-based/Fairtrade claim against the ASA CAP code, given the sector's own recent rulings; retire or re-substantiate anything resembling the challenged claims.
- **Long-term:** Build a centralized claims-substantiation register — every public sustainability claim mapped to the underlying verifiable data — ahead of the Green Claims Directive/EmpCo regime.

### 8. Tesco — Moderate risk
**Why:** The widest multi-country regulatory surface of the UK-focused set (UK, Ireland, Czech Republic, Slovakia, Hungary), plus a public greenwashing accusation over "biodegradable" teabag claims and the same ASA plant-based dispute as Sainsbury's.
- **Short-term:** Same claims-substantiation audit as Sainsbury's, specifically revisiting product-level "biodegradable"/compostability claims.
- **Long-term:** Build one unified multi-jurisdiction compliance calendar per country of operation — a UK-only view of Tesco's exposure understates it by a wide margin, and this console's own data model could be extended to do exactly that.

### 9. Amazon Fresh / Whole Foods — Moderate risk
**Why:** The grocery-specific packaging story is genuinely strong (curbside-recyclable rollout, Climate Pledge), but it sits inside a group with its own separate, larger pattern of labor and antitrust scrutiny that colors how regulators and investors read every Amazon-branded claim, grocery or not.
- **Short-term:** Ring-fence and independently audit grocery-specific labor and packaging claims so they're evaluated on their own record rather than tarred by unrelated group-level controversies.
- **Long-term:** Publish grocery-specific Scope 1-3 figures separately from whole-company figures, and put a disclosed timeline on the UK curbside-recyclable rollout rather than the current open-ended framing.

### 10. Asda — Elevated risk
**Why:** Leveraged buyout ownership (TDR Capital 67.5% / Mohsin Issa 22.5% / Walmart 10%) with none of the LSE-driven mandatory disclosure cadence that Tesco, Sainsbury's, and M&S carry.
- **Short-term:** Voluntarily adopt CSRD-equivalent reporting now — large private "undertakings" of Asda's size are likely to be pulled into equivalent UK/EU regimes regardless, and getting ahead of a deadline is cheaper than retrofitting under one.
- **Long-term:** Given the leverage/debt structure, ring-fence a compliance-investment budget that survives debt-servicing pressure, so packaging/EPR/ESG programs aren't the first line item cut in a downturn.

### 11. Morrisons — Elevated risk
**Why:** Same PE-leverage profile as Asda, but with a more publicly documented pattern already in the record: £6.6bn acquisition debt, the fuel-forecourts sale, and a warehouse sale-leaseback that drew explicit political criticism over asset stripping. CD&R's public "net-zero British farms by 2030" pledge is a hard, checkable deadline.
- **Short-term:** Publish an independently audited progress update against the 2030 net-zero-farms pledge specifically — it's dated and public, so silence on it reads as a red flag by itself.
- **Long-term:** Build a governance safeguard (e.g., a ring-fenced ESG capital commitment) that survives a change of ownership, so commitments don't reset every time the company changes hands.

### 12. Iceland Foods — Elevated risk
**Why:** Made one of the most high-profile absolute environmental pledges in UK retail (the 2018 palm-oil ban, via the Greenpeace "Rang-tan" campaign) — and later partially reversed it. A reversed absolute claim is precisely the failure mode the EU Green Claims Directive/EmpCo and equivalent UK rules are built to catch.
- **Short-term:** Publicly clarify the current, actual state of the palm-oil policy — ambiguity about a walked-back pledge is itself the exposure, independent of what the policy now actually is.
- **Long-term:** Replace the absolute "ban" framing with a verifiable RSPO-segregated-sourcing commitment (the M&S model) — smaller claim, fully defensible, and rebuilds credibility on a foundation the company can actually sustain.

### 13. Getir (quick-commerce archetype, currently inactive in UK) — Elevated risk
**Why:** Exited the UK, Germany, and Netherlands in April 2024 after the unit economics of 10-minute delivery collapsed. Not itself an ESG enforcement action — but the underlying dark-store/gig-rider model structurally stacks two real exposures: more packaging per basket than a consolidated grocery shop, and rider-classification liability under the same pressures Instacart has already been sued over.
- **Short-term:** Not applicable to current UK operations. If any residual UK entity or registration still exists, it should be wound down cleanly (pEPR producer registrations and former-rider classification claims don't expire just because the storefronts closed).
- **Long-term (for the archetype, if quick-commerce re-enters UK/EU markets):** Design rider classification and reusable-packaging systems into the model from day one, ahead of the EU Platform Work Directive's rebuttable-employee-presumption standard — retrofitting compliance after scaling is what made this category so exposed in the first place.

### 14. Instacart — Highest risk
**Why:** The only entity in this set with an actual, adjudicated, paid outcome: a $46.5M settlement (Oct 2022) with the San Diego City Attorney over worker misclassification, covering roughly 308,000 workers. It operates in a post-AB5 landscape (upheld by the 9th Circuit, June 2024) where the marketplace model's core assumption — workers are independent contractors — is the exposed structural element, not a peripheral practice. Its marketplace model also means it largely sidesteps the packaging/sourcing pillars that dominate everyone else's exposure on this list.
- **Short-term:** Complete a state-by-state gig-worker classification audit across every US state Instacart operates in, not just California, and pre-emptively align contractor terms before the next state files a similar claim.
- **Long-term:** If Instacart (or a comparable marketplace platform) expands into the EU/UK, get ahead of the EU Platform Work Directive's rebuttable-employee-presumption standard specifically — one lost classification case in this model tends to cascade into serial suits across jurisdictions, exactly as the California case has already shown.

## Honest gaps in this pass

- The ranking is single-pass analytical judgment, not independently peer-reviewed — treat rank order within a band (e.g., is Tesco really riskier than Sainsbury's) as far less confident than the band placement itself.
- No company-financial-data layer (revenue/headcount from SEC EDGAR/Companies House) is wired in yet to confirm which regulatory size thresholds each entity actually crosses — that's still an open item from `docs/data_sources.md`.
- Third-party ESG benchmark citations (MSCI/Sustainalytics/CDP letter grades) — layer 3 of the methodology — aren't in this pass; everything here is layer 1 (regulatory exposure/readiness) plus whatever disclosed metrics turned up in a general search. A next pass should check whether those third-party scores are freely citable, per the open item in `rating_methodology.md`.
- This has not been run past legal review. Per the risk noted in `rating_methodology.md`, before this goes anywhere public-facing, every claim above should be re-verified against a primary source (company report, ASA ruling, court filing) rather than the search-summary form it's in here.
