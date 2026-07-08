// Layover Now - AeroAI Advisor Reasoning Engine & Database
// Processes selected flight parameters and generates customized travel dossiers, itineraries, and Q&A responses.

const ADVISOR_DATA = {
  // ICELAND (KEF)
  "KEF": {
    country: "Iceland",
    visaStatus: "Transit-Free (US/Schengen)",
    visaDesc: "US, Canadian, and UK citizens enjoy visa-free transit for up to 90 days in the Schengen Area. Ensure passport is valid 3+ months beyond exit date.",
    weatherList: {
      summer: "Cool & breezy (50-60°F / 10-15°C). Near 24-hour daylight. Pack a windproof jacket, sleep mask, and light layers.",
      winter: "Cold & snowy (30-35°F / -1 to 2°C). Light is scarce (4-5 hours). Perfect for Northern Lights! Pack heavy thermal coats and sturdy boots."
    },
    transport: "Flybus runs from KEF to Reykjavik Central (45 min, ~$35). Taxis are clean but extremely expensive ($130+). Renting a car is best for exploring.",
    currency: "Icelandic Króna (ISK). Note: Iceland is completely cashless; you can pay with credit/debit cards everywhere, even for public restrooms!",
    hacks: "Icelandair's official program allows stops up to 7 days with no airfare markup. Book a slot at the famous Blue Lagoon geothermal spa directly on your way to or from the airport—they have direct bus transfers!",
    sightsPool: [
      "Soak in the glowing turquoise waters of the Blue Lagoon.",
      "Explore Reykjavik's landmarks: Hallgrímskirkja Church & Harpa Concert Hall.",
      "Walk the Golden Circle: Gullfoss Waterfall, Geysir Hot Springs, and Thingvellir National Park.",
      "Chase the dancing Northern Lights (September to April) on a specialized night tour.",
      "Hike the dramatic black sand beaches of Vik and see the basalt columns.",
      "Walk behind Seljalandsfoss waterfall and climb Skógafoss.",
      "Take a whale-watching cruise directly out of Reykjavik Old Harbor.",
      "Taste traditional Icelandic meat soup and try the famous hot dog stand Bæjarins Beztu Pylsur.",
      "Snorkel between tectonic plates in the crystal-clear waters of the Silfra Fissure.",
      "Explore an active volcanic lava tube at Raufarhólshellir.",
      "Walk across the Bridge Between Continents on the Reykjanes Peninsula.",
      "Take a ferry to the beautiful volcanic Westman Islands.",
      "Relax in the less crowded, oceanfront Sky Lagoon thermal baths.",
      "Hike to the steam vents and hot springs of Reykjadalur Valley."
    ]
  },

  // PORTUGAL (LIS)
  "LIS": {
    country: "Portugal",
    visaStatus: "Transit-Free (US/Schengen)",
    visaDesc: "Part of the Schengen Area. US/CA/UK citizens do not require a visa for stays under 90 days. Passport must have 3+ months remaining.",
    weatherList: {
      summer: "Warm, sunny, and dry (75-85°F / 24-30°C). Perfect beach weather. Pack sunscreen, sunglasses, and light cotton apparel.",
      winter: "Mild but can be rainy (55-65°F / 13-18°C). Plenty of winter sunshine. Pack a light waterproof coat and comfortable walking shoes."
    },
    transport: "Lisbon Metro connects LIS Airport to downtown in 20 min (~€1.80). Taxis and Uber are highly affordable (€10-€15 to center).",
    currency: "Euro (€). Credit cards are widely accepted, but keep €10-€20 in cash for small bakeries and traditional tram fares.",
    hacks: "TAP Portugal's Stopover Program offers a free stopover of up to 10 days in Lisbon or Porto, including exclusive hotel discounts and a free local experience (like a boat trip or museum entry) via their app!",
    sightsPool: [
      "Ride the legendary, historic Yellow Tram 28 through the steep streets of Alfama.",
      "Indulge in warm Pastel de Nata directly from the source at Pastéis de Belém.",
      "Explore the majestic Belém Tower and Jerónimos Monastery.",
      "Take a 40-minute day-trip train to Sintra to see the whimsical Pena Palace.",
      "Watch a passionate, live Fado performance in a cozy tavern in Bairro Alto.",
      "Enjoy breathtaking sunset views from the Miradouro da Senhora do Monte.",
      "Walk along the lively Praça do Comércio waterfront square.",
      "Visit the oceanfront resort town of Cascais for golden sands and seafood.",
      "Explore the historic São Jorge Castle overlooking the red-tiled roofs.",
      "Dine at the Time Out Market for gourmet bites compiled by Lisbon's top chefs.",
      "Take a scenic boat cruise along the Tagus River at dusk.",
      "Marvel at the modern architecture and massive aquarium in Parque das Nações.",
      "Explore the ruins of the Carmo Convent destroyed in the 1755 earthquake.",
      "Shop along the elegant, tree-lined Avenida da Liberdade."
    ]
  },

  // DUBAI (DXB)
  "DXB": {
    country: "United Arab Emirates",
    visaStatus: "Visa on Arrival (Free)",
    visaDesc: "Citizens of the US, UK, Canada, and EU receive a free 30-day visit visa stamped directly on arrival. Passports must be valid for 6+ months.",
    weatherList: {
      summer: "Extremely hot (100-110°F / 38-43°C). High humidity. Sticking to air-conditioned malls and indoor hubs is advised. Pack light linen.",
      winter: "Perfect and warm (75-85°F / 24-29°C). Beautiful clear blue skies. Ideal for desert safaris and beaches. Pack a light jacket for evenings."
    },
    transport: "Dubai Metro runs directly from DXB terminals to central areas (25 min, ~$2). Taxis (Careem/Uber) are clean, safe, and reasonably priced.",
    currency: "UAE Dirham (AED). Credit cards are accepted everywhere; cash is rarely needed except in old market abras (water taxis).",
    hacks: "Emirates offers a 'Dubai Connect' program providing free hotel accommodation, transfers, and transit visas if your layover is between 8 and 26 hours. Make sure to claim it online at least 24 hours prior to travel!",
    sightsPool: [
      "Ascend the world's tallest building, the Burj Khalifa, for panoramic views.",
      "Watch the spectacular choreographed fountains at the base of the Dubai Mall.",
      "Experience a thrilling desert safari with dune bashing, camels, and a BBQ camp.",
      "Cross the Dubai Creek on a traditional wooden Abra boat (€0.50).",
      "Shop for gold, spices, and textiles in the historic souks of Deira.",
      "Explore the futuristic, glass-clad Museum of the Future.",
      "Stroll the luxury waterfront promenade at Dubai Marina.",
      "Spend a day at the pristine beaches of Jumeirah Beach Residence (JBR).",
      "Marvel at the massive indoor waterfall and marine life inside the Dubai Aquarium.",
      "Walk the winding alleyways of Al Fahidi Historical Neighborhood.",
      "Take a day-trip to Abu Dhabi to see the Grand Mosque (1.5 hours away).",
      "Slide down the water glides at Atlantis Aquaventure Waterpark.",
      "See the spectacular view from the Palm Jumeirah Observation Deck.",
      "Dine on gourmet international street food at Global Village (winter only)."
    ]
  },

  // SINGAPORE (SIN)
  "SIN": {
    country: "Singapore",
    visaStatus: "Visa-Free (90 Days)",
    visaDesc: "Citizens of the US, CA, UK, and EU enjoy visa-free entry for up to 90 days. Must submit the SG Arrival Card online within 3 days prior to arrival.",
    weatherList: {
      summer: "Hot and humid year-round (85-90°F / 29-32°C). High chance of sudden, tropical rain showers. Pack light clothing and an umbrella.",
      winter: "Warm and humid (84-88°F / 29-31°C). Monsoonal rain is common in Dec/Jan. Pack breathable apparel and waterproof gear."
    },
    transport: "MRT (Subway) runs directly from Changi Terminal to downtown (30 min, ~$2). Ride-hailing apps (Grab/Gojek) are cheap and highly efficient.",
    currency: "Singapore Dollar (SGD). Highly digitized; cards are accepted everywhere, but Hawker centers require mobile pay or a few cash dollars.",
    hacks: "If your transit layover at Changi is between 5.5 and 24 hours, you can register for a **Free 2.5-hour City Tour** (Heritage, City Sights, or Jewel tour) organized by Changi Airport! Book your spot at the Free Singapore Tour booths in the transit lounge.",
    sightsPool: [
      "Explore the futuristic Supertree Grove and flower domes at Gardens by the Bay.",
      "Watch the spectacular Light & Water show at Marina Bay Sands.",
      "Marvel at the Rain Vortex—the world's tallest indoor waterfall—inside Jewel Changi.",
      "Feast on affordable Michelin-starred street food at Maxwell or Lau Pa Sat Hawker Centers.",
      "Stroll the colorful shophouses and historic temples of Chinatown.",
      "Shop along the sprawling, glitzy retail strip of Orchard Road.",
      "Take a night safari at the world-famous Singapore Zoo.",
      "Explore the lush, tranquil Singapore Botanic Gardens (UNESCO World Heritage).",
      "Walk the historic riverfront colonial district at Clarke Quay.",
      "Take a cable car to Sentosa Island for beaches and Universal Studios.",
      "Taste authentic chili crab and laksa at a local seafood house.",
      "Stroll the trendy boutiques and cafes in Haji Lane.",
      "Discover traditional Peranakan culture and colorful houses in Katong.",
      "Take a morning walk along the beautiful treetop Southern Ridges canopy."
    ]
  },

  // PANAMA (PTY)
  "PTY": {
    country: "Panama",
    visaStatus: "Visa-Free (180 Days)",
    visaDesc: "US, Canadian, EU, and UK passport holders do not require a visa for tourist visits. Passport must be valid for at least 3 months.",
    weatherList: {
      summer: "Hot and tropical (85-90°F / 29-32°C). Dry season runs from Jan to April. Pack light fabrics and hats.",
      winter: "Warm and humid (83-87°F / 28-30°C). Wet/green season runs from May to Dec, with heavy afternoon rains. Pack lightweight rain jackets."
    },
    transport: "Metro Line 2 connects PTY to the city. Uber is highly reliable and cheap ($10-$15 from airport). Taxis are unmetered; agree on price first.",
    currency: "US Dollar (USD). Panama uses US banknotes directly alongside its local coins (Balboas). Credit cards are accepted in city hubs.",
    hacks: "Copa Airlines' 'Panama Stopover' program allows you to add a stopover of 1 to 7 days in Panama City on your way to North/South America at no extra airfare cost. Registered travelers also get significant discounts at shopping centers and canal museums!",
    sightsPool: [
      "Witness the mechanical marvels of ships transiting the locks at the Panama Canal (Miraflores).",
      "Wander the charming, brick-lined colonial streets of Casco Viejo.",
      "Hike up Ancón Hill for sweeping views of the modern skyline and rainforest.",
      "Bike or walk along the beautiful, oceanfront Amador Causeway.",
      "Explore the ruins of the original city destroyed by pirates at Panamá Viejo.",
      "Take a boat ride on Gatun Lake to spot monkeys and sloths in the wild.",
      "Shop at the massive Albrook Mall, the largest shopping complex in the Americas.",
      "Take a 45-minute day-trip ferry to Taboga Island for tropical beaches.",
      "Hike the lush tropical rainforest trails in Metropolitan Natural Park.",
      "Learn about biodiversity at the colorful, Frank Gehry-designed Biomuseo.",
      "Dine on fresh ceviche at the Mercado de Mariscos (Seafood Market).",
      "Take a historic train ride alongside the canal to Colon.",
      "Walk the vibrant coastal promenade at Cinta Costera.",
      "Explore the indigenous Emberá village along the Chagres River."
    ]
  }
};

