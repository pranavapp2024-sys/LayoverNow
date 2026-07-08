// Core search engine for finding and scoring layover options.
// Utilizes geographical coordinates and airline hub programs to simulate smart routing.

// Standard Haversine formula to calculate great-circle distance in kilometers
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate a deterministic pseudo-random number based on a string seed.
// This ensures that the prices remain stable for a given search query.
function seedRandom(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(Math.sin(hash)) * 1000 % 1;
}

// Quick city details dictionary to add rich context to stopovers
const CITY_DETAILS = {
  "Reykjavik": { sights: "Blue Lagoon, Northern Lights, Geysers", desc: "Enjoy thermal springs and volcanic scenery via Icelandair's direct transatlantic stopover program." },
  "Lisbon": { sights: "Belém Tower, Tram 28, Pastel de Nata", desc: "Sunny coastal charm, historic yellow trams, and excellent seafood en route to South America/Europe." },
  "Dubai": { sights: "Burj Khalifa, Desert Safari, Gold Souk", desc: "Futuristic skyscrapers, luxury retail, and golden desert dunes in the heart of the Middle East." },
  "Singapore": { sights: "Gardens by the Bay, Marina Bay Sands, Jewel Changi", desc: "A tropical garden city with the world's best airport, incredible street food, and clean, lush surroundings." },
  "Doha": { sights: "Souq Waqif, Museum of Islamic Art, The Pearl", desc: "A stunning blend of traditional Qatari heritage and hyper-modern waterfront skylines." },
  "Abu Dhabi": { sights: "Sheikh Zayed Grand Mosque, Louvre Abu Dhabi", desc: "Experience grand cultural landmarks and thrilling theme parks with Etihad's transit stopover." },
  "Istanbul": { sights: "Hagia Sophia, Blue Mosque, Grand Bazaar", desc: "Explore the fascinating cultural melting pot where Europe meets Asia across the Bosphorus." },
  "Panama City": { sights: "Panama Canal, Casco Viejo, Amador Causeway", desc: "Dynamic Central American trade capital connecting North and South America with Copa Airlines." },
  "Tokyo": { sights: "Shibuya Crossing, Senso-ji Temple, Meiji Shrine", desc: "Electrifying neon skyscrapers alongside quiet, moss-covered historic shrines." },
  "Seoul": { sights: "Gyeongbokgung Palace, N Seoul Tower, Myeongdong", desc: "High-tech urbanism, delicious K-BBQ, and ancient royal palaces side-by-side." },
  "London": { sights: "Big Ben, London Eye, Tower of London", desc: "World-class theater, imperial history, and vibrant cosmopolitan boroughs." },
  "Paris": { sights: "Eiffel Tower, Louvre Museum, Seine Cruise", desc: "The global capital of romance, high fashion, fine wines, and artistic heritage." },
  "Amsterdam": { sights: "Canals, Van Gogh Museum, Rijksmuseum", desc: "Beautiful historic canal loops, millions of bicycles, and picturesque gabled houses." },
  "Frankfurt": { sights: "Römerberg, Main Tower, Goethe House", desc: "Germany's financial high-rise center with cozy traditional apple-wine taverns." },
  "Madrid": { sights: "Prado Museum, Royal Palace, Retiro Park", desc: "Sunny avenues, royal collections, and lively tapas bars that stay open until dawn." },
  "Barcelona": { sights: "Sagrada Família, Park Güell, Barceloneta Beach", desc: "Unbelievable Gaudi architecture, Mediterranean waves, and fresh seafood tapas." },
  "Rome": { sights: "Colosseum, Vatican Museums, Trevi Fountain", desc: "The ultimate open-air museum of classical ruins, ancient history, and perfect pasta." },
  "Zurich": { sights: "Lake Zurich, Old Town (Altstadt), Bahnhofstrasse", desc: "Ultra-clean streets, luxury shopping, and crystal lakes right at the foot of the Alps." },
  "Bangkok": { sights: "Grand Palace, Wat Arun, Chatuchak Market", desc: "Golden Buddhist temples, floating markets, and chaotic, energetic night street food." },
  "Hong Kong": { sights: "Victoria Peak, Star Ferry, Temple Street", desc: "Dazzling neon-lit harbor skylines and dense green volcanic peaks rising from the sea." },
  "Addis Ababa": { sights: "National Museum, Holy Trinity Cathedral", desc: "A vibrant East African culture hub featuring rich historic roots and world-class coffee." }
};

