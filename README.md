# Sheersh's ESG Console

An ESG regulatory intelligence console for consumer packaged goods (CPG) — tracking what's changing across EU/UK/US ESG regulation, predicting which regimes apply to a given company, and recommending real alternative-sourcing approaches for exposed ingredients/materials.

Modeled on the same discipline as the [Frozen Dessert Market Console](https://github.com/sheersh-star/frozen_market_stage1): real, cited data wherever possible; gaps labeled honestly rather than guessed at; self-updating where the underlying source allows it.

## Origin

Built from `CPG_ESG_Regulatory_Briefing.pdf` + `CPG_ESG_Regulatory_Briefing_Presenter_Guide.docx` — a September 2026 internal briefing covering EUDR, CSRD/CSDDD, PPWR/UK pEPR/Plastic Tax, US federal-vs-California divergence, and green-claims rules (EmpCo/FTC Green Guides).

## Structure

```
data_pipeline.py            Reads data/raw/*.csv, writes data/processed/esg_console_data.json
refresh_live_sources.sh     Live-pull commands to run yourself (this sandbox has no network access)
data/raw/                   Source data, one file per dataset
  regulatory_calendar.csv     18 rows / 10 regulations, key dates, status, confidence, source
  ingredient_exposure.csv     9 ingredients/materials → regulatory driver → alternative sourcing
  packaging_data_sources.csv  4 real UK packaging datasets (NPWD, Producer Register, WRAP)
data/processed/
  esg_console_data.json       Pipeline output — regenerate with `python3 data_pipeline.py`
docs/
  data_sources.md             What's collected, what's resolved, what's still a genuine gap
```

## Status

Data collection + pipeline phase. `data_pipeline.py` runs and produces real structured JSON from the raw CSVs (18/18 rows currently at "real" confidence — the SB253 date dispute from the first pass is now resolved and independently corroborated). See `docs/data_sources.md` for exactly what's verified, what's still only sourced to the original briefing deck, and what's a genuine data gap (RSPO has no open API, company financial data for exposure-prediction isn't wired in yet).

No frontend built yet. GitHub repo and hosting come after that.
