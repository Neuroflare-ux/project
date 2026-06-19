async function loadCVEs() {
  const feed = document.getElementById('cve-feed');
  const countBadge = document.getElementById('cve-count');

  try {
    const res = await fetch(
      'https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=9&pubStartDate=2026-06-01T00:00:00.000'
    );
    const data = await res.json();
    const cves = data.vulnerabilities || [];

    countBadge.textContent = `${cves.length} recent`;
    feed.innerHTML = '';

    cves.forEach(({ cve }) => {
      const id = cve.id;
      const desc = cve.descriptions.find(d => d.lang === 'en')?.value || 'No description available.';
      const score = cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore
                 || cve.metrics?.cvssMetricV30?.[0]?.cvssData?.baseScore
                 || null;
      const severity = score >= 9 ? 'critical' : score >= 7 ? 'high' : score >= 4 ? 'medium' : 'low';
      const label = score ? severity.toUpperCase() : 'N/A';

      feed.innerHTML += `
        <div class="col-md-6 col-lg-4">
          <div class="cve-card">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="fw-bold text-info">${id}</span>
              <span class="badge badge-${severity}">${label}${score ? ' ' + score : ''}</span>
            </div>
            <p class="small mb-0" style="color: var(--so-muted);">${desc.substring(0, 160)}...</p>
          </div>
        </div>`;
    });
  } catch (err) {
    feed.innerHTML = `<div class="col-12 text-center text-danger py-4">Could not load CVE data. Check your connection.</div>`;
    countBadge.textContent = 'Error';
  }
}

loadCVEs();