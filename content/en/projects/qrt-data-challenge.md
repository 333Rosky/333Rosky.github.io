---
title: "ENS / QRT Data Challenge"
description: "Validation evidence from an ongoing asset-allocation forecasting competition."
date: 2026-06-01
layout: "qrt-study"
url: "/projects/qrt-data-challenge/"
---

<section class="qrt-study__intro" aria-labelledby="qrt-study-summary">
  <p class="qrt-study__meta">Ongoing competition · 2026</p>
  <div class="qrt-study__intro-copy">
    <h2 id="qrt-study-summary">Asset Allocation Forecasting</h2>
    <p class="qrt-study__lead">Directional forecasting from anonymized time-series and tabular data.</p>
    <p>The public write-up is intentionally limited while the competition remains active. The figures below expose validation behavior without publishing the feature set, model configuration, post-processing logic, or code.</p>
  </div>
</section>

<section class="qrt-study__evidence" aria-labelledby="qrt-study-evidence">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Validation evidence</p>
    <h2 id="qrt-study-evidence">Out-of-fold signal stability</h2>
    <p>Both figures use sequential out-of-fold predictions and a fixed 0.50 decision threshold. They are derived from local validation only; submission-level diagnostics are excluded.</p>
  </header>

  <div class="qrt-study__figures">
<figure>
<a class="qrt-study__figure-link" href="/images/projects/qrt/walk-forward-validation.png" target="_blank" rel="noreferrer" title="Open full-size walk-forward chart">
<img src="/images/projects/qrt/walk-forward-validation.png" alt="Walk-forward accuracy across five sequential validation folds, each above the 50 percent baseline." width="1618" height="896" loading="lazy" decoding="async">
</a>
<figcaption><strong>Walk-forward accuracy.</strong> All five sequential validation folds remain above the 50% baseline, ranging from 51.99% to 54.66%.</figcaption>
</figure>
<figure>
<a class="qrt-study__figure-link" href="/images/projects/qrt/confidence-decile-hit-rate.png" target="_blank" rel="noreferrer" title="Open full-size confidence-decile chart">
<img src="/images/projects/qrt/confidence-decile-hit-rate.png" alt="Out-of-fold hit rate by prediction-confidence decile, rising to 59.54 percent in the highest decile." width="1618" height="896" loading="lazy" decoding="async">
</a>
<figcaption><strong>Confidence separation.</strong> Hit rate increases with prediction confidence and reaches 59.54% in the highest decile.</figcaption>
</figure>
  </div>
</section>

<section class="qrt-study__disclosure" aria-labelledby="qrt-study-disclosure">
  <p class="qrt-study__eyebrow" id="qrt-study-disclosure">Disclosure</p>
  <p>Feature definitions, model architecture, training configuration, post-processing, and source code remain private until the competition closes.</p>
</section>

<p class="qrt-study__back"><a href="/projects/">&larr; Back to Projects</a></p>
