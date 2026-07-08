// Main Application Controller for Layover Now
// Handles UI state, Autocomplete, Slider events, Booking Link creation, and Canvas Radar Map plotting.

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const originInput = document.getElementById("origin-input");
  const originList = document.getElementById("origin-list");
  const destInput = document.getElementById("dest-input");
  const destList = document.getElementById("dest-list");
  
  const dateInput = document.getElementById("date-input");
  const daysInput = document.getElementById("days-input");
  const daysVal = document.getElementById("days-val");
  
  const searchBtn = document.getElementById("search-btn");
  const resultsSummary = document.getElementById("route-summary");
  const summaryOrig = document.getElementById("summary-orig");
  const summaryDest = document.getElementById("summary-dest");
  const summaryDistance = document.getElementById("summary-distance");
  const summaryTime = document.getElementById("summary-time");
  
  const loading = document.getElementById("loading");
  const emptyState = document.getElementById("empty-state");
  const resultsList = document.getElementById("results-list");
  
  const sortScoreBtn = document.getElementById("sort-score");
  const sortPriceBtn = document.getElementById("sort-price");
  const sortDetourBtn = document.getElementById("sort-detour");
  
  const canvas = document.getElementById("radar-map");
  const ctx = canvas.getContext("2d");
  const mapStatus = document.getElementById("map-status");

  // --- AeroAI Advisor DOM Elements ---
  const tabResults = document.getElementById("tab-results");
  const tabAdvisor = document.getElementById("tab-advisor");
  const advisorPanel = document.getElementById("advisor-panel");
  const filterControls = document.getElementById("filter-controls");
  
  const advVisaBadge = document.getElementById("adv-visa-badge");
  const advVisaDesc = document.getElementById("adv-visa-desc");
  const advWeather = document.getElementById("adv-weather");
  const advCurrency = document.getElementById("adv-currency");
  const advTransport = document.getElementById("adv-transport");
  const advHacks = document.getElementById("adv-hacks");
  const advItineraryList = document.getElementById("adv-itinerary-list");
  
  const chatViewport = document.getElementById("chat-viewport");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  // --- State Variables ---
  let selectedOrigin = null;
  let selectedDest = null;
  let layoverResults = [];
  let selectedHubIndex = 0;
  let currentSort = "score"; // "score", "price", "detour"
  let animFrameId = null;
  let planeProgress = 0; // Animation progress for flight dots (0 to 1)

  // Set default departure date to 14 days from today
  const today = new Date();
  const defaultDate = new Date(today);
  defaultDate.setDate(today.getDate() + 14);
  const formattedDate = defaultDate.toISOString().split("T")[0];
  dateInput.value = formattedDate;
  dateInput.min = today.toISOString().split("T")[0];

  // --- Resize Canvas to Fit Container ---
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    drawRadarMap();
  }
  
  // Set initial canvas size and bind resize event
  window.addEventListener("resize", resizeCanvas);
  setTimeout(resizeCanvas, 100);

  // --- AeroAI Advisor Engine Bindings ---
  
  // Updates all variables, badges, timelines, and chat welcome statements in the AI Advisor card
  function updateAdvisorUI() {
    if (!layoverResults || layoverResults.length === 0) return;
    
    const activeOption = layoverResults[selectedHubIndex];
    const hub = activeOption.hub;
    const dateStr = dateInput.value;
    const days = parseInt(daysInput.value, 10);
    
    // Fetch dossier values from advisor.js reasoning database
    const dossier = window.getAdvisorDossier(hub.iata, dateStr, activeOption.isMixAndMatch);
    
    // Clear and set Visa status badges
    advVisaBadge.className = "dossier-val badge";
    const status = dossier.visaStatus.toLowerCase();
    if (status.includes("free")) {
      advVisaBadge.classList.add("deal-free");
    } else if (status.includes("arrival")) {
      advVisaBadge.classList.add("deal-save");
    } else {
      advVisaBadge.classList.add("deal-plus");
    }
    
    advVisaBadge.textContent = dossier.visaStatus;
    advVisaDesc.textContent = dossier.visaDesc;
    advWeather.textContent = dossier.weather;
    advCurrency.textContent = dossier.currency;
    advTransport.textContent = dossier.transport;
    advHacks.textContent = dossier.hacks;
    
    // Render dynamic day-by-day suggested itineraries
    const itinerary = window.generateItinerary(hub.iata, days);
    advItineraryList.innerHTML = "";
    
    itinerary.forEach(day => {
      const dayEl = document.createElement("div");
      dayEl.className = "itinerary-day";
      dayEl.innerHTML = `
        <div class="itinerary-day-title">${day.title}</div>
        <div class="itinerary-day-list">
          ${day.activities.map(act => `<div class="itinerary-sight">${act}</div>`).join("")}
        </div>
      `;
      advItineraryList.appendChild(dayEl);
    });
    
    // Refresh Chat Terminal viewport welcome card
    chatViewport.innerHTML = `
      <div class="chat-msg chat-msg-ai">
        Hello! I am your AeroAI Advisor. I've compiled your customized stopover dossier for <strong>${hub.city} (${hub.iata})</strong>! Ask me any questions about local 'transport', 'currency', or 'hotels' during your ${days}-day stay.
      </div>
    `;
  }

  // Swapping visual cards between [Flight Deals] and [AeroAI Advisor] panels
  function switchTabs(activeTab) {
    if (activeTab === "results") {
      tabResults.classList.add("active");
      tabAdvisor.classList.remove("active");
      
      resultsList.classList.remove("hidden");
      filterControls.classList.remove("hidden");
      advisorPanel.classList.add("hidden");
    } else {
      tabResults.classList.remove("active");
      tabAdvisor.classList.add("active");
      
      resultsList.classList.add("hidden");
      filterControls.classList.add("hidden");
      advisorPanel.classList.remove("hidden");
      
      // Auto-trigger synchronizations
      updateAdvisorUI();
      advisorPanel.scrollTop = 0;
    }
  }

  tabResults.addEventListener("click", () => switchTabs("results"));
  tabAdvisor.addEventListener("click", () => switchTabs("advisor"));

  // Conversational Terminal typewriter loops
  function sendChatMessage() {
    const query = chatInput.value.trim();
    if (!query) return;
    
    // Append User message bubble
    const userBubble = document.createElement("div");
    userBubble.className = "chat-msg chat-msg-user";
    userBubble.textContent = query;
    chatViewport.appendChild(userBubble);
    chatInput.value = "";
    chatViewport.scrollTop = chatViewport.scrollHeight;
    
    // Simulated AI think-time response
    setTimeout(() => {
      if (!layoverResults || layoverResults.length === 0) return;
      const activeOption = layoverResults[selectedHubIndex];
      const response = window.getAdvisorResponse(activeOption.hub.iata, query);
      
      // Append AI typing bubble
      const aiBubble = document.createElement("div");
      aiBubble.className = "chat-msg chat-msg-ai";
      chatViewport.appendChild(aiBubble);
      
      let charIdx = 0;
      aiBubble.innerHTML = "<strong>AeroAI:</strong> ";
      
      const typeTimer = setInterval(() => {
        if (charIdx < response.length) {
          aiBubble.innerHTML += response.charAt(charIdx);
          charIdx++;
          chatViewport.scrollTop = chatViewport.scrollHeight;
        } else {
          clearInterval(typeTimer);
        }
      }, 10); // fast crisp typing effect
    }, 350);
  }

  chatSendBtn.addEventListener("click", sendChatMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  });

  // --- Autocomplete Logic ---
  function setupAutocomplete(inputEl, listEl, onSelectCallback) {
    inputEl.addEventListener("input", (e) => {
      const val = e.target.value;
      listEl.innerHTML = "";
      
      if (!val || val.trim().length < 1) {
        listEl.classList.add("hidden");
        return;
      }
      
      // Look up matches in preloaded airports database
      const matches = window.searchAirports(val);
      
      if (matches.length === 0) {
        listEl.classList.add("hidden");
        return;
      }
      
      listEl.classList.remove("hidden");
      matches.forEach(airport => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.innerHTML = `
          <div style="display: flex; flex-direction: column;">
            <span class="ac-city">${airport.city} <span class="ac-name">${airport.name}</span></span>
            <span style="font-size: 8px; color: var(--text-muted); margin-top: 1px;">${airport.country}</span>
          </div>
          <span class="ac-iata">${airport.iata}</span>
        `;
        
        item.addEventListener("click", () => {
          inputEl.value = `${airport.iata} - ${airport.city}`;
          listEl.classList.add("hidden");
          onSelectCallback(airport);
        });
        
        listEl.appendChild(item);
      });
    });

    // Close autocomplete lists when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target !== inputEl && e.target !== listEl) {
        listEl.classList.add("hidden");
      }
    });
  }

  setupAutocomplete(originInput, originList, (airport) => {
    selectedOrigin = airport;
  });

  setupAutocomplete(destInput, destList, (airport) => {
    selectedDest = airport;
  });

  // Handle standard range slider adjustments
  daysInput.addEventListener("input", (e) => {
    daysVal.textContent = e.target.value;
    // If we have active search results, dynamically refresh search to adjust dates/prices
    if (selectedOrigin && selectedDest) {
      triggerSearch(false); // fast silent refresh without clearing active selections
    }
  });

  // --- Search trigger ---
  searchBtn.addEventListener("click", () => {
    // Fallback: If user typed text but didn't select from dropdown, try to geocode it manually
    if (!selectedOrigin && originInput.value) {
      const query = originInput.value.split(" - ")[0].toUpperCase().trim();
      selectedOrigin = window.findAirportByIata(query) || window.searchAirports(query)[0] || null;
      if (selectedOrigin) originInput.value = `${selectedOrigin.iata} - ${selectedOrigin.city}`;
    }
    
    if (!selectedDest && destInput.value) {
      const query = destInput.value.split(" - ")[0].toUpperCase().trim();
      selectedDest = window.findAirportByIata(query) || window.searchAirports(query)[0] || null;
      if (selectedDest) destInput.value = `${selectedDest.iata} - ${selectedDest.city}`;
    }

    if (!selectedOrigin) {
      alert("Please select a valid origin airport.");
      return;
    }
    if (!selectedDest) {
      alert("Please select a valid destination airport.");
      return;
    }
    if (selectedOrigin.iata === selectedDest.iata) {
      alert("Origin and destination cannot be the same airport.");
      return;
    }

    triggerSearch(true);
  });

  function triggerSearch(showLoading = true) {
    if (showLoading) {
      emptyState.classList.add("hidden");
      resultsList.classList.add("hidden");
      loading.classList.remove("hidden");
    }

    const days = parseInt(daysInput.value, 10);

    setTimeout(() => {
      // Find layover options
      layoverResults = window.findLayovers(selectedOrigin.iata, selectedDest.iata, days);

      loading.classList.add("hidden");

      if (layoverResults.length === 0) {
        emptyState.classList.remove("hidden");
        emptyState.querySelector("p").textContent = "No suitable layover routes found in our database for this corridor.";
        emptyState.querySelector(".subtext").textContent = "Try routing via different continents (e.g. NYC to London, or Europe to Asia).";
        resultsSummary.classList.add("hidden");
        return;
      }

      // Render search metrics summary
      const direct = layoverResults[0]; // any result has correct origin/dest metrics
      summaryOrig.textContent = direct.origin.iata;
      summaryDest.textContent = direct.destination.iata;
      summaryDistance.textContent = `${direct.directDistance.toLocaleString()} km`;
      summaryTime.textContent = `${direct.directFlightTime}h`;
      resultsSummary.classList.remove("hidden");

      // Sort and Render
      sortResults();
      resultsList.classList.remove("hidden");
      
      // Auto-plot first result on the Canvas map
      selectedHubIndex = 0;
      drawRadarMap();
      startPlaneAnimation();
      updateAdvisorUI();
    }, showLoading ? 500 : 0);
  }

  // --- Results List Renderer ---
  function renderResults() {
    resultsList.innerHTML = "";
    
    layoverResults.forEach((opt, index) => {
      const isSelected = index === selectedHubIndex;
      
      // Create multi-city booking links based on dates
      const depDateObj = new Date(dateInput.value);
      const retDateObj = new Date(depDateObj);
      retDateObj.setDate(depDateObj.getDate() + parseInt(daysInput.value, 10));
      
      const date1Str = depDateObj.toISOString().split("T")[0];
      const date2Str = retDateObj.toISOString().split("T")[0];
      
      // 1. Google Flights Multi-City deep link
      const gFlightsUrl = `https://www.google.com/flights?hl=en#flt=${opt.origin.iata}.${opt.hub.iata}.${date1Str}*${opt.hub.iata}.${opt.destination.iata}.${date2Str}`;
      
      // 2. Skyscanner Multi-City deep link
      const skyscannerUrl = `https://www.skyscanner.com/transport/flights/${opt.origin.iata.toLowerCase()}/${opt.hub.iata.toLowerCase()}/${date1Str}/${opt.hub.iata.toLowerCase()}/${opt.destination.iata.toLowerCase()}/${date2Str}/?adults=1`;

      const card = document.createElement("div");
      card.className = `layover-card ${isSelected ? "selected" : ""}`;
      
      // Formatted price impact label
      const prefix = opt.priceImpact < 0 ? "-" : "+";
      const valStr = `$${Math.abs(opt.priceImpact)}`;
      const priceImpactLabel = opt.priceImpact < 0 ? `Save ${valStr}` : `${prefix}${valStr}`;
      
      card.innerHTML = `
        <div class="card-top">
          <div class="card-title-group">
            <h4>${opt.hub.city}</h4>
            <span class="hub-badge">${opt.hub.iata}</span>
            <span class="badge ${opt.dealClass}">${opt.dealTag}</span>
          </div>
          <div class="price-display">
            <div>
              <div class="price-impact" style="color: ${opt.priceImpact <= 15 ? 'var(--accent-green)' : 'var(--text-primary)'}">
                ${opt.priceImpact === 0 ? 'Free' : priceImpactLabel}
              </div>
              <div class="price-total">Est: $${opt.layoverPrice} total</div>
            </div>
          </div>
        </div>
        
        <div class="card-detour">
          <div class="detour-text">
            <span>✈ Detour: +${opt.detourKm.toLocaleString()} km (${opt.detourMiles.toLocaleString()} mi)</span>
            <span style="color: var(--text-muted); font-size: 8px;">(${opt.detourRatio}x direct)</span>
          </div>
          ${opt.hasOfficialProgram ? `<span class="official-promo">⭐ ${opt.promoText}</span>` : ''}
        </div>
        
        ${isSelected ? `
          <div class="card-details-panel">
            <p class="card-desc">${opt.description}</p>
            <p class="card-sights"><strong>Must See:</strong> ${opt.sights}</p>
            
            <div class="timeline">
              <div class="timeline-leg">
                <span class="leg-path">${opt.origin.iata} <span class="leg-arrow">➔</span> ${opt.hub.iata}</span>
                <span class="leg-meta">${opt.flightTime1} hrs • ${opt.airline1}</span>
              </div>
              <div class="timeline-leg" style="padding-left: 20px;">
                <span class="leg-days">Stopover: ${daysInput.value} days in ${opt.hub.city}</span>
                <span class="leg-meta">Explore Stopover</span>
              </div>
              <div class="timeline-leg">
                <span class="leg-path">${opt.hub.iata} <span class="leg-arrow">➔</span> ${opt.destination.iata}</span>
                <span class="leg-meta">${opt.flightTime2} hrs • ${opt.airline2}</span>
              </div>
            </div>
            
            <div class="booking-actions">
              <a href="${gFlightsUrl}" target="_blank" class="btn-book btn-gflights" id="gf-${index}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                Google Flights
              </a>
              <a href="${skyscannerUrl}" target="_blank" class="btn-book btn-skyscanner" id="ss-${index}">
                ✈ Skyscanner
              </a>
            </div>
          </div>
        ` : ''}
      `;

      card.addEventListener("click", (e) => {
        // Don't close if they clicked a link
        if (e.target.closest("a")) return;
        
        selectedHubIndex = index;
        renderResults();
        
        // Re-draw map coordinates for newly selected hub
        drawRadarMap();
        planeProgress = 0; // restart airplane dot flight loop
        updateAdvisorUI();
      });

      resultsList.appendChild(card);
    });
    
    // Auto-scroll selected card into view if needed
    const activeCard = resultsList.querySelector(".layover-card.selected");
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // --- Sorting Controllers ---
  function sortResults() {
    if (currentSort === "score") {
      layoverResults.sort((a, b) => a.score - b.score);
    } else if (currentSort === "price") {
      layoverResults.sort((a, b) => a.priceImpact - b.priceImpact);
    } else if (currentSort === "detour") {
      layoverResults.sort((a, b) => a.detourRatio - b.detourRatio);
    }
    renderResults();
  }

  function setSortActive(activeBtn, type) {
    [sortScoreBtn, sortPriceBtn, sortDetourBtn].forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
    currentSort = type;
    selectedHubIndex = 0; // reset active selection on sort
    sortResults();
    drawRadarMap();
    updateAdvisorUI();
  }

  sortScoreBtn.addEventListener("click", () => setSortActive(sortScoreBtn, "score"));
  sortPriceBtn.addEventListener("click", () => setSortActive(sortPriceBtn, "price"));
  sortDetourBtn.addEventListener("click", () => setSortActive(sortDetourBtn, "detour"));

  // --- Canvas Graphics Radar Map ---
  
  // Geolocation Mercator / Equirectangular projection
  // Maps Lat/Lon to Canvas coordinate boundaries
  function project(lat, lon, width, height) {
    // Add margin bounding box so path lines don't touch edges
    const margin = 32;
    const activeWidth = width - margin * 2;
    const activeHeight = height - margin * 2;
    
    // Standard Equirectangular Projection
    const x = ((lon + 180) * (activeWidth / 360)) + margin;
    const y = (((90 - lat) * (activeHeight / 180)) + margin) * 0.95; // minor vertical scaling compression
    
    return { x: Math.round(x), y: Math.round(y) };
  }

  function drawRadarMap() {
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    
    // Clear screen
    ctx.clearRect(0, 0, w, h);
    
    // 1. Draw subtle background radar sweeping grid
    ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
    ctx.lineWidth = 1;
    
    // Draw concentric circles in center
    ctx.beginPath();
    ctx.arc(w/2, h/2, 45, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(w/2, h/2, 90, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw grid crosshairs
    ctx.beginPath();
    ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h);
    ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
    ctx.stroke();

    // 2. Draw faded global coordinate hubs from preloaded database
    // This represents a technical "airport constellation grid"
    const airportsDb = typeof window !== "undefined" ? window.AIRPORTS : [];
    if (airportsDb.length > 0) {
      ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
      airportsDb.forEach(airport => {
        const pt = project(airport.lat, airport.lon, w, h);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 3. Draw flight route if active
    if (selectedOrigin && selectedDest && layoverResults.length > 0) {
      const activeOption = layoverResults[selectedHubIndex];
      const hub = activeOption.hub;

      const pOrig = project(selectedOrigin.lat, selectedOrigin.lon, w, h);
      const pDest = project(selectedDest.lat, selectedDest.lon, w, h);
      const pHub = project(hub.lat, hub.lon, w, h);

      // Draw flight line path (Origin -> Hub -> Destination)
      ctx.lineWidth = 1.5;
      
      // Leg 1: Origin to Stopover Hub (glowing curve)
      ctx.strokeStyle = "rgba(208, 0, 255, 0.6)"; // purple curve
      ctx.shadowColor = "rgba(208, 0, 255, 0.3)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(pOrig.x, pOrig.y);
      // Quadratic curve for elegant curved flight paths
      const controlX1 = (pOrig.x + pHub.x) / 2;
      const controlY1 = Math.min(pOrig.y, pHub.y) - 25; // arch curve upwards
      ctx.quadraticCurveTo(controlX1, controlY1, pHub.x, pHub.y);
      ctx.stroke();

      // Leg 2: Stopover Hub to Destination (glowing curve)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.6)"; // cyan curve
      ctx.shadowColor = "rgba(0, 240, 255, 0.3)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(pHub.x, pHub.y);
      const controlX2 = (pHub.x + pDest.x) / 2;
      const controlY2 = Math.min(pHub.y, pDest.y) - 25; // arch curve upwards
      ctx.quadraticCurveTo(controlX2, controlY2, pDest.x, pDest.y);
      ctx.stroke();
      
      // Reset shadows
      ctx.shadowBlur = 0;

      // Draw airport beacon node rings & labels
      drawBeaconNode(pOrig.x, pOrig.y, selectedOrigin.iata, "Origin", "var(--text-primary)");
      drawBeaconNode(pDest.x, pDest.y, selectedDest.iata, "Destination", "var(--text-primary)");
      drawBeaconNode(pHub.x, pHub.y, hub.iata, `${hub.city} (${activeOption.dealTag})`, "var(--accent-cyan)");

      // Render anim flight nodes
      drawAnimatedPlane(pOrig, pHub, pDest);

      mapStatus.textContent = `${selectedOrigin.iata} ➔ ${hub.iata} ➔ ${selectedDest.iata}`;
    } else {
      mapStatus.textContent = "Awaiting route parameters";
    }
  }

  function drawBeaconNode(x, y, label, type, labelColor) {
    // Glowing circle core
    ctx.fillStyle = labelColor === "var(--accent-cyan)" ? "var(--accent-cyan)" : "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pulse outer ring
    ctx.strokeStyle = labelColor === "var(--accent-cyan)" ? "rgba(0, 240, 255, 0.3)" : "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.stroke();

    // Beacon label data box
    ctx.font = "bold 8px 'Outfit', sans-serif";
    ctx.fillStyle = labelColor;
    
    // Draw offset slightly to avoid overlaps
    ctx.fillText(label, x + 8, y - 2);
    
    ctx.font = "500 7px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "var(--text-muted)";
    ctx.fillText(type, x + 8, y + 6);
  }

  // Draw an animated flight tracking dot along the bezier curves
  function drawAnimatedPlane(pOrig, pHub, pDest) {
    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    let targetX, targetY;
    
    if (planeProgress < 0.5) {
      // First leg curve calculation (progress 0 to 0.5)
      const t = planeProgress * 2; // scale to 0..1
      const cx = (pOrig.x + pHub.x) / 2;
      const cy = Math.min(pOrig.y, pHub.y) - 25;
      
      // Quadratic Bezier interpolation formula
      targetX = (1 - t) * (1 - t) * pOrig.x + 2 * (1 - t) * t * cx + t * t * pHub.x;
      targetY = (1 - t) * (1 - t) * pOrig.y + 2 * (1 - t) * t * cy + t * t * pHub.y;
    } else {
      // Second leg curve calculation (progress 0.5 to 1)
      const t = (planeProgress - 0.5) * 2; // scale to 0..1
      const cx = (pHub.x + pDest.x) / 2;
      const cy = Math.min(pHub.y, pDest.y) - 25;
      
      targetX = (1 - t) * (1 - t) * pHub.x + 2 * (1 - t) * t * cx + t * t * pDest.x;
      targetY = (1 - t) * (1 - t) * pHub.y + 2 * (1 - t) * t * cy + t * t * pDest.y;
    }

    // Draw glowing pulsing flying particle
    ctx.shadowColor = "var(--accent-cyan)";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function startPlaneAnimation() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
    }

    function animate() {
      // Move speed
      planeProgress += 0.004;
      if (planeProgress > 1) {
        planeProgress = 0; // Loop flight path
      }

      drawRadarMap();
      animFrameId = requestAnimationFrame(animate);
    }

    animate();
  }
});
