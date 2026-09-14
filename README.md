# Sheersh's ESG Console

An ESG regulatory intelligence console for consumer packaged goods (CPG) — tracking what's changing across EU/UK/US ESG regulation, predicting which regimes apply to a given company, and recommending real alternative-sourcing approaches for exposed ingredients/materials.

Modeled on the same discipline as the [Frozen Dessert Market Console](https://github.com/sheersh-star/frozen_market_stage1): real, cited data wherever possible; gaps labeled honestly rather than guessed at; self-updating where the underlying source allows it.

## Origin

Built from `CPG_ESG_Regulatory_Briefing.pdf` + `CPG_ESG_Regulatory_Briefing_Presenter_Guide.docx` — a September 2026 internal briefing covering EUDR, CSRD/CSDDD, PPWR/UK pEPR/Plastic Tax, US federal-vs-California divergence, and green-claims rules (EmpCo/FTC Green Guides).

## Structure

```
data_pipeline.py            Reads data/raw/*.csv, writes data/processed/esg_console_data.json
refresh_live_sources.sh     Live-pull commands to run yourself (this sandbox has no network access)
index.html / styles.css / app.js   Zero-dependency static frontend
data/raw/                   Source data, one file per dataset
  regulatory_calendar.csv       19 rows / 12 regulations, key dates, status, confidence, source
  ingredient_exposure.csv       9 ingredients/materials → regulatory driver → alternative sourcing
  packaging_data_sources.csv    4 real UK packaging datasets (NPWD, Producer Register, WRAP)
  retailer_risk_assessment.csv  14 real grocery/delivery entities ranked least-to-most likely to face
                                 regulatory/ESG legal action, with short/long-term recommendations
  political_landscape.csv       7 real political entities (who controls what, US/UK/EU) and their stance
  legislative_forecast.csv      12 rows, one per regulation — trajectory (strengthening/weakening/
                                 rollback/stable/gap) joined onto regulatory_calendar.csv by regulation_id
data/processed/
  esg_console_data.json       Pipeline output — regenerate with `python3 data_pipeline.py`
docs/
  data_sources.md                    What's collected, what's resolved, what's still a genuine gap
  rating_methodology.md              Draft methodology for a future retailer/product ESG rating
  retailer_risk_assessment.md        Reasoning + solutions behind the retailer risk ranking
  legislative_forecast_methodology.md  Who controls what, and which way each regulation is trending
```

## Status

Data collection + pipeline phase, frontend built and tested locally, not yet deployed/hosted. `data_pipeline.py` runs and produces real structured JSON from the raw CSVs (19/19 regulatory-calendar rows at "real" confidence). See `docs/data_sources.md` for exactly what's verified, what's still only sourced to the original briefing deck, and what's a genuine data gap (RSPO has no open API, company financial data for exposure-prediction isn't wired in yet).

`docs/rating_methodology.md` and `docs/retailer_risk_assessment.md` cover the company-level ESG rating layer — a real 14-entity risk ranking exists in `data/raw/retailer_risk_assessment.csv`, wired into the pipeline and surfaced in the frontend.

`docs/legislative_forecast_methodology.md` covers the newest layer: no live APIs, everything hand-researched this session — who currently controls each relevant legislative/regulatory body (`political_landscape.csv`) and which direction each of the 12 tracked regulations is actually trending as a result (`legislative_forecast.csv`, joined onto the compliance calendar by `regulation_id`). 4 of the 12 regulations are honestly flagged as not-yet-researched rather than guessed at.