// Generic US regional stopover advisor fallback database
const GENERIC_US_ADVISOR = {
  visaStatus: "Domestic Route",
  visaDesc: "This is a domestic route within the United States. No international visas are required. Ensure you carry a TSA-compliant ID or passport.",
  weatherList: {
    summer: "Warm to hot across most states. Pack light clothing, comfortable walking shoes, and sun protection.",
    winter: "Varies from mild in the South to freezing/snowy in northern states. Pack layered clothing, heavy jackets, and thermal wear."
  },
  transport: "Most US airports have dedicated ridesharing zones (Uber/Lyft), express bus lines, or light rails connecting directly to downtown areas.",
  currency: "US Dollar ($). Credit cards and digital wallets (Apple/Google Pay) are accepted almost everywhere.",
  hacks: "Make use of airport lounges if you have credit card perks, or take advantage of downtown light rails (like Denver's A-line or Chicago's Blue Line) for cheap, traffic-free escapes during medium layovers!",
  sightsPool: [
    "Explore the local downtown skyline and central parks.",
    "Visit local historical museums and art galleries.",
    "Feast on regional culinary specialties (e.g. deep-dish pizza, regional BBQ, or local seafood).",
    "Stroll through local public markets and artisan squares.",
    "Hike nearby state parks or walk regional riverfront paths.",
    "Shop at central boutique districts and outlet malls.",
    "Catch a local baseball, basketball, or football game.",
    "Take a city-wide hop-on-hop-off sightseeing trolley.",
    "Relax at local microbreweries and specialty coffee houses.",
    "Take photos at famous architectural landmarks and public sculptures."
  ]
};

