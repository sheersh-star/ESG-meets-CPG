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

function renderCalendar(rows) {
  var el = document.getElementById('calendar-table');
  el.innerHTML = rows.map(function (r) {
    var cls = urgencyClass(r.days_until_key_date);
    return '<div class="reg-row ' + cls + '">' +
      '<div class="reg-main">' +
        '<div class="reg-name">' + r.short_name + '</div>' +
        '<div class="reg-detail">' + r.official_title + '</div>' +
        '<span class="badge ' + r.date_status + '">' + r.date_status + ' &middot; ' + r.confidence + '</span>' +
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
    document.getElementById('sync-time').textContent = 'Synced ' + data.last_updated;
  } catch (err) {
    console.error(err);
    showError('Could not load esg_console_data.json. Run `python3 data_pipeline.py`, then serve this folder, and reload.');
  }
}

load();
