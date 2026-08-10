# Changelog

All notable changes to LayoverNow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Planned: Hotel booking integration via Booking.com API
- Planned: Multi-city trip planner
- Planned: Export itinerary to PDF

---

## [1.0.0] - 2024-10-20

### Added
- 🛫 **Flight Stopover Search** — Real-time search for stopover flights via Amadeus API
- 🗺️ **Interactive Radar Map** — Canvas-based animated flight route visualization
- 💰 **Deal Filtering** — Three algorithms: Best Value, Maximum Savings, Minimum Detour
- 🤖 **AeroAI Assistant** — AI-powered chatbot for visa, weather, currency, transport, and itinerary advice
- 🌙 **Premium Dark UI** — Glassmorphism design with smooth animations
- 📦 **Chrome Web Store** — Published and approved for public distribution
- 🔒 **Privacy-First Design** — All data stored locally, zero server logging, explicit consent flow
- ⚡ **Low Power Mode** — Automatic performance degradation on budget devices
- 🔄 **Graceful Degradation** — Mock data fallback when APIs are unavailable
- 📝 **Comprehensive Documentation** — README, Contributing Guide, Architecture docs

### Security
- API keys hidden behind proxy server (never in client code)
- Content Security Policy compliant with Manifest V3
- No eval() or remote code execution
- Minimal permissions (activeTab, storage only)

---

## [0.9.0] - 2024-10-13

### Added
- Beta testing with 5 classmates
- Performance optimization for canvas rendering
- Static tip database for 50 common layover cities
- Auto-enable Low Power Mode on <4GB RAM devices

### Fixed
- Canvas memory leak in animation loop
- CORS errors on certain flight API endpoints
- Airport autocomplete not matching partial codes

### Changed
- Cache TTL reduced from 24 hours to 4 hours for flight deals
- AI response timeout reduced from 30s to 10s

---

## [0.8.0] - 2024-10-06

### Added
- GitHub Actions CI pipeline (linting, manifest validation, security scan)
- Automated release workflow with tag-based triggers
- CONTRIBUTING.md with branching strategy and commit conventions
- docs/ folder with SETUP.md and ARCHITECTURE.md

### Fixed
- Service worker lifecycle issues in Manifest V3
- chrome.storage migration from localStorage complete

---

## [0.7.0] - 2024-09-29

### Added
- Feature freeze enforcement and MoSCoW prioritization
- "Refresh" button for manual deal updates
- "Prices cached at [timestamp]" disclaimer
- Privacy policy page and consent checkbox

### Changed
- Scope explicitly limited to Chrome for semester deliverable
- Cross-browser support deferred to post-semester

---

## [0.6.0] - 2024-09-22

### Added
- Node.js/Express proxy server deployed to Render
- Multi-tier API fallback (Primary -> Secondary -> Mock data)
- Chrome Web Store submission and approval
- Error monitoring and audit logging

### Fixed
- CORS policy blocking direct API calls from extension
- Manifest V3 offscreen document implementation for canvas

---

## [0.5.0] - 2024-09-15

### Added
- Airport dataset validation against FAA/IATA sources
- Coordinate bounds-checking for route plotting
- LLM API timeout and retry logic with exponential backoff
- Static fallback tip cards for AI unavailability

### Changed
- Switched from localStorage to chrome.storage.local for MV3 compliance

---

## [0.4.0] - 2024-09-08

### Added
- Basic flight search API integration
- Canvas radar map with bezier curve path drawing
- Deal sorting heuristics (Best Value, Savings, Minimum Detour)
- Airport autocomplete with IATA code matching

### Fixed
- Initial CORS issues discovered during API prototyping

---

## [0.3.0] - 2024-09-01

### Added
- Project structure setup (manifest.json, popup.html, popup.css, popup.js)
- Airport geolocation database (airports.js)
- Basic UI layout with dark theme
- Git repository initialization

---

## [0.2.0] - 2024-08-26

### Added
- Product Requirements Document (PRD) with MoSCoW prioritization
- Risk management analysis (6 major risks identified)
- Technology stack selection and API research
- Wireframes and UI mockups

---

## [0.1.0] - 2024-08-20

### Added
- Project concept and market research
- Competitor analysis (Google Flights, Skyscanner, Kayak)
- Initial feature brainstorming
- GitHub repository created

---

## Release Notes Template

When creating a new release, use this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

---

## Version History

| Version | Date | Codename | Status |
|---------|------|----------|--------|
| 1.0.0 | 2024-10-20 | Takeoff | 🟢 Stable |
| 0.9.0 | 2024-10-13 | Beta | 🟡 Beta |
| 0.8.0 | 2024-10-06 | Hardening | 🟡 Beta |
| 0.7.0 | 2024-09-29 | Polish | 🟡 Beta |
| 0.6.0 | 2024-09-22 | Integration | 🟠 Alpha |
| 0.5.0 | 2024-09-15 | Core Dev | 🟠 Alpha |
| 0.4.0 | 2024-09-08 | Prototype | 🔴 Pre-alpha |
| 0.3.0 | 2024-09-01 | Setup | 🔴 Pre-alpha |
| 0.2.0 | 2024-08-26 | Planning | 🔴 Pre-alpha |
| 0.1.0 | 2024-08-20 | Concept | 🔴 Pre-alpha |
