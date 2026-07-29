# Mitigate UE-5.3-01: AI hallucinated itinerary details

## Context
LayoverNow is a Manifest V3 Chrome extension (vanilla JavaScript). The V2 AeroAI Advisor
(advisor.js) calls an external LLM to assess layovers and generate itinerary details for a
stopover city. The risk (UE-5.3-01): the model can produce confident but false itinerary
information — wrong visa rules, non-existent attractions, impossible timing, transit that does
not exist — and the user may plan around it as if it were verified.

The goal is not to make the model perfect. It is to prevent unverified AI output from reaching
the user as if it were fact, and to make the deterministic V1 data the source of truth for
anything checkable.

## Design principle
Separate two kinds of information:
- HARD FACTS (checkable): layover duration, whether the stopover fits the layover window,
  visa requirement category, currency, distance/detour, season. These come from V1's
  deterministic data and bundled datasets — never from the AI.
- SOFT SUGGESTIONS (advisory): "you could visit X", "this is enough time to leave the airport".
  These may come from the AI but must be clearly labeled and constraint-checked.

The AI is never allowed to override a hard fact. If the AI output contradicts a hard fact,
the hard fact wins and the AI claim is suppressed.

## Tasks

1. Constrain the request (advisor.js)
   - Build the prompt so the model receives the known hard facts as given inputs: layover
     hours, IATA codes, city, season, visa category (from bundled data), and currency.
   - Instruct the model to work only within those facts, to suggest activities only if they
     plausibly fit the layover window, and to return a machine-checkable structure, not prose.
   - Require the model to return strict JSON:
     {
       "feasibility": "recommended" | "tight" | "not_worth_it",
       "reasoning": string,
       "suggestions": [ { "activity": string, "est_duration_hours": number } ],
       "confidence": "high" | "medium" | "low"
     }
   - Instruct the model to set confidence "low" and return an empty suggestions array when it
     is unsure, rather than guessing. Tell it explicitly: do not invent specific place names,
     opening hours, prices, visa rules, or transit lines.

2. Validate the AI output against deterministic checks (new: lib/validateAdvice.js)
   - Parse the JSON. If it does not parse or is missing fields, discard it entirely and fall
     back to the V1 deterministic verdict.
   - Reject any suggestion whose est_duration_hours, plus a fixed airport buffer, exceeds the
     actual layover window. Timing is a hard fact; the AI does not get to violate it.
   - Cross-check feasibility against V1: if V1's deterministic score says the layover is too
     short to leave the airport but the AI says "recommended", downgrade to "tight" and note
     the disagreement.
   - Never display visa, currency, or duration values that came from the AI. Always render
     those from the bundled/V1 data, even if the AI restated them.

3. Signal uncertainty in the UI (popup.js)
   - Show the deterministic V1 verdict and score alongside the AI verdict, always, so the user
     sees the checkable answer next to the advisory one.
   - Label the AI section clearly as AI-generated and advisory, e.g. "AI suggestion — verify
     before you rely on it."
   - When confidence is "low" or the suggestions array is empty, show only the deterministic
     result and a short note that the AI did not have enough to add, instead of thin filler.
   - For any visa or entry claim, render a fixed disclaimer that visa rules must be confirmed
     with the airline or an official source. Never present a visa outcome as settled.

4. Fail safe
   - Any error, timeout, unparseable response, or failed validation results in the V1
     deterministic result being shown on its own. The user must never get a blank panel or a
     raw model error, and must never get an unvalidated AI claim.

5. Tests (docs/TEST_PLAN.md + a test fixture)
   - Feed the validator canned AI responses: valid, malformed JSON, a suggestion that overruns
     the layover window, an AI "recommended" that contradicts a V1 "too short", and a
     low-confidence empty response. Assert the validator suppresses or downgrades each one
     correctly and that hard facts always come from V1.
   - This is metamorphic-style testing: the same trip with a shorter layover must never yield a
     more optimistic feasibility. Add that as an assertion.

## Constraints
- Vanilla JavaScript, no framework.
- Hard facts (duration, visa category, currency, distance) come only from deterministic data.
- The AI may never override a hard fact or be the sole source of a checkable value.
- Every AI-sourced element in the UI is visibly labeled as AI-generated and advisory.
- Commit as: feat(v2): validate and ground AI itinerary output to mitigate UE-5.3-01

## Acceptance criteria
- With a normal trip, the panel shows the V1 verdict and score plus a clearly labeled AI
  section.
- When the AI returns a suggestion that does not fit the layover window, it is suppressed and
  does not appear.
- When the AI contradicts V1 on feasibility, the displayed verdict is the safer of the two and
  the disagreement is noted.
- With the AI forced to error or return junk, only the deterministic V1 result renders, with no
  raw error.
- Visa and currency shown in the UI always trace to bundled/V1 data, never to the AI response.

---

## Resulting LLM Prompt

```text
You are the AeroAI Stopover Advisor. You must generate an itinerary based ONLY on the following hard facts:
Layover Hub: {city} ({hubIata})
Layover Window: {layoverHours} hours
Season: {season}
Visa Category: {visaCategory}
Currency: {currency}

Constraints:
1. Suggest activities that plausibly fit within the layover window ({layoverHours} hours).
2. Do not invent specific place names, opening hours, prices, transit lines, or visa rules.
3. If you are unsure, set confidence to "low" and return an empty suggestions array instead of guessing.

You must return a machine-checkable strict JSON object with this exact structure:
{
  "feasibility": "recommended" | "tight" | "not_worth_it",
  "reasoning": "Brief explanation",
  "suggestions": [
    { "activity": "string", "est_duration_hours": number }
  ],
  "confidence": "high" | "medium" | "low"
}
```
