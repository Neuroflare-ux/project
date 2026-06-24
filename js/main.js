async function loadCVEs() {
  var feed = document.getElementById('cve-feed');
  var badge = document.getElementById('cve-count');

  try {
    var offset = Math.floor(Math.random() * 2000);
    var url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=9&startIndex=' + offset;
    var res = await fetch(url);
    var data = await res.json();
    var cves = data.vulnerabilities || [];

    if (cves.length === 0) throw new Error('empty');

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
      var severity = 'low';
      if (score >= 9) severity = 'critical';
      else if (score >= 7) severity = 'high';
      else if (score >= 4) severity = 'medium';
      var color = severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : severity === 'medium' ? 'info' : 'secondary';

      html += '<div class="col-md-6 col-lg-4 mb-3">';
      html += '<div class="stat-card p-3">';
      html += '<div class="d-flex justify-content-between mb-2">';
      html += '<strong class="text-info small">' + id + '</strong>';
      html += '<span class="badge bg-' + color + (color === 'warning' ? ' text-dark' : '') + '">';
      html += severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
      html += '</div>';
      html += '<p class="small text-muted mb-0">' + desc.substring(0, 160) + '...</p>';
      html += '</div></div>';
    }

    feed.innerHTML = html;

  } catch (err) {
    feed.innerHTML = '<div class="col-12 text-center text-muted py-4">CVE data temporarily unavailable. <a href="https://nvd.nist.gov" target="_blank" class="text-info">Visit NIST directly</a></div>';
    if (badge) badge.textContent = 'unavailable';
  }
}

loadCVEs();