# Product Life Cycle Manifest — methodology

## What this layer is

73 UK retail categories, grouped into the 13 aisles a shopper actually walks, each traced from sourcing through end of life: six stages (Sourcing, Processing, Packaging, Delivery, Retail, Use), one actor and one line of text per stage, then a two-way fork at the end — what happens after normal use, versus what happens if the product expires in store or goes unused at home.

## Source and status

Built from a hand-authored retail-category model (originally produced as a 73-slide product-lifecycle deck, one diagram per category, in the same aisle order as this manifest), not from a live regulatory or retailer data source. **Qualitative and illustrative, not supplier data** — every category shares the same six-stage shape by design, so it's a reasoning scaffold for where packaging and food-waste exposure sits in a category's path, not a measured or audited account of any real supplier's actual process. Each category's own caveat text repeats this plainly in the UI.

## Why it's here

The rest of this console answers *what's regulated and when*. This layer answers *where in a product's life the regulation actually bites* — the end-of-life fork is deliberately the one branch every category has in common, because that's where most of the packaging-recovery and food-waste questions the regulatory calendar and ingredient-exposure tables raise actually get decided (markdown and donation vs. landfill; recycling-stream routing vs. residual waste).

## Known limitation

No category here is tied to a specific retailer, supplier or SKU — pairing a real supplier's packaging spec or a real retailer's reported waste-diversion rate against a given category's fork would turn this from illustrative into verifiable, and is the natural next step if real data becomes available. See `docs/data_sources.md` for the same caveat applied to the regulatory layer.
