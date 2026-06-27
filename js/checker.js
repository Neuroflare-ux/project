var cveDatabase = [
  {
    id: "CVE-2024-21762",
    score: 9.8,
    severity: "critical",
    published: "2024-02-09",
    product: "Fortinet FortiOS",
    keywords: ["fortinet", "fortios"],
    desc: "Out-of-bounds write allowing unauthenticated RCE via HTTP. Actively exploited against cloud-exposed VPN appliances."
  },
  {
    id: "CVE-2024-3400",
    score: 10.0,
    severity: "critical",
    published: "2024-04-12",
    product: "Palo Alto PAN-OS",
    keywords: ["palo alto", "panos", "pan-os", "globalprotect"],
    desc: "Command injection in GlobalProtect Gateway allowing unauthenticated RCE. Exploited in the wild."
  },
  {
    id: "CVE-2024-6387",
    score: 8.1,
    severity: "high",
    published: "2024-07-01",
    product: "OpenSSH",
    keywords: ["openssh", "ssh", "linux"],
    desc: "Race condition allowing unauthenticated RCE on Linux servers. Affects millions of cloud-hosted instances."
  },
  {
    id: "CVE-2024-21893",
    score: 8.2,
    severity: "high",
    published: "2024-01-31",
    product: "Ivanti Connect Secure",
    keywords: ["ivanti"],
    desc: "SSRF in the SAML component allowing access to restricted resources. Exploited against enterprise VPN infrastructure."
  },
  {
    id: "CVE-2024-23897",
    score: 9.8,
    severity: "critical",
    published: "2024-01-24",
    product: "Jenkins",
    keywords: ["jenkins", "ci/cd", "cicd"],
    desc: "Arbitrary file read via CLI leading to RCE. Directly impacts CI/CD pipelines in cloud DevOps environments."
  },
  {
    id: "CVE-2024-27198",
    score: 9.8,
    severity: "critical",
    published: "2024-03-04",
    product: "JetBrains TeamCity",
    keywords: ["teamcity", "jetbrains"],
    desc: "Authentication bypass giving unauthenticated admin access. Targeted cloud-hosted CI/CD servers."
  },
  {
    id: "CVE-2024-4577",
    score: 9.8,
    severity: "critical",
    published: "2024-06-09",
    product: "PHP-CGI",
    keywords: ["php", "windows server", "windows"],
    desc: "Argument injection on Windows allowing RCE without authentication. Affects cloud-hosted PHP apps on Windows."
  },
  {
    id: "CVE-2024-38063",
    score: 9.8,
    severity: "critical",
    published: "2024-08-13",
    product: "Windows TCP/IP",
    keywords: ["windows", "windows server"],
    desc: "RCE via IPv6 packets requiring no authentication. Affects Windows VMs on AWS, Azure, and GCP."
  },
  {
    id: "CVE-2024-1708",
    score: 8.4,
    severity: "high",
    published: "2024-02-21",
    product: "ConnectWise ScreenConnect",
    keywords: ["connectwise"],
    desc: "Path traversal enabling RCE. Exploited against managed service providers running cloud infrastructure."
  },
  {
    id: "CVE-2024-20767",
    score: 9.1,
    severity: "critical",
    published: "2024-03-18",
    product: "Adobe ColdFusion",
    keywords: ["coldfusion", "adobe"],
    desc: "Improper access control allowing unauthenticated file read and code execution on cloud-hosted web apps."
  },
  {
    id: "CVE-2024-29824",
    score: 9.6,
    severity: "critical",
    published: "2024-05-22",
    product: "Ivanti EPM",
    keywords: ["ivanti"],
    desc: "SQL injection in Core server allowing unauthenticated RCE on endpoint management systems."
  },
  {
    id: "CVE-2023-44487",
    score: 7.5,
    severity: "high",
    published: "2023-10-10",
    product: "HTTP/2",
    keywords: ["http/2", "http2", "nginx", "apache"],
    desc: "HTTP/2 Rapid Reset DDoS attack. Affects nginx, Apache, and cloud load balancers."
  },
  {
    id: "CVE-2024-21626",
    score: 8.6,
    severity: "high",
    published: "2024-01-31",
    product: "runc / Docker",
    keywords: ["docker", "kubernetes", "container", "runc"],
    desc: "Container escape allowing breakout from Docker/Kubernetes containers onto the host system."
  },
  {
    id: "CVE-2024-0519",
    score: 8.8,
    severity: "high",
    published: "2024-01-16",
    product: "Google Chrome V8",
    keywords: ["chrome", "browser"],
    desc: "Out-of-bounds memory access in V8 engine. Affects browser-based cloud admin consoles."
  },
  {
    id: "CVE-2024-30078",
    score: 8.8,
    severity: "high",
    published: "2024-06-11",
    product: "Windows Wi-Fi Driver",
    keywords: ["windows", "windows server"],
    desc: "RCE via Wi-Fi packets. Affects Windows cloud VMs and hybrid cloud workstations."
  }
];

