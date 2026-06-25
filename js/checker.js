// --- TOOL 1: Mozilla Observatory ---
function runObservatory() {
  var input = document.getElementById('obs-url').value.trim();
  if (!input) return;

  var host = input.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  var status = document.getElementById('obs-status');
  var result = document.getElementById('obs-result');
  var error = document.getElementById('obs-error');

  result.style.display = 'none';
  error.style.display = 'none';
  status.style.display = 'block';
  status.textContent = 'Triggering scan for ' + host + '...';

  var apiBase = 'https://http-observatory.security.mozilla.org/api/v1';

  fetch(apiBase + '/analyze?host=' + host, { method: 'POST' })
    .then(function(res) { return res.json(); })
    .then(function() {
      status.textContent = 'Scan running — fetching results...';
      pollResults(apiBase, host, 0);
    })
    .catch(function() {
      status.style.display = 'none';
      error.style.display = 'block';
      error.textContent = 'Could not reach Mozilla Observatory. Try a different domain.';
    });
}

function pollResults(apiBase, host, attempts) {
  if (attempts > 10) {
    document.getElementById('obs-status').style.display = 'none';
    document.getElementById('obs-error').style.display = 'block';
    document.getElementById('obs-error').textContent = 'Scan timed out. Try again.';
    return;
  }
  fetch(apiBase + '/analyze?host=' + host)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.state === 'FINISHED') {
        showObsResults(data, host, apiBase);
      } else {
        setTimeout(function() {
          pollResults(apiBase, host, attempts + 1);
        }, 2000);
      }
    });
}

function showObsResults(data, host, apiBase) {
  document.getElementById('obs-status').style.display = 'none';

  var score = data.score || 0;
  var grade = data.grade || 'N/A';
  var gradeColor = score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-danger';

  document.getElementById('obs-grade').textContent = grade;
  document.getElementById('obs-grade').className = gradeColor;
  document.getElementById('obs-score').textContent = score;

  fetch(apiBase + '/getScanResults?scan=' + data.scan_id)
    .then(function(res) { return res.json(); })
    .then(function(tests) {
      var passed = 0;
      var failed = 0;
      var html = '<div class="row">';

      for (var key in tests) {
        var t = tests[key];
        if (t.pass) passed++; else failed++;
        var icon = t.pass ? '✅' : '❌';
        var scoreColor = t.score_modifier > 0 ? 'text-success' : t.score_modifier < 0 ? 'text-danger' : 'text-muted';

        html += '<div class="col-md-6 mb-2">';
        html += '<div class="stat-card p-2">';
        html += '<div class="d-flex justify-content-between">';
        html += '<span class="small">' + icon + ' ' + t.name + '</span>';
        html += '<span class="small ' + scoreColor + '">' + (t.score_modifier > 0 ? '+' : '') + t.score_modifier + '</span>';
        html += '</div>';
        html += '<p class="small text-muted mb-0" style="font-size:0.75rem;">' + t.score_description + '</p>';
        html += '</div></div>';
      }

      html += '</div>';
      document.getElementById('obs-passed').textContent = passed;
      document.getElementById('obs-failed').textContent = failed;
      document.getElementById('obs-tests').innerHTML = html;

      var link = document.getElementById('obs-link');
      link.href = 'https://observatory.mozilla.org/analyze/' + host;
      link.textContent = 'observatory.mozilla.org/analyze/' + host;

      document.getElementById('obs-result').style.display = 'block';
    });
}

// --- TOOL 2: CVE Keyword Search ---
function searchCVE() {
  var keyword = document.getElementById('cve-search').value.trim();
  if (!keyword) return;

  var container = document.getElementById('cve-search-result');
  container.innerHTML = '<p class="text-muted small">Searching NIST for "' + keyword + '"...</p>';

  var url = 'https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=' + encodeURIComponent(keyword) + '&resultsPerPage=6';

  fetch(url)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var cves = data.vulnerabilities || [];
      if (cves.length === 0) {
        container.innerHTML = '<p class="text-muted small">No CVEs found for "' + keyword + '".</p>';
        return;
      }

      var html = '<p class="text-muted small mb-3">Found ' + data.totalResults + ' CVEs for "' + keyword + '" — showing top ' + cves.length + '</p>';
      html += '<div class="row">';

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

        html += '<div class="col-md-6 mb-3">';
        html += '<div class="stat-card p-3">';
        html += '<div class="d-flex justify-content-between mb-1">';
        html += '<strong class="text-info small">' + id + '</strong>';
        html += '<span class="badge bg-' + color + (color === 'warning' ? ' text-dark' : '') + '">' + severity.toUpperCase() + (score ? ' ' + score : '') + '</span>';
        html += '</div>';
        html += '<p class="small text-muted mb-0">' + desc.substring(0, 160) + '...</p>';
        html += '</div></div>';
      }

      html += '</div>';
      container.innerHTML = html;
    })
    .catch(function() {
      container.innerHTML = '<p class="text-danger small">Could not reach NIST. Check your connection.</p>';
    });
}