/**
 * Generates a dynamic day-by-day suggested stopover itinerary.
 * 
 * @param {string} hubIata IATA code of the transit hub
 * @param {number} days Number of layover days
 * @returns {Array} List of itinerary items per day
 */
function generateItinerary(hubIata, days = 3) {
  const data = ADVISOR_DATA[hubIata.toUpperCase()] || GENERIC_US_ADVISOR;
  const pool = data.sightsPool;
  const itinerary = [];

  // Deterministic selector to keep itinerary consistent for a given hub + day count
  for (let d = 1; d <= days; d++) {
    const daySights = [];
    
    // Choose 2 sights per day from the pool sequentially based on the day
    const idx1 = (d * 2 - 2) % pool.length;
    const idx2 = (d * 2 - 1) % pool.length;
    
    daySights.push(pool[idx1]);
    daySights.push(pool[idx2]);
    
    itinerary.push({
      day: d,
      title: `Explore ${hubIata} - Day ${d}`,
      activities: daySights
    });
  }

  return itinerary;
}

/**
 * Compiles a full stopover advisor dossier based on flight route.
 * 
 * @param {string} hubIata Stopover hub IATA code
 * @param {string} dateStr Departure date string YYYY-MM-DD
 * @param {boolean} isMixAndMatch Whether Leg 1 and Leg 2 are separate budget airlines
 * @returns {Object} Dossier metrics
 */
