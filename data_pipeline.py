"""
ESG Console data pipeline.

Reads the raw CSVs in data/raw/ and writes a single structured
data/processed/esg_console_data.json for a frontend to consume —
same pattern as the Frozen Dessert Market Console's data_pipeline.py.

This machine's sandbox has no outbound network access (confirmed:
curl and Python's urllib both time out here), so this pipeline reads
local files only. Live re-pulls from EUR-Lex / data.gov.uk / Trase
are documented as runnable commands in docs/data_sources.md and
refresh_live_sources.sh — run those yourself outside this session,
drop the results into data/raw/, then re-run this pipeline.
"""

import csv
import json
from datetime import date, datetime
from pathlib import Path

RAW_DIR = Path(__file__).parent / "data" / "raw"
PROCESSED_DIR = Path(__file__).parent / "data" / "processed"


def load_csv(filename):
    path = RAW_DIR / filename
    if not path.exists():
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return [row for row in csv.DictReader(f) if any(row.values())]


def days_until(date_str):
    try:
        target = datetime.strptime(date_str, "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return None
    return (target - date.today()).days


def load_political_landscape():
    return load_csv("political_landscape.csv")


def load_legislative_forecast():
    return load_csv("legislative_forecast.csv")


def load_regulatory_calendar():
    rows = load_csv("regulatory_calendar.csv")
    forecast_by_id = {f["regulation_id"]: f for f in load_legislative_forecast()}

    for row in rows:
        row["days_until_key_date"] = days_until(row.get("key_date"))
        # Join the political forecast onto each calendar row by regulation_id —
        # the mechanics this whole layer exists to prove out. A row with no
        # matching forecast entry (shouldn't happen if both CSVs stay in sync,
        # but the pipeline must not crash if one drifts) gets an explicit
        # "not_researched" marker rather than silently omitting the field.
        forecast = forecast_by_id.get(row.get("regulation_id"))
        if forecast:
            row["political_trajectory"] = forecast["trajectory"]
            row["political_lean"] = forecast["controlling_lean"]
            row["political_actors"] = forecast["key_actors"]
        else:
            row["political_trajectory"] = "not_researched"
            row["political_lean"] = "unresearched"
            row["political_actors"] = ""

    def sort_key(r):
        d = r["days_until_key_date"]
        if d is None:
            return (2, 0)  # undated last
        if d >= 0:
            return (0, d)  # upcoming, soonest first
        return (1, -d)  # past, most recent first

    rows.sort(key=sort_key)
    return rows


def load_ingredient_exposure():
    return load_csv("ingredient_exposure.csv")


def load_packaging_sources():
    return load_csv("packaging_data_sources.csv")


def load_retailer_risk_assessment():
    rows = load_csv("retailer_risk_assessment.csv")
    rows.sort(key=lambda r: int(r["rank"]) if r.get("rank", "").isdigit() else 999)
    return rows


def summarize(regulations):
    by_jurisdiction = {}
    by_status = {}
    for row in regulations:
        j = row.get("jurisdiction", "unknown")
        s = row.get("date_status", "unknown")
        by_jurisdiction[j] = by_jurisdiction.get(j, 0) + 1
        by_status[s] = by_status.get(s, 0) + 1
    real_count = sum(1 for r in regulations if r.get("confidence") == "real")
    return {
        "total_regulations": len(regulations),
        "real_confidence_count": real_count,
        "by_jurisdiction": by_jurisdiction,
        "by_status": by_status,
    }


def generate_data():
    regulations = load_regulatory_calendar()  # already carries the joined political_* fields
    ingredients = load_ingredient_exposure()
    packaging_sources = load_packaging_sources()
    retailer_risk = load_retailer_risk_assessment()
    political_landscape = load_political_landscape()
    legislative_forecast = load_legislative_forecast()

    return {
        "last_updated": datetime.now().isoformat(timespec="seconds"),
        "regulatory_calendar": regulations,
        "ingredient_exposure": ingredients,
        "packaging_data_sources": packaging_sources,
        "retailer_risk_assessment": retailer_risk,
        "political_landscape": political_landscape,
        "legislative_forecast": legislative_forecast,
        "summary": summarize(regulations),
    }


def main():
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    data = generate_data()
    out_path = PROCESSED_DIR / "esg_console_data.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Wrote {out_path}")
    print(f"  {data['summary']['total_regulations']} regulations "
          f"({data['summary']['real_confidence_count']} real-confidence)")
    print(f"  {len(data['ingredient_exposure'])} ingredient exposure rows")
    print(f"  {len(data['packaging_data_sources'])} packaging data sources")
    print(f"  {len(data['retailer_risk_assessment'])} retailer risk assessment rows")
    print(f"  {len(data['political_landscape'])} political landscape entities")
    unresearched = sum(1 for f in data['legislative_forecast'] if f['confidence'] == 'gap')
    print(f"  {len(data['legislative_forecast'])} legislative forecast rows "
          f"({unresearched} flagged as not-yet-researched)")


if __name__ == "__main__":
    main()
