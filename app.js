/*
 * ESG Meets CPG — frontend
 * Zero-dependency: fetches data/processed/esg_console_data.json (built by
 * data_pipeline.py) and renders it. No framework, no build step.
 */

function showError(message) {
  var banner = document.getElementById('error-banner');
  banner.textContent = message;
  banner.classList.remove('hidden');
}

function urgencyClass(days) {
  if (days === null) return 'normal';
  if (days < 0) return 'past';
  if (days <= 30) return 'urgent';
  if (days <= 180) return 'soon';
  return 'normal';
}

function fmtDays(days) {
  if (days === null) return 'undated';
  if (days < 0) return Math.abs(days) + 'd ago';
  if (days === 0) return 'today';
  return 'in ' + days + 'd';
}

function renderSummary(summary) {
  var el = document.getElementById('summary-strip');
  var parts = [
    '<strong>' + summary.total_regulations + '</strong> regulations tracked',
    '<strong>' + summary.real_confidence_count + '/' + summary.total_regulations + '</strong> at real confidence'
  ];
  Object.keys(summary.by_jurisdiction).forEach(function (j) {
    parts.push('<strong>' + summary.by_jurisdiction[j] + '</strong> ' + j);
  });
  el.innerHTML = parts.map(function (p) { return '<span>' + p + '</span>'; }).join('');
}

var TRAJECTORY_GLYPH = {
  strengthening: '▲',   // ▲
  weakening: '▼',       // ▼
  rollback: '▼',        // ▼
  stable: '→',          // →
  stable_mixed: '→',    // →
  uncertain_gap: '?',
  not_researched: '?'
};

function trajectoryLine(r) {
  var glyph = TRAJECTORY_GLYPH[r.political_trajectory] || '?';
  var label = (r.political_trajectory || 'not researched').replace(/_/g, ' ');
  var lean = (r.political_lean || 'unresearched').replace(/_/g, ' ');
  return '<span class="traj-glyph">' + glyph + '</span> ' + label + ' &middot; ' + lean + ' control';
}