function getAdvisorDossier(hubIata, dateStr, isMixAndMatch = false) {
  const hub = hubIata.toUpperCase();
  const rawData = ADVISOR_DATA[hub] || {
    country: "United States",
    visaStatus: GENERIC_US_ADVISOR.visaStatus,
    visaDesc: GENERIC_US_ADVISOR.visaDesc,
    weatherList: GENERIC_US_ADVISOR.weatherList,
    transport: GENERIC_US_ADVISOR.transport,
    currency: GENERIC_US_ADVISOR.currency,
    hacks: GENERIC_US_ADVISOR.hacks
  };

  // Shallow copy to prevent overwriting global database constants
  const dossier = {
    country: rawData.country,
    visaStatus: rawData.visaStatus,
    visaDesc: rawData.visaDesc,
    weatherList: rawData.weatherList,
    transport: rawData.transport,
    currency: rawData.currency,
    hacks: rawData.hacks
  };

  // Determine season based on departure date
  let season = "summer";
  if (dateStr) {
    const month = new Date(dateStr).getMonth(); // 0..11
    // Dec (11), Jan (0), Feb (1) are winter in Northern Hemisphere
    if (month === 11 || month === 0 || month === 1) {
      season = "winter";
    }
  }

  const weatherText = season === "winter" ? dossier.weatherList.winter : dossier.weatherList.summer;

  // Inject critical travel advice for multiple carrier bookings
  if (isMixAndMatch) {
    dossier.hacks = `⚠️ SELF-TRANSFER WARNING: This is a budget Mix & Match split-ticket! Since Leg 1 and Leg 2 are operated by separate carriers, you MUST collect your baggage in ${hub}, pass through arrivals, re-check your bags at the check-in desk, and clear security again for your second flight. Allow at least 3 hours transit!`;
  }

  return {
    hubIata: hub,
    country: dossier.country,
    visaStatus: dossier.visaStatus,
    visaDesc: dossier.visaDesc,
    weather: weatherText,
    transport: dossier.transport,
    currency: dossier.currency,
    hacks: dossier.hacks
  };
}

