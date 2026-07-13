---
title: "GLFT Market Making Lab"
description: "Finite-horizon market making research with causal execution diagnostics."
date: 2025-09-01
layout: "qrt-study"
url: "/projects/glft-market-making-lab/"
---

<section class="qrt-study__intro" aria-labelledby="glft-study-summary">
  <p class="qrt-study__meta">Market microstructure · 2025</p>
  <div class="qrt-study__intro-copy">
    <h2 id="glft-study-summary">Finite-horizon quoting under execution constraints</h2>
    <p class="qrt-study__lead">Exact GLFT inventory control, kept separate from empirical execution and fill modeling.</p>
    <p>The research lab combines an analytical benchmark with causal BBO and trade replay, explicit placement and cancellation latency, partial fills, approximate queue-ahead, configured fees, markouts, and inverse-contract accounting.</p>
    <p class="qrt-study__source"><a href="https://github.com/333Rosky/glft-market-making-lab" target="_blank" rel="noreferrer">View source on GitHub <span aria-hidden="true">↗</span></a></p>
  </div>
</section>

<section class="qrt-study__evidence" aria-labelledby="glft-theory">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Theoretical benchmark</p>
    <h2 id="glft-theory">Inventory-aware optimal quotes</h2>
    <p>The exact finite-horizon solution adjusts bid and ask distances asymmetrically as inventory moves away from neutral. Near maturity, both distances converge as less time remains to manage inventory.</p>
  </header>

  <div class="qrt-study__figures">
<figure>
<a class="qrt-study__figure-link" href="/images/projects/glft/optimal-quote-distance.png" target="_blank" rel="noreferrer" title="Open full-size optimal quote distance chart">
<img src="/images/projects/glft/optimal-quote-distance.png" alt="Exact GLFT bid and ask quote distances across inventory levels for three times to horizon." width="1600" height="900" loading="lazy" decoding="async">
</a>
<figcaption><strong>Exact inventory skew.</strong> The benchmark uses A=1, k=1, gamma=0.1, sigma=1, mu=0, and Q=5. The risk-increasing quote is disabled at each inventory boundary.</figcaption>
</figure>
  </div>
</section>

<section class="qrt-study__evidence" aria-labelledby="glft-replay">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Execution replay</p>
    <h2 id="glft-replay">Causal market replay</h2>
    <p>Exchange-active quotes are reconstructed after placement and cancellation latency rather than from pre-latency strategy requests. Inventory and marked-to-mid P&amp;L are aligned to the same event clock.</p>
  </header>

  <div class="qrt-study__figures">
<figure>
<a class="qrt-study__figure-link" href="/images/projects/glft/causal-market-replay.png" target="_blank" rel="noreferrer" title="Open full-size causal market replay chart">
<img src="/images/projects/glft/causal-market-replay.png" alt="Ten-minute BTCUSD perpetual replay showing active quotes and fills, inventory, and cumulative net P and L." width="1600" height="900" loading="lazy" decoding="async">
</a>
<figcaption><strong>Ten-minute research replay.</strong> The scenario includes 5 ms placement and cancellation latency, partial fills, approximate BBO queue-ahead, inverse BTC accounting, and configured fees. It is not live performance.</figcaption>
</figure>
  </div>
</section>

<section class="qrt-study__evidence" aria-labelledby="glft-calibration">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Fill model validation</p>
    <h2 id="glft-calibration">Out-of-sample reliability</h2>
    <p>Equal-frequency reliability bins compare a 30-minute September training window with a 30-minute October test window. The visible displacement from perfect calibration is retained: this smoke test diagnoses remaining side-specific model error rather than presenting a polished fit.</p>
  </header>

  <div class="qrt-study__figures">
<figure>
<a class="qrt-study__figure-link" href="/images/projects/glft/oos-fill-calibration.png" target="_blank" rel="noreferrer" title="Open full-size out-of-sample fill calibration chart">
<img src="/images/projects/glft/oos-fill-calibration.png" alt="Out-of-sample reliability curve comparing predicted and observed fill rates for bid and ask episodes." width="1600" height="900" loading="lazy" decoding="async">
</a>
<figcaption><strong>Calibration smoke test.</strong> Confidence intervals use an episode-cluster bootstrap. Labels represent counterfactual BBO fill opportunities with an approximate queue, not observed live-order fills or a full-month validation.</figcaption>
</figure>
  </div>
</section>

<section class="qrt-study__disclosure" aria-labelledby="glft-scope">
  <p class="qrt-study__eyebrow" id="glft-scope">Scope</p>
  <p>These figures document model mechanics, execution assumptions, and validation infrastructure. They do not represent a production strategy or live trading performance.</p>
</section>

<p class="qrt-study__back"><a href="/projects/">&larr; Back to Projects</a></p>
