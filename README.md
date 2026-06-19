# SecureOps Dashboard

A cloud security posture monitoring web application built with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5.

## Project Overview

SecureOps Dashboard helps developers and small teams identify cloud misconfigurations, track live CVE vulnerabilities, and respond to security incidents with guided playbooks.

**Real-world problem:** Most small teams deploying to AWS/GCP/Azure don't know if their storage buckets are public, IAM roles are over-permissioned, or firewall rules are dangerously open. This dashboard surfaces exactly that.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — live CVE threat feed |
| `threat-intel.html` | Filterable CVE vulnerability table |
| `cloud-checker.html` | Cloud security self-assessment scoring tool |
| `attack-surface.html` | Visual attack vector map with tooltips |
| `playbooks.html` | Incident response step-by-step guides |
| `blog.html` | Security articles and breach case studies |
| `tools.html` | Curated open-source security tools |
| `contact.html` | Secure contact/report form |

## Technologies

- HTML5 (semantic markup)
- CSS3 (custom properties, flexbox, grid)
- JavaScript ES6+ (Fetch API, DOM manipulation)
- Bootstrap 5.3
- NIST NVD API (live CVE data, no key required)

## Features

- Live CVE feed pulled from NIST National Vulnerability Database
- Cloud security posture scoring calculator (20-question checklist)
- Dark/light mode toggle
- Filterable threat intelligence table
- JS-validated contact form

## Running Locally

No build step required. Open `index.html` in any modern browser.

```bash
git clone https://github.com/YOUR_USERNAME/secureops-dashboard.git
cd secureops-dashboard
open index.html
