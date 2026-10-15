# SmartCity AI — Class 8 Science Exhibition Project

A ready-to-run, responsive web application that simulates how software can help city planners explore traffic, air quality, water reserves, and emergency alerts.

## Important note
This is an educational simulation. It uses fictional readings and programmed rules; it does not use live sensors, predict real events, or control actual infrastructure or emergency services.

## Run the project

### Option A: Open directly
1. Extract the ZIP folder if you downloaded it.
2. Open `SmartCityAI`.
3. Double-click `index.html` to open it in Chrome or Edge.

### Option B: Run with Visual Studio Code
1. Install Visual Studio Code from https://code.visualstudio.com/
2. Open VS Code.
3. Choose **File → Open Folder...** and select the `SmartCityAI` folder.
4. Open `index.html` to inspect the page, `style.css` for the design, and `script.js` for the interactions.
5. For a local development server, open Extensions (`Ctrl+Shift+X`), search for **Live Server** by Ritwick Dey, install it, then right-click `index.html` and choose **Open with Live Server**.
6. Your browser should open the project. Save code changes and the browser refreshes automatically.

## How to demonstrate it
- **Normal operations:** click Overview, then choose “Normal operations”.
- **Rush-hour congestion:** click “Rush-hour congestion”; observe the traffic and pollution alerts.
- **Water shortage:** click “Water shortage”; open Water management and observe the reserve warning.
- **Traffic control:** use the traffic slider to change the simulated vehicle load.
- **Environment:** move the sample AQI slider and see the status and recommendation change.
- **Emergency center:** open Emergency response and add a Fire, Flood, Road Accident, or Power Outage test incident.
- Click **Reset demo** to return to the starting state.

## Files
- `index.html` — page content and modules
- `style.css` — responsive dark dashboard design
- `script.js` — simulation logic, sliders, alerts, scenarios, and chart
- `README.md` — this guide

## Internet note
The main dashboard and simulation code run locally. Chart.js is now bundled locally (`chart.umd.js`), so the chart works offline. Only the Google Fonts are loaded online; without internet the page uses a fallback font and everything else still works.

## Troubleshooting
- **Nothing appears:** confirm `index.html` is open in Chrome/Edge, not the CSS or JS file.
- **Buttons don't respond:** open the browser developer console (`F12` → Console) and check for errors; make sure `script.js` is in the same folder as `index.html`.
- **Chart is missing:** make sure `chart.umd.js` is in the same folder as `index.html`.
- **VS Code is showing code only:** open the HTML in a browser, or use Live Server as described above.
- **Project looks unstyled:** make sure `style.css` is in the same folder and named exactly `style.css`.

## Suggested presentation line
“My project is a SmartCity management simulator. It uses sample data and rule-based software to show how traffic, pollution, water reserves, and incident alerts could be displayed in one dashboard. It is a simulation, not a live city control system.”


## Exhibition upgrade features
- **City AI assistant:** click “Ask City AI”. It uses prepared, rule-based responses and the current simulated values; it is not a connected generative AI service.
- **Voice commands:** click “Voice” in a supported browser (typically Chrome/Edge) and allow microphone access. Example commands: “open traffic”, “open water”, “rush-hour scenario”, “water shortage”, “emergency demo”, “reset demo”, and “help”. Voice support varies by browser and may require internet.
- **Presentation mode:** click “Presentation mode” for a six-step guided exhibition tour. Use Next/Back; arrow keys also work.
- **Visual polish:** animated map scan, pulsing zones, card entrances, and reduced-motion accessibility support.
- **Project report:** see `PROJECT_REPORT.md`.
- **Viva preparation:** see `VIVA_QUESTIONS.md`.

### Suggested exhibition demonstration (2–3 minutes)
1. Start on Overview and explain that the data is fictional.
2. Open the assistant and ask “How does traffic control work?”
3. Run Rush-hour congestion and show the alert.
4. Move the AQI slider to a high value and explain the rule threshold.
5. Run Water shortage and show the reserve warning.
6. Add a test incident in Emergency center.
7. Use Presentation mode or finish by explaining limitations and future scope.

**Important:** This is a school educational simulator. It does not use real sensors, monitor a real city, control traffic signals, or contact emergency services. The assistant is rule-based and may not understand every phrasing. Do not rely on it for real safety decisions.

## Round 2 additions
- **Our team page:** Naitik More, Arjun Patil, Vedant Patil, Sayyam Dangi and Zaid Sheikh (sidebar → Our team). Also the last step of Presentation mode.
- **Live sim button:** values drift automatically so the dashboard looks alive; click again to stop.
- **Live zone status:** click a map zone to see its current status from the simulated values.
- **Presentation mode** now switches to the matching page at each step.
- **Local Chart.js**, tighter assistant keyword matching, and no duplicate fire incidents.
- Voice commands work best through Live Server (localhost), not by double-clicking the file.

## Light / dark theme
Click **☀ Light / 🌙 Dark** in the top bar (or say “light mode” / “dark mode” with voice). Your choice is remembered in the browser. The chart colors change with the theme too.
