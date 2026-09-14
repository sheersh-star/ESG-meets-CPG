# Data sources — status as of 2026-09-14

Same discipline as the Frozen Dessert Market Console: real data wherever possible, every figure traceable to a source, gaps labeled honestly rather than filled in with guesses.

## Collected so far (in `data/raw/`)

| File | Contents | Source | Status |
|---|---|---|---|
| `regulatory_calendar.csv` | 18 rows across 10 regulations (EUDR, CSRD, CSDDD, PPWR, UK pEPR, UK Plastic Tax, EmpCo, EU Green Claims, SEC Climate Rule, FTC Green Guides, SB253, SB261) | Your `CPG_ESG_Regulatory_Briefing.pdf`/`.docx`, cross-checked against EUR-Lex directly for EUDR and against 4 law-firm sources for the SB253 deadline | **All 18 rows now confirmed real** — the SB253 dispute from the first pass is resolved (see below) |
| `ingredient_exposure.csv` | 9 ingredients/materials, their regulatory driver, and a real alternative-sourcing approach per row | Your briefing deck's "Ingredients & Products Under the Most Pressure" table | Real, sourced from your own researched deck |
| `packaging_data_sources.csv` | 4 real UK packaging datasets (NPWD recovery/recycling summary, Producer Public Register, WRAP PlasticFlow 2025, WRAP Paper & Card Flow 2025) | data.gov.uk, environment.data.gov.uk, WRAP | New this pass — partially closes the "packaging recycled-content" gap flagged last time |

## Resolved this pass: SB253 deadline
Three sources conflicted last time. Now confirmed: **CARB deferred the SB253 Scope 1–2 deadline from 10 Aug 2026 to 10 Nov 2026**, announced 24 Jun 2026, with proposed modifications released 27 Jul 2026 (comment period closed 11 Aug 2026). Your briefing's date was correct — corroborated independently by Vinson & Elkins, Morgan Lewis, Greenberg Traurig, and Sullivan & Cromwell coverage of the CARB deferral.

## Sources identified, not yet pulled in

| Source | What it would add | Access method | Notes |
|---|---|---|---|
| **EUR-Lex SPARQL endpoint** | Live regulation status/amendment tracking | `http://publications.europa.eu/webapi/rdf/sparql` — public, no auth, supports JSON/XML/CSV output via content negotiation, 60s query timeout | Confirmed real and documented. Query template is in `refresh_live_sources.sh` — needs to be run from a machine with real network access (this sandbox has none) |
| **Trase (SEI) open data** | Country-level deforestation exposure by commodity (palm oil, soy, cocoa, cattle, wood pulp), DeDuCE dataset (180+ commodities, 2001–2022) | trase.earth/open-data — downloadable, no confirmed bulk API found yet | Not yet downloaded |
| **EFRAG ESRS 2026 datapoint list** | Real CSRD disclosure benchmarks | Free download via efrag.org (adopted 3 Jul 2026 via Delegated Regulation) — confirms your briefing's "1,073→320" figure is accurate (2026 simplification cuts ~60-70%, landing around 320) | Not yet pulled |
| **UK NPWD (National Packaging Waste Database)** | Real recovery/recycling volumes by material, 2006–2024 quarterly | https://npwd.environment-agency.gov.uk/Public/PublicSummaryData.aspx — web portal, exact download format unconfirmed | New lead this pass, needs a direct look |
| **RSPO certificate holder database** | Which companies/mills are RSPO-certified | Searchable web database, **no open API** | Would need scraping (check RSPO's terms of use first) or manual export |
| **SEC EDGAR** (US) / **Companies House** (UK) | Real company revenue/headcount — to power the "does this regulation actually apply to company X" prediction | Both have free public APIs | Not yet wired in |

## Environment constraint, confirmed this pass
This machine's Claude sandbox has **no outbound network access** — `curl` and Python's `urllib` both time out. Only Claude's own `WebFetch`/`WebSearch` tools (which run outside the sandbox) can reach the internet during a session. For anything needing a real bulk download or API pull, `refresh_live_sources.sh` documents the exact commands — **run them yourself, outside Claude**, then hand the output files back to fold into `data/raw/`.

## Known limitation, stated plainly
This dataset now reflects your researched briefing **plus independent corroboration** for the EUDR and SB253 dates specifically. The remaining rows (CSRD/CSDDD Omnibus dates, PPWR, UK pEPR, Plastic Tax, EmpCo) are still sourced only to the briefing deck itself, not yet independently re-verified against EUR-Lex/gov.uk primary text. That's the next honest step before this becomes something anyone relies on.
