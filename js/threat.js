var allCVEs = [];

function loadThreats() {
  var container = document.getElementById('cve-table');

  // step 1: show saved data immediately if we have it
  var saved = localStorage.getItem('threat-cves');
  if (saved) {
    allCVEs = JSON.parse(saved);
    renderCVEs(allCVEs);
  } else {
    container.innerHTML = '<div class="text-center py-4"><div class="spinner-border text-info" role="status"></div><p class="mt-2 text-muted small">Loading for the first time...</p></div>';
  }

  // step 2: fetch fresh data in background regardless
  fetch('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=20&pubStartDate=2024-01-01T00:00:00.000')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var fresh = data.vulnerabilities || [];
      if (fresh.length > 0) {
        allCVEs = fresh;
        localStorage.setItem('threat-cves', JSON.stringify(fresh));
        localStorage.setItem('threat-cves-time', new Date().toISOString());
        renderCVEs(allCVEs);
      }
    })
    .catch(function() {
      // if fetch fails, saved data is already showing — nothing to do
    });
}

function renderCVEs(list) {
  var container = document.getElementById('cve-table');
  var lastUpdated = localStorage.getItem('threat-cves-time');

  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted">No results.</p>';
    return;
  }

  var html = '';

  if (lastUpdated) {
    html += '<p class="text-muted small mb-3">Last updated: ' + new Date(lastUpdated).toLocaleString() + '</p>';
  }

  html += '<div class="row">';
  for (var i = 0; i < list.length; i++) {
    var cve = list[i].cve;
    var id = cve.id;
    var desc = cve.descriptions[0] ? cve.descriptions[0].value : 'No description.';
    var published = cve.published ? cve.published.substring(0, 10) : '';
    var score = null;

    if (cve.metrics && cve.metrics.cvssMetricV31) {
      score = cve.metrics.cvssMetricV31[0].cvssData.baseScore;
    } else if (cve.metrics && cve.metrics.cvssMetricV30) {
      score = cve.metrics.cvssMetricV30[0].cvssData.baseScore;
    }

    var severity = 'low';
    if (score >= 9) severity = 'critical';
    else if (score >= 7) severity = 'high';
    else if (score >= 4) severity = 'medium';

    var color = severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : severity === 'medium' ? 'info' : 'secondary';
    var textDark = color === 'warning' ? ' text-dark' : '';

    html += '<div class="col-md-6 mb-3">';
    html += '<div class="stat-card p-3 h-100">';
    html += '<div class="d-flex justify-content-between align-items-start mb-2">';
    html += '<strong class="text-info small">' + id + '</strong>';
    html += '<span class="badge bg-' + color + textDark + '">' + severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
    html += '</div>';
    html += '<p class="small text-muted mb-2">' + desc.substring(0, 200) + '...</p>';
    html += '<div class="d-flex justify-content-between align-items-center">';
    html += '<span class="small text-muted">📅 ' + published + '</span>';
    html += '<a href="https://nvd.nist.gov/vuln/detail/' + id + '" target="_blank" class="small text-info">View on NVD →</a>';
    html += '</div>';
    html += '</div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function filterCVEs(severity) {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.classList.remove('active-filter');
  });
  event.target.classList.add('active-filter');

  if (severity === 'all') {
    renderCVEs(allCVEs);
  } else {
    var filtered = allCVEs.filter(function(item) {
      var score = null;
      if (item.cve.metrics && item.cve.metrics.cvssMetricV31) {
        score = item.cve.metrics.cvssMetricV31[0].cvssData.baseScore;
      } else if (item.cve.metrics && item.cve.metrics.cvssMetricV30) {
        score = item.cve.metrics.cvssMetricV30[0].cvssData.baseScore;
      }
      var s = score >= 9 ? 'critical' : score >= 7 ? 'high' : score >= 4 ? 'medium' : 'low';
      return s === severity;
    });
    renderCVEs(filtered);
  }
}

loadThreats();