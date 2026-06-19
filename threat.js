var allCVEs = [];

async function loadThreats() {
  var container = document.getElementById('cve-table');
  try {
    var res = await fetch('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=20&pubStartDate=2026-06-01T00:00:00.000');
    var data = await res.json();
    allCVEs = data.vulnerabilities || [];
    renderCVEs(allCVEs);
  } catch (err) {
    container.innerHTML = '<p class="text-danger">Failed to load data.</p>';
  }
}

function renderCVEs(list) {
  var container = document.getElementById('cve-table');
  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted">No results.</p>';
    return;
  }
  var html = '<div class="row">';
  for (var i = 0; i < list.length; i++) {
    var cve = list[i].cve;
    var id = cve.id;
    var desc = cve.descriptions[0] ? cve.descriptions[0].value : 'No description.';
    var score = null;
    if (cve.metrics && cve.metrics.cvssMetricV31) {
      score = cve.metrics.cvssMetricV31[0].cvssData.baseScore;
    }
    var severity = 'low';
    if (score >= 9) severity = 'critical';
    else if (score >= 7) severity = 'high';
    else if (score >= 4) severity = 'medium';

    html += '<div class="col-md-6 mb-3 cve-item" data-severity="' + severity + '">';
    html += '<div class="stat-card p-3">';
    html += '<div class="d-flex justify-content-between mb-2">';
    html += '<strong class="text-info">' + id + '</strong>';
    html += '<span class="badge bg-' + (severity === 'critical' ? 'danger' : severity === 'high' ? 'warning text-dark' : severity === 'medium' ? 'info text-dark' : 'secondary') + '">' + severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
    html += '</div>';
    html += '<p class="small text-muted mb-0">' + desc.substring(0, 180) + '...</p>';
    html += '</div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function filterCVEs(severity) {
  if (severity === 'all') {
    renderCVEs(allCVEs);
  } else {
    var filtered = allCVEs.filter(function(item) {
      var score = null;
      if (item.cve.metrics && item.cve.metrics.cvssMetricV31) {
        score = item.cve.metrics.cvssMetricV31[0].cvssData.baseScore;
      }
      var s = 'low';
      if (score >= 9) s = 'critical';
      else if (score >= 7) s = 'high';
      else if (score >= 4) s = 'medium';
      return s === severity;
    });
    renderCVEs(filtered);
  }
}

loadThreats();