var selectedTech = [];

function toggleTech(el) {
  el.classList.toggle('selected');
  var tech = el.getAttribute('data-tech').toLowerCase();
  var idx = selectedTech.indexOf(tech);
  if (idx === -1) {
    selectedTech.push(tech);
  } else {
    selectedTech.splice(idx, 1);
  }
}

function runAssessment() {
  var stack = selectedTech.slice();

  var custom = document.getElementById('custom-tech').value;
  if (custom.trim()) {
    var extras = custom.split(',');
    for (var i = 0; i < extras.length; i++) {
      var t = extras[i].trim().toLowerCase();
      if (t) stack.push(t);
    }
  }

  if (stack.length === 0) {
    alert('Please select or enter at least one technology.');
    return;
  }

  var matches = [];
  for (var i = 0; i < cveDatabase.length; i++) {
    var cve = cveDatabase[i];
    var matched = false;
    for (var j = 0; j < cve.keywords.length; j++) {
      if (matched) break;
      for (var k = 0; k < stack.length; k++) {
        if (stack[k].indexOf(cve.keywords[j]) !== -1 || cve.keywords[j].indexOf(stack[k]) !== -1) {
          matches.push(cve);
          matched = true;
          break;
        }
      }
    }
  }

  showResults(matches);
}

function showResults(matches) {
  var critical = 0, high = 0, medium = 0;
  for (var i = 0; i < matches.length; i++) {
    if (matches[i].severity === 'critical') critical++;
    else if (matches[i].severity === 'high') high++;
    else medium++;
  }

  document.getElementById('res-critical').textContent = critical;
  document.getElementById('res-high').textContent = high;
  document.getElementById('res-medium').textContent = medium;
  document.getElementById('res-total').textContent = matches.length;

  var label = document.getElementById('risk-label');
  if (critical > 0) {
    label.textContent = '🔴 Critical Risk — Immediate action required';
    label.className = 'badge fs-6 px-4 py-2 bg-danger';
  } else if (high > 0) {
    label.textContent = '🟡 High Risk — Review and patch soon';
    label.className = 'badge fs-6 px-4 py-2 bg-warning text-dark';
  } else if (matches.length > 0) {
    label.textContent = '🟢 Moderate Risk — Monitor and plan patches';
    label.className = 'badge fs-6 px-4 py-2 bg-info text-dark';
  } else {
    label.textContent = '✅ No known CVEs matched your stack';
    label.className = 'badge fs-6 px-4 py-2 bg-success';
  }

  var html = '';
  if (matches.length === 0) {
    html = '<div class="col-12"><p class="text-muted">No vulnerabilities found matching your stack. Check the Threat Intel page for the full CVE list.</p></div>';
  }

  for (var i = 0; i < matches.length; i++) {
    var c = matches[i];
    var color = c.severity === 'critical' ? 'danger' : c.severity === 'high' ? 'warning' : 'info';
    var textDark = color === 'warning' ? ' text-dark' : '';

    html += '<div class="col-md-6 mb-3">';
    html += '<div class="stat-card p-3 h-100">';
    html += '<div class="d-flex justify-content-between align-items-start mb-2">';
    html += '<strong class="text-info small">' + c.id + '</strong>';
    html += '<span class="badge bg-' + color + textDark + '">' + c.severity.toUpperCase() + ' ' + c.score + '</span>';
    html += '</div>';
    html += '<p class="small text-muted mb-1" style="font-size:0.75rem;">📦 ' + c.product + ' &nbsp;|&nbsp; 📅 ' + c.published + '</p>';
    html += '<p class="small text-muted mb-2">' + c.desc + '</p>';
    html += '<a href="https://nvd.nist.gov/vuln/detail/' + c.id + '" target="_blank" class="small text-info">View on NVD →</a>';
    html += '</div></div>';
  }

  document.getElementById('findings-list').innerHTML = html;
  document.getElementById('assessment-results').style.display = 'block';
  document.getElementById('assessment-results').scrollIntoView({ behavior: 'smooth' });
}

function resetAssessment() {
  document.getElementById('assessment-results').style.display = 'none';
  document.querySelectorAll('.tech-check.selected').forEach(function(el) {
    el.classList.remove('selected');
  });
  selectedTech = [];
  document.getElementById('custom-tech').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}