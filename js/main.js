function loadCVEs() {
  var feed = document.getElementById('cve-feed');
  var badge = document.getElementById('cve-count');

  // step 1: show saved data immediately
  var saved = localStorage.getItem('home-cves');
  if (saved) {
    renderHomeCVEs(JSON.parse(saved));
  } else {
    feed.innerHTML = '<div class="col-12 text-center py-4"><div class="spinner-border text-info" role="status"></div><p class="mt-2 text-muted small">Loading for the first time...</p></div>';
  }

  // step 2: fetch fresh in background
  fetch('https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=9&pubStartDate=2024-01-01T00:00:00.000')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var fresh = data.vulnerabilities || [];
      if (fresh.length > 0) {
        localStorage.setItem('home-cves', JSON.stringify(fresh));
        renderHomeCVEs(fresh);
      }
    })
    .catch(function() {
      if (!saved) {
        feed.innerHTML = '<div class="col-12 text-center text-muted py-4">CVE data temporarily unavailable.</div>';
      }
    });
}

function renderHomeCVEs(cves) {
  var feed = document.getElementById('cve-feed');
  var badge = document.getElementById('cve-count');
  if (badge) badge.textContent = cves.length + ' loaded';
  var html = '';

  for (var i = 0; i < cves.length; i++) {
    var cve = cves[i].cve;
    var id = cve.id;
    var desc = cve.descriptions[0] ? cve.descriptions[0].value : 'No description.';
    var score = null;
    if (cve.metrics && cve.metrics.cvssMetricV31) {
      score = cve.metrics.cvssMetricV31[0].cvssData.baseScore;
    } else if (cve.metrics && cve.metrics.cvssMetricV30) {
      score = cve.metrics.cvssMetricV30[0].cvssData.baseScore;
    }
    var severity = score >= 9 ? 'critical' : score >= 7 ? 'high' : score >= 4 ? 'medium' : 'low';
    var color = severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : severity === 'medium' ? 'info' : 'secondary';

    html += '<div class="col-md-6 col-lg-4 mb-3">';
    html += '<div class="stat-card p-3 h-100">';
    html += '<div class="d-flex justify-content-between mb-2">';
    html += '<strong class="text-info small">' + id + '</strong>';
    html += '<span class="badge bg-' + color + (color === 'warning' ? ' text-dark' : '') + '">' + severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
    html += '</div>';
    html += '<p class="small text-muted mb-2">' + desc.substring(0, 160) + '...</p>';
    html += '<a href="https://nvd.nist.gov/vuln/detail/' + id + '" target="_blank" class="small text-info">View on NVD →</a>';
    html += '</div></div>';
  }

  feed.innerHTML = html;
}

loadCVEs();