// Conversational Chat Bot Q&A Database matching keywords
const CHAT_RESPONSES = {
  "currency": {
    "KEF": "Iceland is completely cashless. Everyone uses debit/credit cards—even for small things like a bottle of water. Local currency is Icelandic Króna (ISK), but cash is rarely necessary.",
    "LIS": "Portugal uses the Euro (€). Credit cards are accepted in most restaurants, but having €10-€20 in cash is very useful for historic trams, small cafes, and bakeries.",
    "DXB": "Dubai uses the UAE Dirham (AED). Cards are accepted everywhere. A tiny amount of cash is only useful for traditional Abras (water taxis, which cost 1 AED) or old souk shopping.",
    "SIN": "Singapore uses the Singapore Dollar (SGD). Cards are accepted virtually everywhere. Hawker centers (street food) usually require cash or local digital banking apps, so keep $10-$20 SGD handy.",
    "PTY": "Panama uses the US Dollar (USD) directly as its official paper banknotes. They have local coins called Balboas (1 Balboa = 1 USD). Credit cards are widely accepted.",
    "default": "The local currency is accepted at all major retailers, and credit cards are widely utilized. It is recommended to carry a small amount of cash for tips and small local vendors."
  },
  "transport": {
    "KEF": "The Flybus is your best option. It leaves KEF airport every 35 minutes after flight arrivals and takes you to Reykjavik central bus terminal (45 min, ~$35). Taxis are clean but cost over $130.",
    "LIS": "Super easy! Take the Lisbon Metro directly from the airport terminal to downtown (Red Line, ~20 min, €1.80). Alternatively, Uber and Bolt are highly affordable (€10-€15 to center).",
    "DXB": "Take the clean, air-conditioned Dubai Metro Red Line from Terminal 1 or 3 directly to downtown areas (25 min, ~$2). Taxis and Careem ride-hailing are highly accessible and priced very reasonably.",
    "SIN": "The MRT (Subway) is exceptionally clean, fast, and connects directly from Changi Airport CG2 to the city center (35 min, ~$2 SGD). Grab ride-hailing is also extremely convenient.",
    "PTY": "Metro Line 2 links the airport to the city. Uber is highly reliable and very cheap ($12-$18 to downtown). Taxis are unmetered, so always agree on a price before boarding.",
    "default": "Airport rideshare pickup zones (Uber/Lyft) are clearly marked. Airport shuttle buses or express light rails are typically the most cost-effective transit methods to reach the city center."
  },
  "hotel": {
    "KEF": "Icelandair stopover programs allow you to stay up to 7 days without airfare markup. For short layovers, there are hotels directly at the terminal (like Aurora Hotel) or in nearby Keflavik town.",
    "LIS": "TAP Portugal stopover programs offer exclusive discount vouchers on partnered hotels in Lisbon. Staying near Rossio Square or Baixa Chiado keeps you within walking distance of top sights.",
    "DXB": "If your transit layover is 8-26 hours, Emirates 'Dubai Connect' provides free hotel stays, shuttle buses, and transit visas! Check your booking online to activate it.",
    "SIN": "For short layovers under 10 hours, do not exit immigration! Use the high-end YOTELAIR inside Jewel Changi or the Aerotel Transit Hotel in Terminal 1. They rent rooms in blocks of 4-6 hours.",
    "PTY": "Copa Airlines provides massive booking discounts at top hotels through their stopover site. For quick layovers, Casco Viejo has beautiful boutique hostels and hotels close to major sites.",
    "default": "Check with your transit airline to see if they offer a complimentary hotel stay for overnight transits. For short bookings, airport hotels or nearby transit pods offer modular 4-hour rental rates."
  },
  "emergency": {
    "default": "In case of transit issues or emergency, contact the airport information desk immediately. For international travel, ensure you have the contact details and location of your home country's embassy or consulate in the transit country."
  }
};

/**
 * Handles custom questions typed into the conversational chat terminal.
 * 
 * @param {string} hubIata Active stopover hub IATA code
 * @param {string} userQuery The user's typed string
 * @returns {string} Highly detailed simulated response
 */
function getAdvisorResponse(hubIata, userQuery) {
  const query = userQuery.toLowerCase().trim();
  const hub = hubIata.toUpperCase();
  
  let key = "default";
  
  // Categorize queries based on keyword matches
  if (query.includes("currency") || query.includes("money") || query.includes("cash") || query.includes("pay") || query.includes("card")) {
    key = "currency";
  } else if (query.includes("transport") || query.includes("get to") || query.includes("train") || query.includes("bus") || query.includes("metro") || query.includes("taxi") || query.includes("uber") || query.includes("cab")) {
    key = "transport";
  } else if (query.includes("hotel") || query.includes("stay") || query.includes("sleep") || query.includes("overnight") || query.includes("room")) {
    key = "hotel";
  } else if (query.includes("emergency") || query.includes("embassy") || query.includes("help") || query.includes("police") || query.includes("visa")) {
    key = "emergency";
  }

  // Look up specific answers for that hub
  if (CHAT_RESPONSES[key] && CHAT_RESPONSES[key][hub]) {
    return CHAT_RESPONSES[key][hub];
  }
  
  // Fallback to generic answers for that key
  if (CHAT_RESPONSES[key] && CHAT_RESPONSES[key]["default"]) {
    return CHAT_RESPONSES[key]["default"];
  }

  // Absolute generic fallback response
  return `AeroAI Advisor: For stopovers in ${hub}, I recommend checking local visa guidelines, carrying a credit card with no foreign transaction fees, and utilizing the high-speed airport transit trains for easy city access. Let me know if you want to know about 'currency', 'transport', or 'hotels' for this route!`;
}

// Bind to window for Chrome Extension sequentially-loaded script environment
if (typeof window !== "undefined") {
  window.generateItinerary = generateItinerary;
  window.getAdvisorDossier = getAdvisorDossier;
  window.getAdvisorResponse = getAdvisorResponse;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateItinerary, getAdvisorDossier, getAdvisorResponse };
}
