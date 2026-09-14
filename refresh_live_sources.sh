#!/bin/bash
# Live data re-pull commands for the ESG Console.
#
# This machine's Claude sandbox has no outbound network access (confirmed:
# curl and Python's urllib both time out from inside a session). Run this
# script yourself, in your own terminal, to actually pull fresh data —
# then hand the output files back to Claude to fold into data/raw/.
#
# Each block is independent; run only the ones you need.

set -e

echo "=== EUR-Lex SPARQL: EUDR (32023R1115) current consolidated status ==="
curl -s -G "http://publications.europa.eu/webapi/rdf/sparql" \
  --data-urlencode 'query=PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
SELECT ?work ?title ?date WHERE {
  ?work cdm:resource_legal_id_celex "32023R1115" .
  ?work cdm:work_title ?title .
  OPTIONAL { ?work cdm:work_date_document ?date }
} LIMIT 10' \
  -H "Accept: application/sparql-results+json" \
  -o eudr_status.json
echo "Wrote eudr_status.json"

echo ""
echo "=== UK NPWD packaging recovery/recycling summary ==="
echo "No confirmed direct-download URL yet — open this in a browser and export manually:"
echo "  https://npwd.environment-agency.gov.uk/Public/PublicSummaryData.aspx"

echo ""
echo "=== Trase open data (commodity deforestation exposure) ==="
echo "No confirmed bulk API — open this in a browser and download manually:"
echo "  https://trase.earth/open-data"

echo ""
echo "=== EFRAG ESRS 2026 datapoint list ==="
echo "Free download requires visiting EFRAG's site directly (form/mirror sites vary):"
echo "  https://www.efrag.org/en/news-and-calendar/news/efrag-secretariat-releases-2026-draft-list-of-datapoints-for-revised-esrs"

echo ""
echo "Done. Drop any downloaded files into data/raw/ and tell Claude what you got —"
echo "it'll fold them into regulatory_calendar.csv / ingredient_exposure.csv / packaging_data_sources.csv"
echo "and re-run: python3 data_pipeline.py"
