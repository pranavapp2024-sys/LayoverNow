# LayoverNow - Flight Stopover Discovery Hub

**LayoverNow** is a premium, interactive Chrome extension designed to help travelers discover and optimize stopover flights between any two destinations. Adjust stopover lengths in real-time, visualize the routes on an interactive radar map, and consult the AeroAI Stopover Assistant for tailor-made itineraries, visa information, local transport tips, currency data, and more.

---

## ✨ Features

- **Configure Trip**: Seamless autocomplete origin and destination input fields, flight date picker, and a slider to adjust stopover lengths (1-14 days).
- **Interactive Flight Radar**: Custom canvas-based visual flight tracker map plotting flight paths and active coordinates.
- **Stopover Deals**: Real-time deals filtered by **Best Value**, **Savings**, or **Minimum Detour**.
- **AeroAI Stopover Assistant**:
  - Live visa requirements assessment and transit guidelines.
  - Up-to-date currency and weather forecasts.
  - Interactive custom day-by-day layover itinerary generation.
  - **AeroAI Chatbot**: Conversational assistant to query transport, hotels, and layover hacks.

---

## 📂 Project Structure

```bash
layover-finder-extension/
├── manifest.json       # Chrome extension metadata, permissions, and icons config
├── popup.html          # Structure and UI elements of the extension popup
├── popup.css           # Premium dark mode & glassmorphism styling
├── popup.js            # Main extension UI controller & interactions
├── airports.js         # Airport code & coordinate database
├── search.js           # Flight route calculation & layout heuristics
├── advisor.js          # AeroAI guidance & chat responder engine
├── generate_icons.js   # Script to generate placeholder icon assets
├── generate_icons.ps1  # PowerShell equivalent script for icon assets
├── icons/              # Folder housing extension icons (16x16, 48x48, 128x128)
└── .gitignore          # File exclusions list for Git
```

---

## 🛠️ Chrome Extension Installation

To run this extension locally in your Google Chrome browser:

1. Open Google Chrome.
2. Navigate to `chrome://extensions/` by typing it in the address bar.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the `layover-finder-extension` folder.
6. The extension is now installed! Pin it to your toolbar and click it to open the dashboard.

---

## 🚀 How to Upload to GitHub

Here are the step-by-step methods to upload this code to your GitHub account:

### Option A: Using the GitHub Web Interface (Easiest, No installation needed)
1. Go to [github.com](https://github.com) and log in.
2. Click **New** (or the **+** icon in the top right -> **New repository**).
3. Name your repository (e.g., `layover-now-extension`) and click **Create repository**.
4. In your new repository page, click the link that says **"uploading an existing file"**.
5. Drag and drop all the files from this folder (excluding `.git` or local system files) into the upload area.
6. Click **Commit changes** to save them.

### Option B: Using GitHub Desktop (Highly Recommended)
1. Download and install [GitHub Desktop](https://desktop.github.com/).
2. Open GitHub Desktop and click **File** -> **Add Local Repository**.
3. Select the folder `layover-finder-extension`.
4. GitHub Desktop will warn you that this folder isn't a Git repository; click **create a repository** in that folder to initialize it.
5. Enter a name and description, then click **Create Repository**.
6. Review your files, write a commit message (e.g., `Initial commit`), and click **Commit to main**.
7. Click **Publish Repository** in the top bar to upload it directly to your GitHub account.

### Option C: Using Git command line (If Git is installed)
Run the following commands in your terminal inside this project directory:
```bash
# Initialize local repository
git init

# Add all files to the staging area
git add .

# Create the initial commit
git commit -m "Initial commit of LayoverNow extension"

# Rename default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push your code to GitHub
git push -u origin main
```
