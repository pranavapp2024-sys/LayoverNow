# 🛫 LayoverNow

> **Discover the hidden value in your flight stopovers.**

LayoverNow is a premium Chrome Extension that helps travelers discover and optimize stopover flights between any two destinations. Adjust stopover lengths in real-time, visualize routes on an interactive radar map, and consult the AeroAI Stopover Assistant for tailor-made itineraries, visa information, local transport tips, currency data, and more.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/chrome-v120%2B-brightgreen)

---

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔍 **Configure Trip** | Autocomplete origin/destination, date picker, stopover slider (1-14 days) | ✅ Complete |
| 🗺️ **Interactive Flight Radar** | Custom canvas-based visual flight tracker with animated route plotting | ✅ Complete |
| 💰 **Stopover Deals** | Real-time deals filtered by Best Value, Savings, or Minimum Detour | ✅ Complete |
| 🤖 **AeroAI Assistant** | AI-powered chatbot for visa, weather, currency, transport, and itinerary advice | ✅ Complete |
| 🌙 **Premium Dark UI** | Glassmorphism design with dark mode and smooth animations | ✅ Complete |

---

## 📂 Project Structure

```
layover-now-extension/
├── manifest.json              # Chrome Extension manifest (MV3)
├── popup.html                 # Extension popup UI
├── popup.css                  # Premium dark mode & glassmorphism styling
├── popup.js                   # Main UI controller & interactions
├── airports.js                # Airport code & coordinate database
├── search.js                  # Flight route calculation & deal heuristics
├── advisor.js                 # AeroAI guidance & chat responder engine
├── icons/                     # Extension icons (16x16, 48x48, 128x128)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── .github/
│   └── workflows/
│       ├── ci.yml             # Continuous Integration
│       └── release.yml        # Automated releases
├── docs/
│   ├── SETUP.md               # Developer setup guide
│   ├── ARCHITECTURE.md        # System architecture & design decisions
│   └── API.md                 # API integration documentation
├── tests/                     # Unit and integration tests
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
└── README.md                  # You are here!
```

---

## 🚀 Quick Start

### For Users

1. **Install from Chrome Web Store** (Coming Soon)
   - Visit the [Chrome Web Store](https://chrome.google.com/webstore) and search for "LayoverNow"
   - Click **Add to Chrome**

2. **Sideload for Development**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked** and select the `layover-now-extension` folder
   - Pin the extension to your toolbar

### For Developers

```bash
# Clone the repository
git clone https://github.com/pranavapp2024-sys/LayoverNow.git
cd LayoverNow

# Checkout the latest stable release
git checkout v1.0.0

# Load the extension in Chrome (see above)
```

See [docs/SETUP.md](docs/SETUP.md) for detailed development environment setup.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 (Glassmorphism), Vanilla JavaScript |
| **Extension Platform** | Chrome Extension Manifest V3 |
| **Canvas Rendering** | HTML5 Canvas 2D API with `requestAnimationFrame` |
| **AI Integration** | OpenAI GPT-3.5-turbo via Proxy Server |
| **Flight Data** | Amadeus API / Skyscanner Affiliate API |
| **Proxy Server** | Node.js / Express (hosted on Render) |
| **Storage** | `chrome.storage.local` (privacy-first, on-device only) |
| **CI/CD** | GitHub Actions |

---

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Setting up your development environment
- Creating feature branches
- Submitting pull requests
- Code review process

### Quick Contribution Flow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/LayoverNow.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Airport geolocation data sourced from [OurAirports](https://ourairports.com/)
- Flight search powered by [Amadeus](https://developers.amadeus.com/)
- AI responses powered by [OpenAI](https://openai.com/)
- Built with ❤️ for travelers everywhere

---

## 📬 Contact

- **Project Link**: [https://github.com/pranavapp2024-sys/LayoverNow](https://github.com/pranavapp2024-sys/LayoverNow)
- **Issues**: [GitHub Issues](https://github.com/pranavapp2024-sys/LayoverNow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pranavapp2024-sys/LayoverNow/discussions)

---

> *"The world is a book and those who do not travel read only one page."* — Augustine of Hippo
