var cloudCVEs = [
  {
    id: "CVE-2024-21762",
    score: 9.8,
    severity: "critical",
    published: "2024-02-09",
    product: "Fortinet FortiOS",
    desc: "Out-of-bounds write vulnerability allowing unauthenticated remote code execution via specially crafted HTTP requests. Actively exploited in cloud-exposed VPN appliances."
  },
  {
    id: "CVE-2024-3400",
    score: 10.0,
    severity: "critical",
    published: "2024-04-12",
    product: "Palo Alto PAN-OS",
    desc: "Command injection in GlobalProtect Gateway allowing unauthenticated RCE. Exploited in the wild against cloud-connected firewall deployments."
  },
  {
    id: "CVE-2024-6387",
    score: 8.1,
    severity: "high",
    published: "2024-07-01",
    product: "OpenSSH (regreSSHion)",
    desc: "Race condition in signal handler allowing unauthenticated RCE on Linux servers. Affects millions of cloud-hosted Linux instances running OpenSSH."
  },
  {
    id: "CVE-2024-21893",
    score: 8.2,
    severity: "high",
    published: "2024-01-31",
    product: "Ivanti Connect Secure",
    desc: "SSRF vulnerability in the SAML component allowing access to restricted backend resources. Exploited against enterprise cloud VPN infrastructure."
  },
  {
    id: "CVE-2024-23897",
    score: 9.8,
    severity: "critical",
    published: "2024-01-24",
    product: "Jenkins CI/CD",
    desc: "Arbitrary file read through the CLI leading to RCE on build servers. Directly impacts CI/CD pipelines widely used in cloud DevOps environments."
  },
  {
    id: "CVE-2024-27198",
    score: 9.8,
    severity: "critical",
    published: "2024-03-04",
    product: "JetBrains TeamCity",
    desc: "Authentication bypass allowing unauthenticated attackers to gain admin access. Targeted cloud-hosted CI/CD servers used by software teams."
  },
  {
    id: "CVE-2024-4577",
    score: 9.8,
    severity: "critical",
    published: "2024-06-09",
    product: "PHP-CGI (Windows)",
    desc: "Argument injection on Windows allowing RCE without authentication. Affects cloud-hosted PHP applications running on Windows Server environments."
  },
  {
    id: "CVE-2024-38063",
    score: 9.8,
    severity: "critical",
    published: "2024-08-13",
    product: "Windows TCP/IP",
    desc: "RCE triggered by sending IPv6 packets to Windows servers. Affects Windows cloud VMs on AWS, Azure, and GCP with IPv6 enabled."
  },
  {
    id: "CVE-2024-1708",
    score: 8.4,
    severity: "high",
    published: "2024-02-21",
    product: "ConnectWise ScreenConnect",
    desc: "Path traversal enabling RCE on affected servers. Exploited against managed service providers operating cloud infrastructure for clients."
  }
];

function renderHomeCVEs(cves) {
  var feed = document.getElementById('cve-feed');
  var badge = document.getElementById('cve-count');
  if (badge) badge.textContent = cves.length + ' threats';
  var html = '';

  for (var i = 0; i < cves.length; i++) {
    var c = cves[i];
    var color = c.severity === 'critical' ? 'danger' : c.severity === 'high' ? 'warning' : 'info';
    var textDark = color === 'warning' ? ' text-dark' : '';

    html += '<div class="col-md-6 col-lg-4 mb-3">';
    html += '<div class="stat-card p-3 h-100">';
    html += '<div class="d-flex justify-content-between mb-2">';
    html += '<strong class="text-info small">' + c.id + '</strong>';
    html += '<span class="badge bg-' + color + textDark + '">' + c.severity.toUpperCase() + ' ' + c.score + '</span>';
    html += '</div>';
    html += '<p class="small text-muted mb-1" style="font-size:0.75rem;">📦 ' + c.product + ' &nbsp;|&nbsp; 📅 ' + c.published + '</p>';
    html += '<p class="small text-muted mb-2">' + c.desc + '</p>';
    html += '<a href="https://nvd.nist.gov/vuln/detail/' + c.id + '" target="_blank" class="small text-info">View on NVD →</a>';
    html += '</div></div>';
  }

  feed.innerHTML = html;
}

renderHomeCVEs(cloudCVEs);