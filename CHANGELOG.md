# Changelog

All notable changes to LayoverNow will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-08-10

### Added
- Flight stopover search with real-time API integration
- Interactive radar map with canvas-based route visualization
- Deal filtering (Best Value, Savings, Minimum Detour)
- AeroAI chatbot assistant with static fallback
- Premium dark glassmorphism UI
- Chrome Web Store submission ready (Manifest V3)
- Privacy-first design with chrome.storage.local
- Graceful degradation with mock data fallback
- Low Power Mode for budget devices

### Security
- API keys hidden behind proxy server (never in client code)
- Content Security Policy compliant with Manifest V3
- No eval() or remote code execution
- Minimal permissions (activeTab, storage)

## [0.9.0] - 2026-08-03

### Added
- Beta testing with classmates
- Performance optimization for canvas rendering
- Static tip database for 50 common layover cities

### Fixed
- Canvas memory leak in animation loop
- CORS errors on certain flight API endpoints

## [0.8.0] - 2026-07-27

### Added
- Feature freeze enforcement and MoSCoW prioritization
- Refresh button for manual deal updates
- Cache timestamp disclaimer

## [0.7.0] - 2026-07-20

### Added
- Node.js/Express proxy server deployed to Render
- Multi-tier API fallback (Primary -> Secondary -> Mock)
- Chrome Web Store submission

## [0.6.0] - 2026-07-13

### Added
- Airport dataset validation against FAA/IATA sources
- LLM API timeout and retry logic
- Graceful degradation for AI unavailability

## [0.5.0] - 2026-07-06

### Added
- Basic flight search API integration
- Canvas radar map with bezier curve path drawing
- Deal sorting heuristics

## [0.4.0] - 2026-06-29

### Added
- Project structure setup (manifest.json, popup.html, popup.js)
- Airport geolocation database
- Basic UI layout with dark theme

## [0.3.0] - 2026-06-22

### Added
- Product Requirements Document (PRD) with MoSCoW prioritization
- Risk management analysis (6 major risks identified)

## [0.2.0] - 2026-06-15

### Added
- Project concept and market research
- Competitor analysis
- Initial feature brainstorming

## [0.1.0] - 2026-06-08

### Added
- GitHub repository created
- Initial README
- Technology stack selection
