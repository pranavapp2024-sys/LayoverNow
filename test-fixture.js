const { validateAdvice } = require('./lib/validateAdvice.js');

const layoverHours = 8;
const v1Feasibility = "tight";

const testCases = [
  {
    name: "1. Valid Response",
    aiResponse: JSON.stringify({
      feasibility: "tight",
      reasoning: "Good enough for a quick tour.",
      suggestions: [{ activity: "Quick walk", est_duration_hours: 4 }],
      confidence: "high",
      visa: "Should be free",
      currency: "USD"
    }),
    check: (res) => res !== null && res.suggestions.length === 1 && res.visa === undefined && res.currency === undefined
  },
  {
    name: "2. Malformed JSON",
    aiResponse: "{ bad json",
    check: (res) => res === null
  },
  {
    name: "3. Missing Fields",
    aiResponse: JSON.stringify({
      reasoning: "Missing feasibility",
      confidence: "high"
    }),
    check: (res) => res === null
  },
  {
    name: "4. Overrunning Duration",
    aiResponse: JSON.stringify({
      feasibility: "tight",
      reasoning: "Do it all!",
      suggestions: [
        { activity: "Museum", est_duration_hours: 5 },
        { activity: "Dinner", est_duration_hours: 3 }
      ],
      confidence: "high"
    }),
    // Available hours = 8 - 2 = 6. Museum (5) fits, Dinner (3) doesn't.
    check: (res) => res !== null && res.suggestions.length === 1 && res.suggestions[0].activity === "Museum"
  },
  {
    name: "5. Contradicting V1",
    aiResponse: JSON.stringify({
      feasibility: "recommended", // AI optimistic
      reasoning: "Highly recommended!",
      suggestions: [{ activity: "Park", est_duration_hours: 2 }],
      confidence: "high"
    }),
    // Should be downgraded to "tight"
    check: (res) => res !== null && res.feasibility === "tight" && res.disagreement === true
  },
  {
    name: "6. Low Confidence",
    aiResponse: JSON.stringify({
      feasibility: "recommended",
      reasoning: "I guess you could...",
      suggestions: [{ activity: "Park", est_duration_hours: 2 }],
      confidence: "low"
    }),
    check: (res) => res !== null && res.suggestions.length === 0 && res.feasibility === "tight"
  }
];

let failed = 0;
console.log("Running validator tests...\n");

testCases.forEach(tc => {
  const result = validateAdvice(tc.aiResponse, layoverHours, v1Feasibility);
  if (tc.check(result)) {
    console.log(`✅ ${tc.name}`);
  } else {
    console.log(`❌ ${tc.name} failed! Result:`, result);
    failed++;
  }
});

// Metamorphic test
console.log("\nRunning metamorphic test...");
const aiBase = {
  feasibility: "recommended",
  reasoning: "Great",
  suggestions: [],
  confidence: "high"
};
const resLong = validateAdvice(JSON.stringify(aiBase), 24, "recommended");
const resShort = validateAdvice(JSON.stringify(aiBase), 4, "not_worth_it");

const getScore = (f) => f === "recommended" ? 2 : (f === "tight" ? 1 : 0);

if (getScore(resShort.feasibility) <= getScore(resLong.feasibility)) {
  console.log(`✅ Metamorphic: Shorter layover (${resShort.feasibility}) is not more optimistic than longer (${resLong.feasibility}).`);
} else {
  console.log(`❌ Metamorphic test failed!`);
  failed++;
}

if (failed === 0) {
  console.log("\n🎉 All tests passed!");
} else {
  console.log(`\n⚠️ ${failed} tests failed.`);
  process.exit(1);
}
