// Dataset of major global airports for geocoding and layover calculations.
// Focuses on high-traffic international hubs and major tourism gateways.

const AIRPORTS = [
  // NORTH AMERICA
  { iata: "JFK", name: "John F. Kennedy Intl", city: "New York, NY", country: "United States", lat: 40.6413, lon: -73.7781, hubs: ["Delta", "JetBlue"], region: "NA" },
  { iata: "LAX", name: "Los Angeles Intl", city: "Los Angeles, CA", country: "United States", lat: 33.9416, lon: -118.4085, hubs: ["United", "American", "Delta"], region: "NA" },
  { iata: "ORD", name: "O'Hare Intl", city: "Chicago, IL", country: "United States", lat: 41.9742, lon: -87.9073, hubs: ["United", "American"], region: "NA" },
  { iata: "SFO", name: "San Francisco Intl", city: "San Francisco, CA", country: "United States", lat: 37.6213, lon: -122.3790, hubs: ["United"], region: "NA" },
  { iata: "MIA", name: "Miami Intl", city: "Miami, FL", country: "United States", lat: 25.7959, lon: -80.2870, hubs: ["American"], region: "NA" },
  { iata: "BOS", name: "Logan Intl", city: "Boston, MA", country: "United States", lat: 42.3656, lon: -71.0096, hubs: ["Delta", "JetBlue"], region: "NA" },
  { iata: "ATL", name: "Hartsfield-Jackson Atlanta", city: "Atlanta, GA", country: "United States", lat: 33.6407, lon: -84.4277, hubs: ["Delta"], region: "NA" },
  { iata: "DFW", name: "Dallas/Fort Worth Intl", city: "Dallas, TX", country: "United States", lat: 32.8998, lon: -97.0403, hubs: ["American"], region: "NA" },
  { iata: "SEA", name: "Seattle-Tacoma Intl", city: "Seattle, WA", country: "United States", lat: 47.4502, lon: -122.3088, hubs: ["Alaska", "Delta"], region: "NA" },
  { iata: "DEN", name: "Denver Intl", city: "Denver, CO", country: "United States", lat: 39.8561, lon: -104.6737, hubs: ["United", "Southwest"], region: "NA" },
  { iata: "EWR", name: "Newark Liberty Intl", city: "Newark, NJ", country: "United States", lat: 40.6895, lon: -74.1745, hubs: ["United"], region: "NA" },
  { iata: "IAD", name: "Washington Dulles Intl", city: "Washington, DC", country: "United States", lat: 38.9445, lon: -77.4558, hubs: ["United"], region: "NA" },
  { iata: "DCA", name: "Ronald Reagan Natl", city: "Washington, DC", country: "United States", lat: 38.8522, lon: -77.0378, hubs: ["American"], region: "NA" },
  { iata: "PHX", name: "Sky Harbor Intl", city: "Phoenix, AZ", country: "United States", lat: 33.4343, lon: -112.0083, hubs: ["American", "Southwest"], region: "NA" },
  { iata: "LAS", name: "Harry Reid Intl", city: "Las Vegas, NV", country: "United States", lat: 36.0840, lon: -115.1537, hubs: ["Southwest"], region: "NA" },
  { iata: "MCO", name: "Orlando Intl", city: "Orlando, FL", country: "United States", lat: 28.4294, lon: -81.3090, hubs: ["Southwest", "JetBlue"], region: "NA" },
  { iata: "CLT", name: "Charlotte Douglas Intl", city: "Charlotte, NC", country: "United States", lat: 35.2140, lon: -80.9431, hubs: ["American"], region: "NA" },
  { iata: "MSP", name: "Minneapolis-St. Paul Intl", city: "Minneapolis, MN", country: "United States", lat: 44.8848, lon: -93.2223, hubs: ["Delta"], region: "NA" },
  { iata: "DTW", name: "Detroit Metropolitan", city: "Detroit, MI", country: "United States", lat: 42.2125, lon: -83.3533, hubs: ["Delta"], region: "NA" },
  { iata: "SAN", name: "San Diego Intl", city: "San Diego, CA", country: "United States", lat: 32.7336, lon: -117.1897, hubs: ["Southwest"], region: "NA" },
  { iata: "IAH", name: "George Bush Intercontinental", city: "Houston, TX", country: "United States", lat: 29.9804, lon: -95.3397, hubs: ["United"], region: "NA" },
  { iata: "SLC", name: "Salt Lake City Intl", city: "Salt Lake City, UT", country: "United States", lat: 40.7884, lon: -111.9778, hubs: ["Delta"], region: "NA" },
  { iata: "BWI", name: "Baltimore/Washington Intl", city: "Baltimore, MD", country: "United States", lat: 39.1754, lon: -76.6683, hubs: ["Southwest"], region: "NA" },
  { iata: "PHL", name: "Philadelphia Intl", city: "Philadelphia, PA", country: "United States", lat: 39.8719, lon: -75.2411, hubs: ["American"], region: "NA" },
  { iata: "FLL", name: "Fort Lauderdale-Hollywood", city: "Fort Lauderdale, FL", country: "United States", lat: 26.0726, lon: -80.1527, hubs: ["JetBlue"], region: "NA" },
  { iata: "TPA", name: "Tampa Intl", city: "Tampa, FL", country: "United States", lat: 27.9755, lon: -82.5332, hubs: [], region: "NA" },
  { iata: "PDX", name: "Portland Intl", city: "Portland, OR", country: "United States", lat: 45.5886, lon: -122.5975, hubs: ["Alaska"], region: "NA" },
  { iata: "BNA", name: "Nashville Intl", city: "Nashville, TN", country: "United States", lat: 36.1245, lon: -86.6782, hubs: ["Southwest"], region: "NA" },
  { iata: "AUS", name: "Austin-Bergstrom Intl", city: "Austin, TX", country: "United States", lat: 30.1945, lon: -97.6699, hubs: [], region: "NA" },
  { iata: "HNL", name: "Daniel K. Inouye Intl", city: "Honolulu, HI", country: "United States", lat: 21.3245, lon: -157.9251, hubs: ["Hawaiian"], region: "NA" },
  { iata: "OGG", name: "Kahului Airport", city: "Kahului, HI", country: "United States", lat: 20.8986, lon: -156.4305, hubs: [], region: "NA" },
  { iata: "ANC", name: "Ted Stevens Anchorage", city: "Anchorage, AK", country: "United States", lat: 61.1744, lon: -149.9963, hubs: ["Alaska"], region: "NA" },
  { iata: "STL", name: "St. Louis Lambert Intl", city: "St. Louis, MO", country: "United States", lat: 38.7487, lon: -90.3700, hubs: ["Southwest"], region: "NA" },
  { iata: "CLE", name: "Cleveland Hopkins Intl", city: "Cleveland, OH", country: "United States", lat: 41.4117, lon: -81.8497, hubs: [], region: "NA" },
  { iata: "RDU", name: "Raleigh-Durham Intl", city: "Raleigh, NC", country: "United States", lat: 35.8776, lon: -78.7875, hubs: [], region: "NA" },
  { iata: "IND", name: "Indianapolis Intl", city: "Indianapolis, IN", country: "United States", lat: 39.7173, lon: -86.2944, hubs: [], region: "NA" },
  { iata: "MSY", name: "Louis Armstrong New Orleans", city: "New Orleans, LA", country: "United States", lat: 29.9934, lon: -90.2580, hubs: [], region: "NA" },
  { iata: "SAT", name: "San Antonio Intl", city: "San Antonio, TX", country: "United States", lat: 29.5337, lon: -98.4698, hubs: [], region: "NA" },
  { iata: "PIT", name: "Pittsburgh Intl", city: "Pittsburgh, PA", country: "United States", lat: 40.4914, lon: -80.2329, hubs: [], region: "NA" },
  { iata: "CVG", name: "Cincinnati/Northern Kentucky", city: "Cincinnati, OH", country: "United States", lat: 39.0461, lon: -84.6622, hubs: [], region: "NA" },
  { iata: "OAK", name: "Oakland Intl", city: "Oakland, CA", country: "United States", lat: 37.7213, lon: -122.2207, hubs: ["Southwest"], region: "NA" },
  { iata: "SJC", name: "San Jose Mineta Intl", city: "San Jose, CA", country: "United States", lat: 37.3626, lon: -121.9291, hubs: [], region: "NA" },

  // US CLASS C & CLASS D AIRPORTS (REGIONAL TOWERED HUBS)
  { iata: "MDT", name: "Harrisburg Intl", city: "Harrisburg, PA", country: "United States", lat: 40.1935, lon: -76.7634, hubs: [], region: "NA" },
  { iata: "BDL", name: "Bradley Intl", city: "Windsor Locks, CT", country: "United States", lat: 41.9388, lon: -72.6832, hubs: [], region: "NA" },
  { iata: "PVD", name: "Rhode Island T.F. Green", city: "Providence, RI", country: "United States", lat: 41.7240, lon: -71.4278, hubs: [], region: "NA" },
  { iata: "BTV", name: "Burlington Intl", city: "Burlington, VT", country: "United States", lat: 44.4730, lon: -73.1503, hubs: [], region: "NA" },
  { iata: "PWM", name: "Portland Intl Jetport", city: "Portland, ME", country: "United States", lat: 43.6461, lon: -70.3088, hubs: [], region: "NA" },
  { iata: "HPN", name: "Westchester County", city: "White Plains, NY", country: "United States", lat: 41.0669, lon: -73.7075, hubs: [], region: "NA" },
  { iata: "ISP", name: "Long Island MacArthur", city: "Islip, NY", country: "United States", lat: 40.7952, lon: -73.1002, hubs: [], region: "NA" },
  { iata: "BUF", name: "Buffalo Niagara Intl", city: "Buffalo, NY", country: "United States", lat: 42.9405, lon: -78.7322, hubs: [], region: "NA" },
  { iata: "ROC", name: "Frederick Douglass Greater Rochester", city: "Rochester, NY", country: "United States", lat: 43.1188, lon: -77.6724, hubs: [], region: "NA" },
  { iata: "SYR", name: "Syracuse Hancock Intl", city: "Syracuse, NY", country: "United States", lat: 43.1111, lon: -76.1063, hubs: [], region: "NA" },
  { iata: "BGR", name: "Bangor Intl", city: "Bangor, ME", country: "United States", lat: 44.8074, lon: -68.8281, hubs: [], region: "NA" },
  { iata: "ORF", name: "Norfolk Intl", city: "Norfolk, VA", country: "United States", lat: 36.8946, lon: -76.2012, hubs: [], region: "NA" },
  { iata: "CHS", name: "Charleston Intl", city: "Charleston, SC", country: "United States", lat: 32.8986, lon: -80.0405, hubs: [], region: "NA" },
  { iata: "SAV", name: "Savannah/Hilton Head Intl", city: "Savannah, GA", country: "United States", lat: 32.1275, lon: -81.2021, hubs: [], region: "NA" },
  { iata: "JAX", name: "Jacksonville Intl", city: "Jacksonville, FL", country: "United States", lat: 30.4941, lon: -81.6879, hubs: [], region: "NA" },
  { iata: "BHM", name: "Birmingham-Shuttlesworth Intl", city: "Birmingham, AL", country: "United States", lat: 33.5629, lon: -86.7535, hubs: [], region: "NA" },
  { iata: "SDF", name: "Louisville Muhammad Ali Intl", city: "Louisville, KY", country: "United States", lat: 38.1744, lon: -85.7360, hubs: ["UPS"], region: "NA" },
  { iata: "ABQ", name: "Albuquerque Intl Sunport", city: "Albuquerque, NM", country: "United States", lat: 35.0402, lon: -106.6092, hubs: [], region: "NA" },
  { iata: "TUS", name: "Tucson Intl", city: "Tucson, AZ", country: "United States", lat: 32.1161, lon: -110.9410, hubs: [], region: "NA" },
  { iata: "OKC", name: "Will Rogers World", city: "Oklahoma City, OK", country: "United States", lat: 35.3931, lon: -97.6007, hubs: [], region: "NA" },
  { iata: "TUL", name: "Tulsa Intl", city: "Tulsa, OK", country: "United States", lat: 36.1984, lon: -95.8881, hubs: [], region: "NA" },
  { iata: "DSM", name: "Des Moines Intl", city: "Des Moines, IA", country: "United States", lat: 41.5340, lon: -93.6631, hubs: [], region: "NA" },
  { iata: "OMA", name: "Eppley Airfield", city: "Omaha, NE", country: "United States", lat: 41.3025, lon: -95.8941, hubs: [], region: "NA" },
  { iata: "GRR", name: "Gerald R. Ford Intl", city: "Grand Rapids, MI", country: "United States", lat: 42.8808, lon: -85.5228, hubs: [], region: "NA" },
  { iata: "BOI", name: "Boise Air Terminal", city: "Boise, ID", country: "United States", lat: 43.5644, lon: -116.2228, hubs: [], region: "NA" },
  { iata: "RNO", name: "Reno/Tahoe Intl", city: "Reno, NV", country: "United States", lat: 39.4986, lon: -119.7681, hubs: [], region: "NA" },
  { iata: "SBA", name: "Santa Barbara Municipal", city: "Santa Barbara, CA", country: "United States", lat: 34.4262, lon: -119.8403, hubs: [], region: "NA" },
  { iata: "PSP", name: "Palm Springs Intl", city: "Palm Springs, CA", country: "United States", lat: 33.8297, lon: -116.5067, hubs: [], region: "NA" },
  { iata: "FAT", name: "Fresno Yosemite Intl", city: "Fresno, CA", country: "United States", lat: 36.7762, lon: -119.7181, hubs: [], region: "NA" },
  { iata: "GEG", name: "Spokane Intl", city: "Spokane, WA", country: "United States", lat: 47.6198, lon: -117.5338, hubs: [], region: "NA" },
  { iata: "AVP", name: "Wilkes-Barre/Scranton Intl", city: "Scranton, PA", country: "United States", lat: 41.3384, lon: -75.7233, hubs: [], region: "NA" },
  { iata: "CAK", name: "Akron-Canton", city: "Akron, OH", country: "United States", lat: 40.9161, lon: -81.4422, hubs: [], region: "NA" },
  { iata: "DAY", name: "James M. Cox Dayton Intl", city: "Dayton, OH", country: "United States", lat: 39.9024, lon: -84.2194, hubs: [], region: "NA" },
  { iata: "LIT", name: "Bill and Hillary Clinton Natl", city: "Little Rock, AR", country: "United States", lat: 34.7294, lon: -92.2247, hubs: [], region: "NA" },
  { iata: "MOB", name: "Mobile Regional", city: "Mobile, AL", country: "United States", lat: 30.6912, lon: -88.2428, hubs: [], region: "NA" },
  { iata: "HSV", name: "Huntsville Intl", city: "Huntsville, AL", country: "United States", lat: 34.6372, lon: -86.7751, hubs: [], region: "NA" },
  { iata: "CAE", name: "Columbia Metropolitan", city: "Columbia, SC", country: "United States", lat: 33.9388, lon: -81.1195, hubs: [], region: "NA" },
  { iata: "AVL", name: "Asheville Regional", city: "Asheville, NC", country: "United States", lat: 35.4362, lon: -82.5418, hubs: [], region: "NA" },
  { iata: "GSO", name: "Piedmont Triad Intl", city: "Greensboro, NC", country: "United States", lat: 36.0978, lon: -79.9372, hubs: [], region: "NA" },
  { iata: "ELP", name: "El Paso Intl", city: "El Paso, TX", country: "United States", lat: 31.8072, lon: -106.3778, hubs: [], region: "NA" },
  { iata: "MAF", name: "Midland Intl Air and Space Port", city: "Midland, TX", country: "United States", lat: 31.9425, lon: -102.2019, hubs: [], region: "NA" },
  { iata: "JAC", name: "Jackson Hole", city: "Jackson, WY", country: "United States", lat: 43.6074, lon: -110.7630, hubs: [], region: "NA" },
  { iata: "FSD", name: "Sioux Falls Regional", city: "Sioux Falls, SD", country: "United States", lat: 43.5813, lon: -96.7417, hubs: [], region: "NA" },
  { iata: "ILG", name: "Wilmington Airport", city: "Wilmington, DE", country: "United States", lat: 39.6787, lon: -75.6067, hubs: [], region: "NA" },
  { iata: "MHT", name: "Manchester-Boston Regional", city: "Manchester, NH", country: "United States", lat: 42.9297, lon: -71.4371, hubs: [], region: "NA" },
  { iata: "CRW", name: "West Virginia Intl Yeager", city: "Charleston, WV", country: "United States", lat: 38.3731, lon: -81.5931, hubs: [], region: "NA" },
  { iata: "MKE", name: "Milwaukee Mitchell Intl", city: "Milwaukee, WI", country: "United States", lat: 42.9472, lon: -87.8966, hubs: [], region: "NA" },
  { iata: "ICT", name: "Wichita Dwight D. Eisenhower National", city: "Wichita, KS", country: "United States", lat: 37.6499, lon: -97.4331, hubs: [], region: "NA" },
  { iata: "JAN", name: "Jackson-Medgar Evers Intl", city: "Jackson, MS", country: "United States", lat: 32.3111, lon: -90.0781, hubs: [], region: "NA" },
  { iata: "FAR", name: "Hector Intl", city: "Fargo, ND", country: "United States", lat: 46.9186, lon: -96.8144, hubs: [], region: "NA" },
  { iata: "BZN", name: "Bozeman Yellowstone Intl", city: "Bozeman, MT", country: "United States", lat: 45.7767, lon: -111.1531, hubs: [], region: "NA" },
  { iata: "YVR", name: "Vancouver Intl", city: "Vancouver", country: "Canada", lat: 49.1967, lon: -123.1815, hubs: ["Air Canada"], region: "NA" },
  { iata: "YYZ", name: "Toronto Pearson Intl", city: "Toronto", country: "Canada", lat: 43.6777, lon: -79.6248, hubs: ["Air Canada"], region: "NA" },
  { iata: "MEX", name: "Benito Juárez Intl", city: "Mexico City", country: "Mexico", lat: 19.4363, lon: -99.0721, hubs: ["Aeromexico"], region: "NA" },
  { iata: "CUN", name: "Cancún Intl", city: "Cancún", country: "Mexico", lat: 21.0365, lon: -86.8771, hubs: [], region: "NA" },

  // EUROPE
  { iata: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom", lat: 51.4700, lon: -0.4543, hubs: ["British Airways"], region: "EU", program: "British Airways Connection" },
  { iata: "LGW", name: "London Gatwick", city: "London", country: "United Kingdom", lat: 51.1537, lon: -0.1821, hubs: ["EasyJet"], region: "EU" },
  { iata: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France", lat: 49.0097, lon: 2.5479, hubs: ["Air France"], region: "EU" },
  { iata: "ORY", name: "Orly Airport", city: "Paris", country: "France", lat: 48.7262, lon: 2.3652, hubs: ["Transavia"], region: "EU" },
  { iata: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands", lat: 52.3105, lon: 4.7683, hubs: ["KLM"], region: "EU", program: "KLM Layover Saver" },
  { iata: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", lat: 50.0379, lon: 8.5622, hubs: ["Lufthansa"], region: "EU" },
  { iata: "MUC", name: "Munich Airport", city: "Munich", country: "Germany", lat: 48.3538, lon: 11.7861, hubs: ["Lufthansa"], region: "EU" },
  { iata: "MAD", name: "Adolfo Suárez Barajas", city: "Madrid", country: "Spain", lat: 40.4719, lon: -3.5640, hubs: ["Iberia"], region: "EU", program: "Hola Madrid Stopover" },
  { iata: "BCN", name: "El Prat", city: "Barcelona", country: "Spain", lat: 41.2974, lon: 2.0785, hubs: ["Vueling"], region: "EU" },
  { iata: "FCO", name: "Leonardo da Vinci–Fiumicino", city: "Rome", country: "Italy", lat: 41.8003, lon: 12.2389, hubs: ["ITA Airways"], region: "EU" },
  { iata: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", lat: 47.4582, lon: 8.5481, hubs: ["SWISS"], region: "EU", program: "Stopover Switzerland" },
  { iata: "VIE", name: "Vienna Intl", city: "Vienna", country: "Austria", lat: 48.1103, lon: 16.5697, hubs: ["Austrian Airlines"], region: "EU" },
  { iata: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", lat: 53.4264, lon: -6.2499, hubs: ["Aer Lingus", "Ryanair"], region: "EU" },
  { iata: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark", lat: 55.6180, lon: 12.6560, hubs: ["SAS"], region: "EU" },
  { iata: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway", lat: 60.1975, lon: 11.1004, hubs: ["SAS", "Norwegian"], region: "EU" },
  { iata: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden", lat: 59.6519, lon: 17.9186, hubs: ["SAS"], region: "EU" },
  { iata: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland", lat: 60.3172, lon: 24.9633, hubs: ["Finnair"], region: "EU", program: "Finnair Stopover" },
  { iata: "ATH", name: "Athens Eleftherios Venizelos", city: "Athens", country: "Greece", lat: 37.9356, lon: 23.9484, hubs: ["Aegean Airlines"], region: "EU" },
  { iata: "KEF", name: "Keflavík Intl", city: "Reykjavik", country: "Iceland", lat: 63.9850, lon: -22.6056, hubs: ["Icelandair"], region: "EU", program: "Icelandair Free Stopover", rating: 1.0 }, // Platinum stopover program
  { iata: "LIS", name: "Humberto Delgado", city: "Lisbon", country: "Portugal", lat: 38.7742, lon: -9.1342, hubs: ["TAP Portugal"], region: "EU", program: "TAP Portugal Free Stopover", rating: 0.9 }, // Platinum stopover
  { iata: "OPO", name: "Francisco Sá Carneiro", city: "Porto", country: "Portugal", lat: 41.2421, lon: -8.6786, hubs: ["TAP Portugal"], region: "EU", program: "TAP Portugal Free Stopover" },
  { iata: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey", lat: 41.2753, lon: 28.7519, hubs: ["Turkish Airlines"], region: "EU", program: "Turkish Airlines Stopover Service", rating: 0.8 }, // Great stopover program

  // MIDDLE EAST
  { iata: "DXB", name: "Dubai Intl", city: "Dubai", country: "United Arab Emirates", lat: 25.2532, lon: 55.3657, hubs: ["Emirates"], region: "ME", program: "Emirates Dubai Stopover", rating: 0.9 },
  { iata: "DOH", name: "Hamad Intl", city: "Doha", country: "Qatar", lat: 25.2611, lon: 51.5650, hubs: ["Qatar Airways"], region: "ME", program: "Qatar Airways Stopover", rating: 0.9 },
  { iata: "AUH", name: "Abu Dhabi Intl", city: "Abu Dhabi", country: "United Arab Emirates", lat: 24.4330, lon: 54.6511, hubs: ["Etihad"], region: "ME", program: "Etihad Free Stopover", rating: 0.9 },
  { iata: "MCT", name: "Muscat Intl", city: "Muscat", country: "Oman", lat: 23.5933, lon: 58.2844, hubs: ["Oman Air"], region: "ME" },
  { iata: "RUH", name: "King Khalid Intl", city: "Riyadh", country: "Saudi Arabia", lat: 24.9576, lon: 46.6988, hubs: ["Saudia"], region: "ME", program: "Saudia Stopover Transit Visa" },
  { iata: "JED", name: "King Abdulaziz Intl", city: "Jeddah", country: "Saudi Arabia", lat: 21.6796, lon: 39.1565, hubs: ["Saudia"], region: "ME" },
  { iata: "TLV", name: "Ben Gurion", city: "Tel Aviv", country: "Israel", lat: 32.0055, lon: 34.8854, hubs: ["El Al"], region: "ME" },

  // ASIA
  { iata: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore", lat: 1.3644, lon: 103.9915, hubs: ["Singapore Airlines", "Scoot"], region: "AS", program: "Changi Stopover Experience", rating: 0.95 },
  { iata: "HKG", name: "Hong Kong Intl", city: "Hong Kong", country: "Hong Kong", lat: 22.3080, lon: 113.9185, hubs: ["Cathay Pacific"], region: "AS" },
  { iata: "ICN", name: "Seoul Incheon", city: "Seoul", country: "South Korea", lat: 37.4602, lon: 126.4407, hubs: ["Korean Air", "Asiana"], region: "AS", program: "Korea Free Transit Tour", rating: 0.8 },
  { iata: "HND", name: "Tokyo Haneda", city: "Tokyo", country: "Japan", lat: 35.5494, lon: 139.7798, hubs: ["ANA", "Japan Airlines"], region: "AS", program: "JAL Stopover Japan" },
  { iata: "NRT", name: "Tokyo Narita", city: "Tokyo", country: "Japan", lat: 35.7720, lon: 140.3929, hubs: ["ANA", "Japan Airlines"], region: "AS" },
  { iata: "KIX", name: "Kansai Intl", city: "Osaka", country: "Japan", lat: 34.4320, lon: 135.2304, hubs: ["Peach"], region: "AS" },
  { iata: "TPE", name: "Taoyuan Intl", city: "Taipei", country: "Taiwan", lat: 25.0797, lon: 121.2342, hubs: ["EVA Air", "China Airlines", "Starlux"], region: "AS", program: "Taiwan Half-Day Tour" },
  { iata: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand", lat: 13.6896, lon: 100.7501, hubs: ["Thai Airways"], region: "AS" },
  { iata: "DMK", name: "Don Mueang Intl", city: "Bangkok", country: "Thailand", lat: 13.9126, lon: 100.6068, hubs: ["AirAsia"], region: "AS" },
  { iata: "KUL", name: "Kuala Lumpur Intl", city: "Kuala Lumpur", country: "Malaysia", lat: 2.7456, lon: 101.7072, hubs: ["Malaysia Airlines", "AirAsia"], region: "AS" },
  { iata: "CGK", name: "Soekarno-Hatta", city: "Jakarta", country: "Indonesia", lat: -6.1256, lon: 106.6558, hubs: ["Garuda Indonesia"], region: "AS" },
  { iata: "DPS", name: "Ngurah Rai (Bali)", city: "Denpasar", country: "Indonesia", lat: -8.7482, lon: 115.1672, hubs: [], region: "AS" },
  { iata: "MNL", name: "Ninoy Aquino Intl", city: "Manila", country: "Philippines", lat: 14.5086, lon: 121.0194, hubs: ["Philippine Airlines"], region: "AS" },
  { iata: "SGN", name: "Tan Son Nhat", city: "Ho Chi Minh City", country: "Vietnam", lat: 10.8185, lon: 106.6518, hubs: ["Vietnam Airlines"], region: "AS" },
  { iata: "HAN", name: "Noi Bai", city: "Hanoi", country: "Vietnam", lat: 21.2212, lon: 105.8072, hubs: ["Vietnam Airlines"], region: "AS" },
  { iata: "DEL", name: "Indira Gandhi Intl", city: "Delhi", country: "India", lat: 28.5562, lon: 77.1000, hubs: ["Air India", "IndiGo"], region: "AS" },
  { iata: "BOM", name: "Chhatrapati Shivaji", city: "Mumbai", country: "India", lat: 19.0896, lon: 72.8656, hubs: ["Air India", "IndiGo"], region: "AS" },
  { iata: "BLR", name: "Kempegowda Intl", city: "Bengaluru", country: "India", lat: 13.1986, lon: 77.7068, hubs: ["IndiGo"], region: "AS" },
  { iata: "PEK", name: "Beijing Capital Intl", city: "Beijing", country: "China", lat: 40.0799, lon: 116.5904, hubs: ["Air China"], region: "AS", program: "72/144-Hour Visa-Free Transit" },
  { iata: "PKX", name: "Beijing Daxing Intl", city: "Beijing", country: "China", lat: 39.5098, lon: 116.4105, hubs: ["China Southern"], region: "AS" },
  { iata: "PVG", name: "Shanghai Pudong", city: "Shanghai", country: "China", lat: 31.1443, lon: 121.8083, hubs: ["China Eastern"], region: "AS", program: "72/144-Hour Visa-Free Transit" },
  { iata: "CAN", name: "Guangzhou Baiyun", city: "Guangzhou", country: "China", lat: 23.3924, lon: 113.2988, hubs: ["China Southern"], region: "AS" },
  { iata: "SZX", name: "Shenzhen Bao'an", city: "Shenzhen", country: "China", lat: 22.6393, lon: 113.8107, hubs: ["Shenzhen Airlines"], region: "AS" },

  // OCEANIA
  { iata: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia", lat: -33.9461, lon: 151.1772, hubs: ["Qantas", "Virgin Australia"], region: "OC" },
  { iata: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia", lat: -37.6733, lon: 144.8433, hubs: ["Qantas", "Virgin Australia"], region: "OC" },
  { iata: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia", lat: -27.3842, lon: 153.1175, hubs: ["Qantas", "Virgin Australia"], region: "OC" },
  { iata: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand", lat: -37.0081, lon: 174.7917, hubs: ["Air New Zealand"], region: "OC" },
  { iata: "CHC", name: "Christchurch Airport", city: "Christchurch", country: "New Zealand", lat: -43.4894, lon: 172.5322, hubs: ["Air New Zealand"], region: "OC" },
  { iata: "NAN", name: "Nadi Intl", city: "Nadi", country: "Fiji", lat: -17.7554, lon: 177.4434, hubs: ["Fiji Airways"], region: "OC", program: "Fiji Airways Stopover" },
  { iata: "PPT", name: "Faa'a Intl", city: "Papeete", country: "French Polynesia", lat: -17.5566, lon: -149.6114, hubs: ["Air Tahiti Nui"], region: "OC" },

  // SOUTH/CENTRAL AMERICA & CARIBBEAN
  { iata: "GRU", name: "Guarulhos Intl", city: "São Paulo", country: "Brazil", lat: -23.4356, lon: -46.4731, hubs: ["LATAM", "GOL"], region: "SA" },
  { iata: "GIG", name: "Galeão Intl", city: "Rio de Janeiro", country: "Brazil", lat: -22.8100, lon: -43.2506, hubs: ["GOL"], region: "SA" },
  { iata: "EZE", name: "Ministro Pistarini", city: "Buenos Aires", country: "Argentina", lat: -34.8222, lon: -58.5358, hubs: ["Aerolíneas Argentinas"], region: "SA" },
  { iata: "SCL", name: "Arturo Merino Benítez", city: "Santiago", country: "Chile", lat: -33.3930, lon: -70.7857, hubs: ["LATAM"], region: "SA" },
  { iata: "LIM", name: "Jorge Chávez Intl", city: "Lima", country: "Peru", lat: -12.0219, lon: -77.1143, hubs: ["LATAM Peru"], region: "SA" },
  { iata: "BOG", name: "El Dorado Intl", city: "Bogotá", country: "Colombia", lat: 4.7016, lon: -74.1469, hubs: ["Avianca"], region: "SA", program: "Avianca Bogotá Stopover" },
  { iata: "PTY", name: "Tocumen Intl", city: "Panama City", country: "Panama", lat: 9.0714, lon: -79.3835, hubs: ["Copa Airlines"], region: "SA", program: "Panama Stopover (Copa)", rating: 0.85 }, // Great Hub stopover connecting Americas
  { iata: "SJO", name: "Juan Santamaría", city: "San José", country: "Costa Rica", lat: 9.9939, lon: -84.2088, hubs: [], region: "SA" },
  { iata: "SJU", name: "Luis Muñoz Marín", city: "San Juan", country: "Puerto Rico", lat: 18.4394, lon: -66.0018, hubs: [], region: "SA" },

  // AFRICA
  { iata: "JNB", name: "O.R. Tambo Intl", city: "Johannesburg", country: "South Africa", lat: -26.1367, lon: 28.2460, hubs: ["South African Airways"], region: "AF" },
  { iata: "CPT", name: "Cape Town Intl", city: "Cape Town", country: "South Africa", lat: -33.9748, lon: 18.6017, hubs: [], region: "AF" },
  { iata: "ADD", name: "Bole Intl", city: "Addis Ababa", country: "Ethiopia", lat: 8.9779, lon: 38.7993, hubs: ["Ethiopian Airlines"], region: "AF", program: "Ethiopian Airlines Stopover", rating: 0.75 },
  { iata: "CAI", name: "Cairo Intl", city: "Cairo", country: "Egypt", lat: 30.1219, lon: 31.3997, hubs: ["EgyptAir"], region: "AF" },
  { iata: "CMN", name: "Mohammed V Intl", city: "Casablanca", country: "Morocco", lat: 33.3675, lon: -7.5897, hubs: ["Royal Air Maroc"], region: "AF", program: "RAM Stopover Program" },
  { iata: "NBO", name: "Jomo Kenyatta Intl", city: "Nairobi", country: "Kenya", lat: -1.3192, lon: 36.9275, hubs: ["Kenya Airways"], region: "AF" },
  { iata: "MRU", name: "Sir Seewoosagur Ramgoolam", city: "Mauritius", country: "Mauritius", lat: -20.4300, lon: 57.6830, hubs: ["Air Mauritius"], region: "AF" }
];

// Helper functions for lookup
function findAirportByIata(iata) {
  if (!iata) return null;
  return AIRPORTS.find(a => a.iata.toUpperCase() === iata.toUpperCase().trim()) || null;
}

function searchAirports(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  return AIRPORTS.filter(a => 
    a.iata.toLowerCase().includes(q) ||
    a.city.toLowerCase().includes(q) ||
    a.name.toLowerCase().includes(q) ||
    a.country.toLowerCase().includes(q)
  ).slice(0, 5); // Return top 5 matches
}

// In environment where code runs directly, make this available on window object.
if (typeof window !== "undefined") {
  window.AIRPORTS = AIRPORTS;
  window.findAirportByIata = findAirportByIata;
  window.searchAirports = searchAirports;
}

// Support Node or ES6 modules if loaded via require/import
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AIRPORTS, findAirportByIata, searchAirports };
}
