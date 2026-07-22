# 5. Risk Assessment

| UE ID | Risk Statement | Likelihood | Impact | Risk Score |
|---|---|---|---|---|
| UE-01 | Scope creep delays project delivery. | 4 | 4 | 16 |
| UE-02 | Manifest V3 API changes break extension functionality. | 2 | 5 | 10 |
| UE-03 | Third-party AI/data API rate limits are exceeded, blocking V2 features. | 3 | 3 | 9 |
| UE-04 | Third-party API latency causes a poor user experience. | 4 | 3 | 12 |
| UE-05 | Third-party API outages render V2 features unavailable. | 2 | 4 | 8 |
| UE-06 | Local Chrome storage API keys are accessed by a malicious script. | 2 | 5 | 10 |

---

# 6. Risk Prioritization

| Priority | UE ID | Risk Score |
|---|---|---|
| 1 | UE-01 | 16 |
| 2 | UE-04 | 12 |
| 3 | UE-02 | 10 |
| 4 | UE-06 | 10 |
| 5 | UE-03 | 9 |
| 6 | UE-05 | 8 |

---

# 7. Risk Mitigation

| UE ID | Risk Mitigation | Classification |
|---|---|---|
| UE-01 | Implement fixed V1/V2 feature boundaries and defer new ideas to later versions. | Pure Software |
| UE-02 | Pin to documented MV3 APIs and validate the manifest via CI checks. | Pure Software |
| UE-03 | Implement response caching and fallback to V1 deterministic ranking. | Pure Software |
| UE-04 | Enforce strict timeout thresholds and one-retry limits before falling back to V1. | Pure Software |
| UE-05 | Ensure graceful architectural fallback to offline V1 ranking when services fail. | Pure Software |
| UE-06 | Store keys only in `chrome.storage.local` and exclude from source control. | Pure Software |

---

# 8. Functional Requirements

| Requirement ID | Level-2 Capability | Functional Requirement |
|---|---|---|
| FR-1.1.1 | Configure Trip | The Configuration Module shall execute airport autocomplete within 100 milliseconds. |
| FR-1.1.2 | Configure Trip | The Configuration Module shall manage stopover length limits within 1 to 14 days. |
| FR-2.1.1 | Interactive Flight Radar | The Radar Module shall plot candidate flight paths within the canvas context. |
| FR-2.1.2 | Interactive Flight Radar | The Radar Module shall perform active coordinate updates within one radar sweep cycle. |
| FR-3.1.1 | Stopover Deals | The Search Engine shall calculate Haversine detours within 1 second. |
| FR-3.1.2 | Stopover Deals | The Search Engine shall perform deal ranking within the offline database bounds. |
| FR-4.1.1 | AeroAI Stopover Assistant | The AeroAI Assistant shall fetch visa requirements within a 5-second timeout limit. |
| FR-4.1.2 | AeroAI Stopover Assistant | The AeroAI Assistant shall execute layover itinerary generation within the third-party API limits. |
| FR-4.1.3 | AeroAI Stopover Assistant | The AeroAI Assistant shall manage automatic fallback to V1 ranking within 1 second of API failure. |

---

# 9. Quality Requirements

- **Performance**: The extension popup shall render in under 200ms.
- **Reliability**: The offline search engine shall compute correct Haversine distances 100% of the time.
- **Availability**: The core V1 offline functionality shall be available 100% of the time when the extension is active.
- **Maintainability**: The codebase shall maintain modular vanilla JavaScript files without requiring a build step.
- **Usability**: The extension UI shall provide dark mode and glassmorphism styling for all panels.
- **Security**: The extension shall read API keys from local storage only and never expose them in network requests other than to the authorized third-party APIs.
- **Portability**: The extension shall function seamlessly on Chrome OS, Windows, and macOS Chrome installations.
- **AI Explainability**: The AeroAI Assistant shall indicate when AI is used to generate itineraries or recommendations.
- **Testability**: The V1 and V2 ranking algorithms shall be testable via deterministic offline inputs.

---

# 10. Performance Requirements

- **Maximum response time**: Airport autocomplete shall respond in under 100ms.
- **Memory usage**: The extension shall use less than 50MB of RAM during active radar rendering.
- **CPU utilization**: The interactive flight radar canvas shall use less than 10% CPU on standard desktop hardware.
- **AI inference latency**: External LLM API calls shall complete or trigger a timeout fallback within 5 seconds.

---

# 11. Assumptions

- Users have Google Chrome or a Chromium-based browser installed.
- Users are capable of providing their own API keys for the AI and weather services to enable V2 features.
- The bundled offline airport database covers the required routing points accurately.
- Stopover policies for airlines (e.g., Icelandair, TAP Portugal, Copa, Emirates) remain substantially similar to current policies.

---

# 12. Constraints

- **Programming language**: Vanilla JavaScript, HTML, CSS.
- **Framework**: No bundlers or external JavaScript frameworks (zero-dependency).
- **Extension Standard**: Manifest V3 API only.
- **Storage**: Must use `chrome.storage.local` for settings and keys.
- **External API**: Relies on user-provided keys for third-party AI and Weather endpoints.
