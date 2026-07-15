# LayoverNow

A Chrome extension (Manifest V3) that helps travelers turn an ordinary flight connection into a free, planned stopover. Enter an origin, destination, departure date, and desired stopover length, and LayoverNow surfaces routes whose layover cities are worth stopping in.

The project is built around legitimate airline stopover programs (Icelandair, TAP Portugal, Copa, Emirates). It does not implement hidden-city or skiplagging routes.

---

## Features

**Configure Trip.** Autocomplete origin and destination fields backed by an offline airport database, a departure date picker, and a slider to set stopover length from 1 to 14 days.

**Interactive Flight Radar.** A canvas-based tracker that plots candidate flight paths and active coordinates.

**Stopover Deals.** Results ranked by Best Value, Savings, or Minimum Detour.

**AeroAI Stopover Assistant.** Visa requirements and transit guidance, currency and weather context, day-by-day layover itinerary generation, and a conversational assistant for transport, hotels, and layover questions.

---

## Project structure

```
LayoverNow/
├── manifest.json         # Extension metadata, permissions, icons config
├── popup.html            # Popup UI structure
├── popup.css             # Dark mode and glassmorphism styling
├── popup.js              # UI controller, autocomplete, radar canvas, booking links
├── airports.js           # Offline airport code and coordinate database
├── search.js             # Haversine detour math and stopover hub scoring
├── advisor.js            # AeroAI guidance and chat responder engine
├── generate_icons.js     # Icon asset generation (Node)
├── generate_icons.ps1    # Icon asset generation (PowerShell)
├── icons/                # 16x16, 48x48, 128x128 extension icons
└── .gitignore            # Excluded files, including local API keys
```

---

## Installation

No build step. The project is vanilla JavaScript with no bundler or dependencies.

1. Clone the repository:
   ```bash
   git clone https://github.com/pranavapp2024-sys/LayoverNow.git
   cd LayoverNow
   ```
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the `LayoverNow` folder.
5. Pin the extension to your toolbar and open it.

### API keys

The AeroAI Assistant and live context features call external APIs. Keys are read from `chrome.storage.local` and are never committed.

| Key | Purpose |
|---|---|
| `aiApiKey` | AeroAI Assistant (external LLM API) |
| `weatherApiKey` | Weather in the trip context panel |

If a key is missing, the affected feature degrades and the extension falls back to deterministic ranking. The core search runs fully offline and requires no keys.

---

## Configuration Management

This section documents how the project is version controlled and how changes are proposed, reviewed, and released.

### Repository

| Item | Value |
|---|---|
| Host | GitHub |
| Repository | `pranavapp2024-sys/LayoverNow` |
| Default branch | `main` |
| Instructor access | Granted as a collaborator |

`main` holds stable, system-tested code. Development happens on branches.

### Branching model

| Branch | Purpose |
|---|---|
| `main` | Stable, system-tested code |
| `feature/<name>` | New functionality, branched from `main`, merged via pull request |
| `fix/<name>` | Bug fixes against `main` |

Feature branches are short-lived and scoped to one logical unit of work, for example `feature/aeroai-advisor`.

### Commit conventions

One logical change per commit. Messages use a conventional prefix:

| Prefix | Used for |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fixes |
| `docs` | Documentation only |
| `test` | Test additions or changes |
| `chore` | Icons, config, housekeeping |
| `ci` | CI workflow changes |

Example:

```
feat(v2): add AeroAI Advisor module with LLM integration
fix: correct Haversine calculation for antimeridian crossings
docs: add V2 test plan
```

### Change control process

1. Branch from an up-to-date `main`.
2. Commit in logical units with conventional messages.
3. Push the branch and open a pull request into `main`.
4. The PR states what changed, what was tested, and any new risk introduced.
5. CI must pass before merge.
6. Merge with a merge commit so branch history stays visible.
7. Delete the branch after merge.

### Versioning and releases

The project ships in two system-tested versions. Each version is built, fully system tested, and only then tagged.

| Tag | Version | Capability |
|---|---|---|
| `v1.0.0` | V1 | Deterministic layover finder. Airport search, Haversine detour engine, static stopover-program scoring, flight radar, booking link generation. Fully offline. |
| `v2.0.0` | V2 | Adds the AeroAI Advisor (AI-assisted layover evaluation) and live trip context (visa, currency, weather). Falls back to V1 ranking when a service is unavailable. |

Tagging a release:

```bash
git checkout main
git pull
git tag -a v1.0.0 -m "V1: deterministic layover finder, offline"
git push origin v1.0.0
```

The `version` field in `manifest.json` is bumped in the same commit as the tag so the installed extension reports the correct version. Each tag is published as a GitHub Release with notes describing what changed.

### Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request. It lints the JavaScript source and validates that `manifest.json` parses. A failing check blocks the merge.

---

## Testing

Each version is built and fully system tested before the next version begins.

**V1 testing** is deterministic and repeatable, run entirely offline. It covers routing math, autocomplete behavior, ranking output, and booking link generation.

**V2 testing** adds every V1 regression path plus API latency, rate limits, malformed or missing responses, cache behavior, and graceful fallback to V1 ranking when a service is unavailable. Chrome DevTools offline mode is used to force the fallback path.

---

## Risks

| Risk | Version | Mitigation |
|---|---|---|
| Scope creep | Project-wide | Fixed V1/V2 feature boundaries; new ideas deferred to a later version |
| Manifest V3 API changes | V1 | Pin to documented MV3 APIs; CI validates the manifest |
| Third-party AI and data API dependency: rate limits, key cost, latency, outages | **V2-specific** | Response caching, one retry, automatic fallback to V1 deterministic ranking |

---

## Development notes

Developed in Google Antigravity, an agentic IDE, in accordance with class policy on AI tool use. Prompts used during development are kept in `docs/prompts/`. Design decisions, version planning, risk identification, and review were performed by the author.
