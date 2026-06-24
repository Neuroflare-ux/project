var allCVEs = [];

async function loadThreats() {
  var container = document.getElementById('cve-table');
  try {
    var offset = Math.floor(Math.random() * 2000);
    var url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=20&startIndex=' + offset;
    var res = await fetch(url);
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
    } else if (cve.metrics && cve.metrics.cvssMetricV30) {
      score = cve.metrics.cvssMetricV30[0].cvssData.baseScore;
    }
    var severity = 'low';
    if (score >= 9) severity = 'critical';
    else if (score >= 7) severity = 'high';
    else if (score >= 4) severity = 'medium';
    var color = severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : severity === 'medium' ? 'info' : 'secondary';

    html += '<div class="col-md-6 mb-3">';
    html += '<div class="stat-card p-3">';
    html += '<div class="d-flex justify-content-between mb-2">';
    html += '<strong class="text-info small">' + id + '</strong>';
    html += '<span class="badge bg-' + color + (color === 'warning' ? ' text-dark' : '') + '">' + severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
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
      } else if (item.cve.metrics && item.cve.metrics.cvssMetricV30) {
        score = item.cve.metrics.cvssMetricV30[0].cvssData.baseScore;
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