function renderCalendar(rows) {
  var el = document.getElementById('calendar-table');
  el.innerHTML = rows.map(function (r) {
    var cls = urgencyClass(r.days_until_key_date);
    return '<div class="reg-row ' + cls + '">' +
      '<div class="reg-main">' +
        '<div class="reg-name">' + r.short_name + '</div>' +
        '<div class="reg-detail">' + r.official_title + '</div>' +
        '<span class="badge ' + r.date_status + '">' + r.date_status + ' &middot; ' + r.confidence + '</span>' +
        '<div class="reg-trajectory">' + trajectoryLine(r) + '</div>' +
      '</div>' +
      '<div class="reg-meta">' +
        '<div class="reg-days">' + fmtDays(r.days_until_key_date) + '</div>' +
        '<div>' + r.key_date + '</div>' +
        '<div>' + r.jurisdiction + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderIngredients(rows) {
  var el = document.getElementById('ingredient-table');
  el.innerHTML = rows.map(function (r) {
    return '<div class="ing-card">' +
      '<div class="ing-name">' + r.ingredient + '</div>' +
      '<div class="ing-driver">' + r.regulatory_driver + '</div>' +
      '<div class="ing-alt">' + r.alternative_approach + '</div>' +
    '</div>';
  }).join('');
}

function riskClass(band) {
  if (band === 'moderate') return 'warning';
  if (band === 'elevated' || band === 'highest') return 'critical';
  return 'good'; // lower, low_moderate
}

function riskLabel(band) {
  return band.replace(/_/g, '-');
}

function renderRiskSummary(rows) {
  var el = document.getElementById('risk-summary');
  var counts = {};
  rows.forEach(function (r) {
    counts[r.risk_band] = (counts[r.risk_band] || 0) + 1;
  });
  var order = ['lower', 'low_moderate', 'moderate', 'elevated', 'highest'];
  el.innerHTML = order.filter(function (b) { return counts[b]; }).map(function (b) {
    return '<span><strong>' + counts[b] + '</strong> ' + riskLabel(b) + '</span>';
  }).join('');
}

function renderRisk(rows) {
  renderRiskSummary(rows);
  var el = document.getElementById('risk-table');
  el.innerHTML = rows.map(function (r) {
    var cls = riskClass(r.risk_band);
    var pillars = r.primary_exposure_pillars.split(';').map(function (p) { return p.trim(); });
    return '<div class="risk-row ' + cls + '">' +
      '<div class="risk-main">' +
        '<div class="risk-name">#' + r.rank + ' &middot; ' + r.entity + '</div>' +
        '<div class="risk-detail">' + r.ownership_type.replace(/_/g, ' ') + ' &middot; ' + r.jurisdiction_footprint + '</div>' +
        '<div class="tag-row">' + pillars.map(function (p) { return '<span class="tag">' + p + '</span>'; }).join('') + '</div>' +
        '<div class="risk-evidence">' + r.key_evidence + '</div>' +
        '<div class="risk-actions">' +
          '<div><span class="risk-action-label">Short-term</span>' + r.short_term_action + '</div>' +
          '<div><span class="risk-action-label">Long-term</span>' + r.long_term_action + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="risk-meta">' +
        '<span class="badge ' + cls + '">' + riskLabel(r.risk_band) + '</span>' +
        '<div class="risk-source">' + r.source + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderLandscape(rows) {
  var el = document.getElementById('landscape-table');
  el.innerHTML = rows.map(function (r) {
    return '<div class="landscape-card">' +
      '<div class="landscape-head">' +
        '<span class="landscape-entity">' + r.entity + '</span>' +
        '<span class="landscape-role">' + r.jurisdiction + ' &middot; ' + r.role + '</span>' +
      '</div>' +
      '<div class="landscape-party">' + r.party_or_coalition + ' (' + r.lean.replace(/_/g, ' ') + ') &middot; in power since ' + r.in_power_since + '</div>' +
      '<div class="landscape-stance">' + r.key_stance + '</div>' +
    '</div>';
  }).join('');
}

function renderForecast(rows) {
  var el = document.getElementById('forecast-table');
  el.innerHTML = rows.map(function (r) {
    var isGap = r.confidence === 'gap';
    var glyph = TRAJECTORY_GLYPH[r.trajectory] || '?';
    return '<div class="forecast-card' + (isGap ? ' gap' : '') + '">' +
      '<div class="forecast-head">' +
        '<span class="forecast-id">' + r.regulation_id + '</span>' +
        '<span class="forecast-trajectory">' + glyph + ' ' + r.trajectory.replace(/_/g, ' ') + ' &middot; ' + r.controlling_lean.replace(/_/g, ' ') + '</span>' +
      '</div>' +
      '<div class="forecast-actors">' + r.political_body + ' — ' + r.key_actors + '</div>' +
      '<div class="forecast-evidence">' + r.evidence + '</div>' +
    '</div>';
  }).join('');
}

function renderPackaging(rows) {
  var el = document.getElementById('packaging-table');
  el.innerHTML = rows.map(function (r) {
    return '<div class="pkg-card">' +
      '<a href="' + r.access_url + '" target="_blank" rel="noopener">' + r.dataset_name + '</a>' +
      ' <span style="color:var(--muted-2);">(' + r.jurisdiction + ', ' + r.provider + ')</span>' +
      '<div class="pkg-notes">' + r.notes + '</div>' +
    '</div>';
  }).join('');
}

async function load() {
  try {
    var res = await fetch('data/processed/esg_console_data.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Server responded ' + res.status);
    var data = await res.json();
    renderSummary(data.summary);
    renderCalendar(data.regulatory_calendar);
    renderIngredients(data.ingredient_exposure);
    renderPackaging(data.packaging_data_sources);
    renderRisk(data.retailer_risk_assessment);
    renderLandscape(data.political_landscape);
    renderForecast(data.legislative_forecast);
    document.getElementById('sync-time').textContent = 'Synced ' + data.last_updated;
  } catch (err) {
    console.error(err);
    showError('Could not load esg_console_data.json. Run `python3 data_pipeline.py`, then serve this folder, and reload.');
  }
}

load();
