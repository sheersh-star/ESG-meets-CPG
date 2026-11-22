# Product Life Cycle Manifest — methodology

## What this layer is

73 UK retail categories, grouped into the 13 aisles a shopper actually walks. Each one carries two diagrams, embedded verbatim from the two decks they were authored in:

- **As-is**: the baseline swim-lane map — six stages (Sourcing, Processing, Packaging, Delivery, Retail, Use), one actor and one card of text per stage, then a two-way fork at the end: what happens after normal use, versus what happens if the product expires in store or goes unused at home.
- **To-be**: a sustainability-redesigned companion for the same category and the same stage shape, with a practical change at each stage, a "Receipt" (a data point, its source and quality tier, and the action it triggers) in place of the as-is hotspot line, and a category-lead sign-off in the footer instead of "to be verified."

Both diagrams are the decks' own markup and connector-arrow SVGs, not redrawn — `deck.css` and `deck-tobe.css` are the decks' own stylesheets (the to-be one scoped under `.tb`/`.pr` so its identically-named classes don't collide with the as-is deck's on the same page), scaled to fit any screen width via `.slide-frame`/`.slide-canvas` and `slide-scale.js`.

## Source and status

The as-is deck is a hand-authored retail-category model (a 73-slide deck, one diagram per category, in the same aisle order as this manifest), not from a live regulatory or retailer data source. The to-be deck is a separate, later companion grounded in the "My Sustainability Beliefs" one-page playbook (practice before paper; receipts, not reports; agents do the mechanical half; people keep the judgment) — its own thesis/principles/shared-layer/limits framing lives in the deck itself, not reproduced here.

**Qualitative and illustrative, not supplier data** — every category shares the same six-stage shape by design in both decks, so this is a reasoning scaffold for where packaging and food-waste exposure sits in a category's path (as-is) and where a practical, receipt-backed change could sit (to-be), not a measured or audited account of any real supplier's actual process. Each diagram's own caveat text (surfaced as a field note beneath it) repeats this plainly.

## Why it's here

The rest of this console answers *what's regulated and when*. This layer answers *where in a product's life the regulation actually bites, and what changing it in practice would look like* — the end-of-life fork is deliberately the one branch every as-is category has in common, because that's where most of the packaging-recovery and food-waste questions the regulatory calendar and ingredient-exposure tables raise actually get decided; the to-be fork shows the same decision point redesigned.

## Known limitation

No category here is tied to a specific retailer, supplier or SKU — pairing a real supplier's packaging spec or a real retailer's reported waste-diversion rate against a given category's fork would turn this from illustrative into verifiable, and is the natural next step if real data becomes available. The to-be deck's own "limits" slide states the same honestly: no impact figures yet, agents lower the cost of knowing and acting rather than cutting emissions themselves, and the agentic-sustainability evidence base itself is still unsettled. See `docs/data_sources.md` for the same caveat applied to the regulatory layer.
