# SecureOps Dashboard

A cloud security awareness and vulnerability assessment web application built with HTML5, CSS3, JavaScript, and Bootstrap 5.

## Project Overview

SecureOps Dashboard helps developers and organisations identify which vulnerabilities affect their cloud environment, track real CVEs, and respond to security incidents with guided playbooks.

**Real-world problem:** Most small teams deploying to AWS/GCP/Azure don't know if the software they run has active vulnerabilities. This dashboard lets teams input their tech stack and see exactly which CVEs affect them — matched against a curated database of real cloud-relevant vulnerabilities.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — curated CVE feed with severity badges |
| `threat-intel.html` | Filterable CVE table by severity |
| `cloud-checker.html` | Tech stack selector matched against real CVE database |
| `playbooks.html` | Step-by-step incident response guides |
| `blog.html` | Real breach case studies and cloud security guides |
| `tools.html` | Curated open-source security tools by category |
| `contact.html` | Security concern report form with JS validation |

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid)
- JavaScript ES6 (DOM manipulation, localStorage)
- Bootstrap 5.3
- CVE data sourced from NIST NVD

## Features

- Curated CVE feed of real cloud-relevant vulnerabilities with severity scoring
- Tech stack security assessment — select your technologies and see matching CVEs
- Filterable threat intelligence table by severity level
- Six incident response playbooks covering common cloud attacks
- JS-validated contact and report form
- Responsive design across desktop, tablet, and mobile

## Running Locally

No build step required. Open `index.html` in any modern browser.

```bash
git clone https://github.com/Neuroflare-ux/project.git
cd project
open index.html
```

## Author

[Your Name] — [Your Student ID]