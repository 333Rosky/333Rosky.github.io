---
title: "ENS / QRT Data Challenge"
description: "Current result and validation framework from an ongoing asset-allocation forecasting competition."
date: 2026-06-01
layout: "qrt-study"
url: "/projects/qrt-data-challenge/"
---

<section class="qrt-study__intro" aria-labelledby="qrt-study-summary">
  <p class="qrt-study__meta">Ongoing competition · 2026</p>
  <div class="qrt-study__intro-copy">
    <h2 id="qrt-study-summary">Asset Allocation Sign Forecasting</h2>
    <p class="qrt-study__lead">Structure-aware forecasting from anonymized allocation panels.</p>
    <p>The current system combines an allocation-level ensemble with target-free reconstruction of masked temporal relationships. Structural predictions are used only when reciprocal evidence and global consistency checks provide sufficient support.</p>
  </div>
</section>

<section class="qrt-study__metrics" aria-label="Current competition standing">
  <div class="qrt-study__metric">
    <p>Current standing</p>
    <strong>8 <span>/ 1,426</span></strong>
  </div>
  <div class="qrt-study__metric">
    <p>Public score</p>
    <strong>0.5472</strong>
  </div>
</section>

<section class="qrt-study__evidence" aria-labelledby="qrt-study-method">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Current approach</p>
    <h2 id="qrt-study-method">Target-free temporal constraints</h2>
    <p>The anonymized date identifiers are not treated as a chronological sequence. Instead, the current framework searches for supported relationships between masked panels, builds a globally consistent temporal graph, and falls back to the allocation-level model outside structurally supported regions.</p>
  </header>

  <ul class="qrt-study__points">
    <li>Allocation-level ensemble for the baseline directional signal</li>
    <li>Reciprocal, target-free matching between masked date panels</li>
    <li>Global rejection of inconsistent temporal offsets and collisions</li>
  </ul>
</section>

<section class="qrt-study__evidence" aria-labelledby="qrt-study-validation">
  <header class="qrt-study__section-head">
    <p class="qrt-study__eyebrow">Validation protocol</p>
    <h2 id="qrt-study-validation">Support-aware masked cohorts</h2>
    <p>Model selection uses multiple target-free cohorts chosen to resemble the test support rather than a numerical walk-forward over shuffled date labels. Candidates must remain positive across cohorts and pass date-clustered uncertainty and support-transfer checks before promotion.</p>
  </header>

  <ul class="qrt-study__points">
    <li>Test-support matching without access to validation targets</li>
    <li>Date-clustered bootstrap instead of row-level confidence</li>
    <li>Explicit rejection gates for worst-cohort loss and support shift</li>
  </ul>
</section>

<section class="qrt-study__disclosure" aria-labelledby="qrt-study-disclosure">
  <p class="qrt-study__eyebrow" id="qrt-study-disclosure">Disclosure</p>
  <p>Feature definitions, model weights, graph thresholds, reconstruction rules, submission artifacts, and source code remain private until the competition closes.</p>
</section>

<p class="qrt-study__back"><a href="/projects/">&larr; Back to Projects</a></p>