function getCityDetails(city, defaultValue = "") {
  return CITY_DETAILS[city] || { 
    sights: "Local Markets, Historical Sights, Downtown Area", 
    desc: `Discover local culture and culinary delights in ${city} during your stopover.` 
  };
}

/**
 * Finds layover options between Origin and Destination IATA codes.
 * 
 * @param {string} originIata Origin Airport code (e.g. "BOS")
 * @param {string} destIata Destination Airport code (e.g. "CDG")
 * @param {number} layoverDays Duration of layover in days (e.g. 3)
 * @returns {Array} List of layover city option objects
 */
function findLayovers(originIata, destIata, layoverDays = 3) {
  // Validate standard databases are loaded
  const airportsDb = typeof window !== "undefined" ? window.AIRPORTS : AIRPORTS;
  if (!airportsDb) return [];

  const origin = airportsDb.find(a => a.iata.toUpperCase() === originIata.toUpperCase());
  const dest = airportsDb.find(a => a.iata.toUpperCase() === destIata.toUpperCase());

  if (!origin || !dest) return [];
  if (origin.iata === dest.iata) return [];

  const directDistance = haversineDistance(origin.lat, origin.lon, dest.lat, dest.lon);
  const options = [];

  // Price models: base direct flight price estimation
  const basePrice = Math.round(120 + directDistance * 0.085);

  airportsDb.forEach(hub => {
    // Cannot layover at origin or destination
    if (hub.iata === origin.iata || hub.iata === dest.iata) return;

    const d1 = haversineDistance(origin.lat, origin.lon, hub.lat, hub.lon);
    const d2 = haversineDistance(hub.lat, hub.lon, dest.lat, dest.lon);
    const totalDistance = d1 + d2;
    const detourRatio = totalDistance / directDistance;

    // DETOUR HEURISTIC FILTERING
    // Limit layovers that are wildly out of the way.
    // For long hauls, we allow slightly more detour (up to 1.6x).
    // For shorter hops, we limit detours heavily (up to 1.35x).
    const maxDetour = directDistance > 5000 ? 1.65 : 1.40;
    if (detourRatio > maxDetour) return;

    // Establish a base detour cost before stopover incentives
    let layoverLegsPrice = Math.round((d1 * 0.08) + (d2 * 0.08) + 130);

    // Apply special program scoring / discounts for known stopovers
    let programBenefit = 0;
    let hasOfficialProgram = false;
    let promoText = "";

    // 1. Icelandair Stopover Program (KEF)
    if (hub.iata === "KEF" && 
        ((origin.region === "NA" && dest.region === "EU") || (origin.region === "EU" && dest.region === "NA"))) {
      hasOfficialProgram = true;
      programBenefit = 180; // High discount to make it cheaper/free
      promoText = "Icelandair Free Stopover Program";
    }

    // 2. TAP Portugal Stopover Program (LIS / OPO)
    if ((hub.iata === "LIS" || hub.iata === "OPO") &&
        ((origin.region === "NA" || origin.region === "SA") && dest.region === "EU" ||
         origin.region === "EU" && (dest.region === "NA" || dest.region === "SA"))) {
      hasOfficialProgram = true;
      programBenefit = 150;
      promoText = "TAP Portugal Stopover Benefit";
    }

    // 3. Copa Airlines Panama Stopover (PTY)
    if (hub.iata === "PTY" && 
        ((origin.region === "NA" && dest.region === "SA") || (origin.region === "SA" && dest.region === "NA"))) {
      hasOfficialProgram = true;
      programBenefit = 140;
      promoText = "Copa Airlines Panama Stopover";
    }

    // 4. Middle East Transit Hubs (DXB, DOH, AUH, IST)
    // Connecting Europe/Americas to Asia/Oceania/Africa
    const meHubs = ["DXB", "DOH", "AUH", "IST"];
    if (meHubs.includes(hub.iata)) {
      const isIntercontinental = 
        (origin.region === "EU" || origin.region === "NA") && 
        (dest.region === "AS" || dest.region === "OC" || dest.region === "AF");
      const isReverse = 
        (dest.region === "EU" || dest.region === "NA") && 
        (origin.region === "AS" || origin.region === "OC" || origin.region === "AF");

      if (isIntercontinental || isReverse) {
        hasOfficialProgram = true;
        programBenefit = 130;
        promoText = hub.program || `${hub.hubs[0]} Stopover program`;
      }
    }

    // 5. Singapore Airlines Transit (SIN)
    if (hub.iata === "SIN" && 
        (origin.region !== dest.region && (origin.region === "OC" || dest.region === "OC" || origin.region === "EU" || dest.region === "EU"))) {
      hasOfficialProgram = true;
      programBenefit = 110;
      promoText = "Changi Stopover Experience";
    }

    // 6. Generic Intercontinental Discount (Stopover flight is often cheaper than direct long-haul)
    if (origin.region !== dest.region && !hasOfficialProgram) {
      programBenefit = 60; // general transit savings
    }

    // Apply the stopover discount
    layoverLegsPrice -= programBenefit;

    // Apply deterministic price variation so searches are interesting and consistent
    const seedString = `${origin.iata}-${dest.iata}-${hub.iata}-${layoverDays}`;
    const randFactor = seedRandom(seedString); // value 0..1
    const priceVariance = Math.round((randFactor * 80) - 40); // -40 to +40 USD
    let finalLayoverPrice = layoverLegsPrice + priceVariance;

    // Make sure we don't price it below a logical minimum
    finalLayoverPrice = Math.max(finalLayoverPrice, 150);

    // Calculate Price Impact relative to direct flight
    const priceImpact = finalLayoverPrice - basePrice;

    // Detour distance in km and miles
    const detourKm = Math.round(totalDistance - directDistance);
    const detourMiles = Math.round(detourKm * 0.621371);

    // Dynamic flight durations
    const speedKmH = 800; // avg commercial speed
    const flightTime1 = Math.round((d1 / speedKmH) * 10) / 10;
    const flightTime2 = Math.round((d2 / speedKmH) * 10) / 10;
    const totalFlightTime = Math.round((flightTime1 + flightTime2) * 10) / 10;
    const directFlightTime = Math.round((directDistance / speedKmH) * 10) / 10;

    // Additional Layover Pricing Labels (like Airwander)
    let dealTag = "Standard Deal";
    let dealClass = "deal-standard";
    if (priceImpact <= -30) {
      dealTag = "Save Money!";
      dealClass = "deal-save";
    } else if (priceImpact > -30 && priceImpact <= 15) {
      dealTag = "Free Stopover!";
      dealClass = "deal-free";
    } else if (priceImpact > 15 && priceImpact <= 60) {
      dealTag = "Cheap Layover";
      dealClass = "deal-cheap";
    } else {
      dealTag = "Plus stopover";
      dealClass = "deal-plus";
    }

    // Helper to assign distinct carriers for the Mix & Match split ticket option
    function getMixAndMatchCarriers(hubIata) {
      const h = hubIata.toUpperCase();
      if (h === "KEF") {
        return { a1: "Delta Airlines", a2: "Play Airlines" };
      } else if (h === "LIS" || h === "OPO") {
        return { a1: "TAP Portugal", a2: "Ryanair" };
      } else if (h === "DXB") {
        return { a1: "Emirates", a2: "Flydubai" };
      } else if (h === "SIN") {
        return { a1: "Singapore Airlines", a2: "AirAsia" };
      } else if (h === "PTY") {
        return { a1: "Copa Airlines", a2: "Wingo" };
      } else if (h === "LHR" || h === "CDG" || h === "AMS") {
        return { a1: "United Airlines", a2: "EasyJet" };
      } else if (h === "MAD" || h === "BCN") {
        return { a1: "Iberia", a2: "Vueling" };
      }
      // US Domestic route fallback (using active budget carrier Frontier instead of defunct Spirit)
      return { a1: "Delta Airlines", a2: "Frontier Airlines" };
    }

    // Pull city-specific tourist details
    const cityMeta = getCityDetails(hub.city);

    // Default Carriers for Standard Single/Alliance flights
    const standardCarrier1 = hub.hubs[0] || origin.hubs[0] || "Major Alliance";
    const standardCarrier2 = hub.hubs[0] || dest.hubs[0] || "Partner Airline";

    // 1. PUSH STANDARD SINGLE CARRIER / PARTNER OPTION
    const stdHubQuality = hub.rating ? (hub.rating * 100) : 0;
    const stdScore = priceImpact + (detourRatio * 150) - stdHubQuality;

    options.push({
      hub: hub,
      origin: origin,
      destination: dest,
      d1: Math.round(d1),
      d2: Math.round(d2),
      directDistance: Math.round(directDistance),
      totalDistance: Math.round(totalDistance),
      detourKm: detourKm,
      detourMiles: detourMiles,
      detourRatio: Math.round(detourRatio * 100) / 100,
      
      // Pricing
      directPrice: basePrice,
      layoverPrice: finalLayoverPrice,
      priceImpact: priceImpact,
      dealTag: dealTag,
      dealClass: dealClass,
      isMixAndMatch: false,
      airline1: standardCarrier1,
      airline2: standardCarrier2,
      
      // Durations
      flightTime1: flightTime1,
      flightTime2: flightTime2,
      totalFlightTime: totalFlightTime,
      directFlightTime: directFlightTime,
      
      // Stopover Info
      hasOfficialProgram: hasOfficialProgram,
      promoText: promoText,
      sights: cityMeta.sights,
      description: cityMeta.desc,
      
      score: stdScore
    });

    // 2. PUSH MIX & MATCH (SPLIT TICKETING MULTIPLE CARRIERS) OPTION
    // Usually provides substantial budget savings by combining low-cost and major carriers
    const mixDiscount = Math.round(40 + (randFactor * 50)); // $40 - $90 savings
    const mixLayoverPrice = Math.max(finalLayoverPrice - mixDiscount, 130);
    const mixPriceImpact = mixLayoverPrice - basePrice;
    
    // Mix & Match rating adjustment (users love saving money but self-transfers are minor detours)
    const mixScore = mixPriceImpact + (detourRatio * 150) + 15; // small self-transfer penalty
    const mixCarriers = getMixAndMatchCarriers(hub.iata);

    options.push({
      hub: hub,
      origin: origin,
      destination: dest,
      d1: Math.round(d1),
      d2: Math.round(d2),
      directDistance: Math.round(directDistance),
      totalDistance: Math.round(totalDistance),
      detourKm: detourKm,
      detourMiles: detourMiles,
      detourRatio: Math.round(detourRatio * 100) / 100,
      
      // Pricing (Cheaper Split Tickets)
      directPrice: basePrice,
      layoverPrice: mixLayoverPrice,
      priceImpact: mixPriceImpact,
      dealTag: "Mix & Match",
      dealClass: "deal-mix",
      isMixAndMatch: true,
      airline1: mixCarriers.a1,
      airline2: mixCarriers.a2,
      
      // Durations
      flightTime1: flightTime1,
      flightTime2: flightTime2,
      totalFlightTime: totalFlightTime,
      directFlightTime: directFlightTime,
      
      // Stopover Info
      hasOfficialProgram: false, // multiple carrier ticket, not official transit visa program
      promoText: "Split-Ticket Budget Saving",
      sights: cityMeta.sights,
      description: `Save money by self-transferring between carriers in ${hub.city}! Fly ${mixCarriers.a1} for leg 1, and ${mixCarriers.a2} for leg 2.`,
      
      score: mixScore
    });
  });

  // Sort options: best score first
  return options.sort((a, b) => a.score - b.score);
}

// Global binding for Chrome Extension environment
if (typeof window !== "undefined") {
  window.findLayovers = findLayovers;
  window.haversineDistance = haversineDistance;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { findLayovers, haversineDistance };
}
