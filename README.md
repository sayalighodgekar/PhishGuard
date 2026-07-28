# DualShield Cybersecurity Awareness Platform

[![Status](https://img.shields.io/badge/status-stable-55eda8)](#)
[![Frontend](https://img.shields.io/badge/frontend-vanilla%20HTML%2FCSS%2FJS-34d9ff)](#)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Safety](https://img.shields.io/badge/safety-browser--only-green)](#educational-disclaimer)

## A Dual-Mode Cybersecurity Framework for Phishing Attack Simulation and Defensive Mechanism Evaluation

DualShield is a static, browser-only cybersecurity awareness platform created as a Final Year Project. It uses fictional phishing messages and predefined outcomes to explain how social engineering appears, why warning signs matter, and how layered defenses reduce risk.

No backend, database, account, credential input, network request, analytics service, or external framework is used.

## Features

- Responsive cybersecurity-themed landing page
- Fictional SMS and email awareness lab
- Staged phishing-indicator explanations
- Exclusive Secure and Vulnerable environments
- Animated, reusable educational timelines
- Mode-aware security status and simulated scores
- Security Operations Center analysis dashboard
- Risk matrix, SVG metric rings, CSS charts, and terminal replay
- Printable simulation report and downloadable text summary
- Keyboard-accessible controls and reduced-motion support
- Installable web-app manifest and custom 404 page

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Inline SVG and CSS-native visualizations
- Browser `Blob` API for local report download

## Project Structure

```text
.
├── index.html
├── 404.html
├── style.css
├── script.js
├── favicon.svg
├── manifest.json
├── README.md
├── LICENSE
├── .gitignore
└── assets/
    ├── icons/
    └── images/
```

## Installation

No build process is required.

```bash
git clone https://github.com/your-username/dualshield.git
cd dualshield
```

Open `index.html` directly or serve the directory with a static development server such as the VS Code Live Server extension.

## Usage

1. Review the fictional SMS or email scenario.
2. Reveal and study the phishing indicators.
3. Select Secure Mode or Vulnerable Mode.
4. Continue to the visual-only simulation.
5. Review the educational outcome and SOC dashboard.
6. Print the report or download the locally generated text summary.

## Deployment

### GitHub Pages

Push the repository to GitHub, open **Settings → Pages**, and deploy from the root of the default branch.

### Netlify

Drag the project directory into Netlify Drop or connect the repository. Use the repository root as the publish directory; no build command is needed.

### Vercel

Import the repository as a static project. Leave the build command empty and use `.` as the output directory.

All runtime references are relative, so the project works from repository subpaths.

## Screenshots

Add final screenshots before portfolio publication:

- `docs/screenshots/homepage.png`
- `docs/screenshots/simulation.png`
- `docs/screenshots/security-modes.png`
- `docs/screenshots/soc-dashboard.png`

## Educational Disclaimer

DualShield is strictly an educational awareness simulator. All people, organizations, messages, accounts, events, telemetry, and outcomes are fictional. It does not perform phishing, collect credentials, execute malware, scan networks, access cookies, persist sensitive data, or transmit information.

## Future Improvements

- Additional accessible themes
- Optional keyboard shortcut guide
- Expanded fictional scenarios
- Automated accessibility and performance testing
- Localization for additional languages

## License

Licensed under the [MIT License](LICENSE).

## Author

**Project Developer**  
Institution: _Institution Name_  
Supervisor: _Supervisor Name_  
GitHub: [your-username](https://github.com/your-username)
