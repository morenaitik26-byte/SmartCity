/* SmartCity AI - educational, rule-based city simulation. All values are fictional. */
const $ = (id) => document.getElementById(id);
const defaults = { traffic: 42, aqi: 58, water: 68 };
let state = { ...defaults, incidents: [], selectedZone: "Green Park" };
let cityChart = null;
let toastTimer;

const pages = {
  overview: ["City overview", "A live-style simulation for a smarter, safer city."],
  traffic: ["Traffic control", "Test how changing traffic conditions affects the system's recommendation."],
  environment: ["Environment monitor", "Explore sample air-quality data and threshold-based alerts."],
  water: ["Water management", "Monitor a fictional reservoir and test shortage warnings."],
  emergency: ["Emergency response center", "Explore a simulated incident queue and response priorities."],
  team: ["Our team", "The students behind SmartCity AI."]
};

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function statusForTraffic(v) {
  if (v >= 75) return { label: "Heavy congestion", level: "bad", advice: "High simulated demand. Consider a longer green phase on the busiest road and encourage alternate routes." };
  if (v >= 50) return { label: "Busy", level: "warn", advice: "Traffic is building. Monitor the junction and consider a small timing adjustment." };
  return { label: "Flowing", level: "good", advice: "Traffic is moving normally. Keep standard signal timing." };
}
function statusForAQI(v) {
  if (v >= 201) return { label: "Very high", level: "bad", advice: "The sample value is very high. Display a strong warning and recommend checking official local air-quality guidance." };
  if (v >= 151) return { label: "High", level: "bad", advice: "The sample reading is high. Recommend checking official local guidance and reducing avoidable pollution." };
  if (v >= 101) return { label: "Elevated", level: "warn", advice: "The sample reading is elevated. Continue monitoring and investigate likely pollution sources." };
  if (v <= 50) return { label: "Good", level: "good", advice: "The sample reading is in the lower range. Continue routine monitoring." };
  return { label: "Moderate", level: "good", advice: "Continue monitoring the sample reading." };
}
function statusForWater(v) {
  if (v < 25) return { label: "Critical reserve", level: "bad", advice: "Reserve is very low. Recommend checking for leaks, prioritising essential use, and sharing conservation guidance.", action: "Prioritise essential use, inspect for leaks, and communicate conservation advice." };
  if (v < 45) return { label: "Low reserve", level: "warn", advice: "Water reserve is low. Recommend conservation and closer monitoring.", action: "Encourage careful water use and monitor the reserve more frequently." };
  return { label: "Healthy reserve", level: "good", advice: "Supply is in the healthy range for this demonstration.", action: "Continue routine monitoring and avoid unnecessary wastage." };
}
function getAlerts() {
  const a = [];
  const t = statusForTraffic(state.traffic);
  const q = statusForAQI(state.aqi);
  const w = statusForWater(state.water);
  if (t.level !== "good") a.push({ title: t.label + " detected", description: "Traffic index is " + state.traffic + "%. " + t.advice, level: t.level, icon: "⇄" });
  if (q.level !== "good" || state.aqi > 100) a.push({ title: "Air-quality advisory", description: "Sample AQI is " + state.aqi + ". " + q.advice, level: q.level, icon: "♧" });
  if (w.level !== "good") a.push({ title: w.label, description: "Reservoir is at " + state.water + "%. " + w.advice, level: w.level, icon: "◉" });
  state.incidents.forEach(item => a.push({ title: item.name, description: item.description, level: "bad", icon: "⚠" }));
  return a;
}
function setPill(el, label, level) {
  el.textContent = label;
  el.className = "status-pill " + level;
}
function renderAlerts() {
  const alerts = getAlerts();
  $("alertMetric").textContent = alerts.length;
  $("alertCountLabel").textContent = alerts.length + " ACTIVE";
  $("alertStatus").textContent = alerts.length ? "Needs attention" : "All systems normal";
  $("alertBar").style.width = Math.min(100, alerts.length * 20 + 5) + "%";
  const list = $("alertList");
  if (!alerts.length) {
    list.innerHTML = '<div class="empty-alerts"><span>✓</span><strong>All systems looking good</strong><p>No active rule-based alerts in this scenario.</p></div>';
    return;
  }
  list.innerHTML = alerts.map(a => `<div class="alert-item"><div class="alert-symbol ${a.level}">${a.icon}</div><div><strong>${escapeHtml(a.title)}</strong><p>${escapeHtml(a.description)}</p></div></div>`).join("");
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[ch]));
}
function updateChart() {
  if (!cityChart) return;
  cityChart.data.datasets[0].data = [state.traffic, Math.round(state.aqi / 3), state.water, Math.min(100, state.incidents.length * 25)];
  cityChart.update();
}
function render() {
  const t = statusForTraffic(state.traffic), q = statusForAQI(state.aqi), w = statusForWater(state.water);
  $("trafficMetric").textContent = state.traffic;
  $("trafficStatus").textContent = t.label;
  $("trafficStatus").className = "status-pill " + t.level;
  $("trafficBar").style.width = state.traffic + "%";
  $("aqiMetric").textContent = state.aqi;
  $("aqiStatus").textContent = q.label;
  $("aqiStatus").className = "status-pill " + q.level;
  $("aqiBar").style.width = Math.min(100, state.aqi / 3) + "%";
  $("waterMetric").textContent = state.water;
  $("waterStatus").textContent = w.label;
  $("waterStatus").className = "status-pill " + w.level;
  $("waterBar").style.width = state.water + "%";

  $("trafficSlider").value = state.traffic;
  $("trafficSliderValue").textContent = state.traffic;
  $("trafficResult").textContent = state.traffic + "%";
  setPill($("trafficResultStatus"), t.label, t.level);
  $("trafficRecommendation").textContent = t.advice;
  $("signalStatus").textContent = state.traffic >= 75 ? "Red — congestion warning" : state.traffic >= 50 ? "Yellow — traffic building" : "Green — normal flow";
  $("signalAdvice").textContent = t.advice;
  $("redLight").classList.toggle("lit", state.traffic >= 75);
  $("yellowLight").classList.toggle("lit", state.traffic >= 50 && state.traffic < 75);
  $("greenLight").classList.toggle("lit", state.traffic < 50);

  $("aqiSlider").value = state.aqi;
  $("aqiSliderValue").textContent = state.aqi;
  $("aqiResult").innerHTML = `${state.aqi} <small>AQI</small>`;
  setPill($("aqiResultStatus"), q.label, q.level);
  $("aqiRecommendation").textContent = q.advice;

  $("waterSlider").value = state.water;
  $("waterSliderValue").textContent = state.water;
  $("waterResult").textContent = state.water + "%";
  setPill($("waterResultStatus"), w.label, w.level);
  $("waterRecommendation").textContent = w.advice;
  $("waterAction").textContent = w.action;
  $("waterFill").style.height = state.water + "%";
  $("waterFillText").textContent = state.water + "%";

  renderAlerts();
  renderIncidents();
  updateChart();
  updateZoneStatus();
}
function renderIncidents() {
  const list = $("incidentList");
  $("incidentCount").textContent = state.incidents.length + (state.incidents.length === 1 ? " INCIDENT" : " INCIDENTS");
  if (!state.incidents.length) {
    list.innerHTML = '<div class="empty-state"><span>✓</span><strong>No test incidents</strong><p>Choose an incident to see the response workflow.</p></div>';
    return;
  }
  list.innerHTML = state.incidents.map(item => `<div class="incident-card"><div class="incident-card-top"><strong>${escapeHtml(item.name)}</strong><span class="priority">${escapeHtml(item.priority)}</span></div><p>${escapeHtml(item.description)}</p><button data-dismiss="${item.id}">Dismiss test incident</button></div>`).join("");
  list.querySelectorAll("[data-dismiss]").forEach(btn => btn.addEventListener("click", () => {
    state.incidents = state.incidents.filter(item => item.id !== Number(btn.dataset.dismiss));
    render(); showToast("Test incident dismissed.");
  }));
}
function setView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  $(name + "View").classList.add("active");
  $("pageTitle").textContent = pages[name][0];
  $("pageSubtitle").textContent = pages[name][1];
}
function setScenario(name) {
  if (name === "normal") { state = { ...defaults, incidents: [], selectedZone: state.selectedZone }; showToast("Normal city conditions restored."); }
  if (name === "rush") { state.traffic = 88; state.aqi = 112; showToast("Rush-hour scenario started."); }
  if (name === "drought") { state.water = 18; showToast("Water shortage scenario started."); }
  if (name === "emergency") { if (!state.incidents.some(i => i.name === "Fire reported")) addIncident("Fire reported"); showToast("Emergency demonstration started."); }
  render();
}
function addIncident(name) {
  const info = {
    "Fire reported": { priority: "HIGH PRIORITY", description: "Suggested demo workflow: notify the fictional response team, identify the affected zone, and keep access routes clear." },
    "Flood warning": { priority: "HIGH PRIORITY", description: "Suggested demo workflow: display a flood warning, review low-lying zones, and share official safety guidance." },
    "Road accident": { priority: "HIGH PRIORITY", description: "Suggested demo workflow: flag the road zone, recommend checking safe access routes, and notify the fictional response team." },
    "Power outage": { priority: "MEDIUM", description: "Suggested demo workflow: mark the affected zone and prioritise essential services in the simulation." }
  };
  const d = info[name];
  state.incidents.unshift({ id: Date.now() + Math.floor(Math.random()*1000), name, priority: d.priority, description: d.description });
}
function initChart() {
  const canvas = $("cityChart");
  if (!canvas || typeof Chart === "undefined") {
    const wrap = document.querySelector(".chart-wrap");
    if (wrap) wrap.innerHTML = '<p class="muted">Chart library could not load. Internet is needed for this chart; the other simulation features still work.</p>';
    return;
  }
  cityChart = new Chart(canvas, {
    type: "bar",
    data: { labels: ["Traffic load", "AQI ÷ 3", "Water reserve", "Incident index"], datasets: [{ label: "Illustrative index", data: [state.traffic, Math.round(state.aqi/3), state.water, 0], backgroundColor: ["#60a5fa", "#34d399", "#22d3ee", "#fb923c"], borderRadius: 6, borderSkipped: false, maxBarThickness: 38 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: "#13253a", titleColor: "#edf5ff", bodyColor: "#c4d6e8", padding: 11 } }, scales: { x: { ticks: { color: "#8ca3ba", font: { family: "DM Sans", size: 10 } }, grid: { display: false }, border: { display: false } }, y: { beginAtZero: true, max: 100, ticks: { color: "#7890a8", stepSize: 25, font: { size: 10 } }, grid: { color: "#203247" }, border: { display: false } } } }
  });
}
document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.view)));
$("trafficSlider").addEventListener("input", e => { state.traffic = Number(e.target.value); render(); });
$("aqiSlider").addEventListener("input", e => { state.aqi = Number(e.target.value); render(); });
$("waterSlider").addEventListener("input", e => { state.water = Number(e.target.value); render(); });
document.querySelectorAll("[data-scenario]").forEach(btn => btn.addEventListener("click", () => setScenario(btn.dataset.scenario)));
document.querySelectorAll("[data-incident]").forEach(btn => btn.addEventListener("click", () => { addIncident(btn.dataset.incident); render(); showToast("Test incident added to the queue."); }));
$("clearIncidents").addEventListener("click", () => { state.incidents = []; render(); showToast("Test incidents cleared."); });
$("resetBtn").addEventListener("click", () => { state = { ...defaults, incidents: [], selectedZone: "Green Park" }; render(); setView("overview"); showToast("Demo reset to default values."); });
document.querySelectorAll("[data-zone]").forEach(btn => btn.addEventListener("click", () => {
  state.selectedZone = btn.dataset.zone;
  document.querySelectorAll("[data-zone]").forEach(z => z.classList.toggle("selected", z === btn));
  const zoneDescriptions = {
    "Green Park": "Park zone selected. Review sample environment indicators and green-space conditions.",
    "School District": "School zone selected. Simulated focus: safe routes, air quality, and essential services.",
    "Medical Center": "Medical zone selected. Emergency access and service continuity are important priorities.",
    "Market Square": "Market zone selected. This is the main traffic hub in the fictional city.",
    "Water Reservoir": "Reservoir zone selected. Use Water management to test supply warnings."
  };
  $("zoneInfo").querySelector("strong").textContent = btn.dataset.zone;
  $("zoneInfo").querySelector("p").dataset.base = zoneDescriptions[btn.dataset.zone];
  updateZoneStatus();
}));
function updateClock() { $("clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }); }
initChart();
render();
updateClock();
setInterval(updateClock, 1000);


/* === Exhibition upgrade features === */
const presentationSteps = [
  { title: "Welcome to SmartCity AI", text: "This is a software-only smart city simulator. It demonstrates how city indicators, rule-based alerts, and interactive scenarios can help people understand urban planning." },
  { title: "Traffic control", text: "Change the traffic load slider or choose Rush-hour congestion. The simulator applies thresholds and recommends a response. It does not operate real traffic lights." },
  { title: "Environment and water", text: "Adjust the sample AQI and reservoir level. When a value crosses a threshold, the dashboard changes status and creates an explanatory alert." },
  { title: "Emergency response", text: "Add a fictional incident to the queue. The app displays a suggested workflow and priority to show how a digital incident dashboard might be organised." },
  { title: "What makes it useful?", text: "A real smart city may combine sensors, reliable data, communication networks, and human decision-making. This prototype focuses on the software logic; all displayed readings are fictional." }
];
let presentationIndex = 0;
["overview","traffic","environment","emergency","overview"].forEach((v, i) => presentationSteps[i].view = v);
presentationSteps.push({ title: "Meet the team", text: "SmartCity AI was built by Naitik More, Arjun Patil, Vedant Patil, Sayyam Dangi and Zaid Sheikh for the Class 8 Science Exhibition. Thank you for visiting our project!", view: "team" });

function showPresentationStep() {
  const step = presentationSteps[presentationIndex];
  if (step.view) setView(step.view);
  $("presentationStepNumber").textContent = `STEP ${presentationIndex + 1} OF ${presentationSteps.length}`;
  $("presentationTitle").textContent = step.title;
  $("presentationText").textContent = step.text;
  $("presentationProgress").style.width = `${((presentationIndex + 1) / presentationSteps.length) * 100}%`;
  $("presentationPrev").disabled = presentationIndex === 0;
  $("presentationNext").textContent = presentationIndex === presentationSteps.length - 1 ? "Finish ✓" : "Next →";
}
function openPresentation() {
  presentationIndex = 0;
  showPresentationStep();
  $("presentationOverlay").hidden = false;
  document.body.classList.add("presentation-active");
}
function closePresentation() {
  $("presentationOverlay").hidden = true;
  document.body.classList.remove("presentation-active");
}
$("presentBtn").addEventListener("click", openPresentation);
$("presentationClose").addEventListener("click", closePresentation);
$("presentationPrev").addEventListener("click", () => {
  if (presentationIndex > 0) presentationIndex--;
  showPresentationStep();
});
$("presentationNext").addEventListener("click", () => {
  if (presentationIndex < presentationSteps.length - 1) {
    presentationIndex++;
    showPresentationStep();
  } else {
    closePresentation();
    showToast("Exhibition tour complete. You're ready to explain the demo!");
  }
});
$("presentationOverlay").addEventListener("click", e => {
  if (e.target === $("presentationOverlay")) closePresentation();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closePresentation(); $("chatPanel").hidden = true; }
  if (!$("presentationOverlay").hidden && e.key === "ArrowRight") $("presentationNext").click();
  if (!$("presentationOverlay").hidden && e.key === "ArrowLeft") $("presentationPrev").click();
});

function cityAnswer(question) {
  const q = question.toLowerCase();
  if (/traffic|congestion|vehicle|signal|road/.test(q)) {
    const t = statusForTraffic(state.traffic);
    return `Traffic load is currently ${state.traffic}% in this simulation (${t.label}). ${t.advice} Try the Traffic control page or the Rush-hour scenario.`;
  }
  if (/aqi|air|pollution|environment/.test(q)) {
    const a = statusForAQI(state.aqi);
    return `The sample AQI is ${state.aqi} (${a.label}). ${a.advice} This is fictional demo data, not a real measurement.`;
  }
  if (/water|reservoir|drought|shortage/.test(q)) {
    const w = statusForWater(state.water);
    return `The simulated reservoir is ${state.water}% full (${w.label}). ${w.action} Try the Water shortage scenario to see the warning.`;
  }
  if (/alert|incident|emergency|fire|flood|accident/.test(q)) {
    const count = getAlerts().length;
    return `There are ${count} active rule-based alert(s) in the current scenario and ${state.incidents.length} test incident(s) in the queue. These are only simulated; no emergency services are contacted.`;
  }
  if (/team|who (made|built|created)|student/.test(q)) return "SmartCity AI was built by Naitik More, Arjun Patil, Vedant Patil, Sayyam Dangi and Zaid Sheikh for the Class 8 Science Exhibition. Open the Our team page to see them.";
  if (!/\bai\b/.test(q) && /how|work|project|technology|code|built/.test(q)) {
    return "SmartCity AI is built with HTML for structure, CSS for styling and animations, and JavaScript for state, thresholds, scenarios, charts, and interactions. A real deployment would need validated live data, secure systems, and human oversight.";
  }
  if (/\bai\b|artificial intelligence|machine learning/.test(q)) {
    return "This exhibition assistant is rule-based, not a connected generative AI model. It matches keywords to prepared answers and reads the current simulated values. This keeps the demo free, offline-friendly, and predictable.";
  }
  if (/real|live|actual|sensor/.test(q)) {
    return "No real sensors, city databases, traffic lights, or emergency services are connected. All values and incidents are fictional examples for a school exhibition.";
  }
  if (/\b(hello|hi|hey)\b/.test(q)) {
    return "Hello! I'm the SmartCity demo assistant. Ask me about traffic, AQI, water, emergency alerts, or how the project works.";
  }
  return "I can explain traffic control, AQI, water reserves, alerts, emergency scenarios, or the project technology. Try asking: “How does traffic control work?”";
}
function addChatMessage(text, who) {
  const node = document.createElement("div");
  node.className = `chat-bubble ${who}`;
  node.textContent = text;
  $("chatMessages").appendChild(node);
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
}
function sendChat(text) {
  const clean = String(text || "").trim().slice(0, 240);
  if (!clean) return;
  addChatMessage(clean, "user");
  addChatMessage(cityAnswer(clean), "bot");
}
$("chatLauncher").addEventListener("click", () => {
  $("chatPanel").hidden = !$("chatPanel").hidden;
  if (!$("chatPanel").hidden) $("chatInput").focus();
});
$("chatClose").addEventListener("click", () => $("chatPanel").hidden = true);
$("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  sendChat($("chatInput").value);
  $("chatInput").value = "";
});
document.querySelectorAll("[data-chat-prompt]").forEach(btn => btn.addEventListener("click", () => sendChat(btn.dataset.chatPrompt)));

function runVoiceCommand(command) {
  const q = command.toLowerCase();
  if (/light (mode|theme)/.test(q)) { setTheme("light"); return "Switched to light theme."; }
  if (/dark (mode|theme)/.test(q)) { setTheme("dark"); return "Switched to dark theme."; }
  if (/rush|traffic jam|congestion/.test(q)) { setScenario("rush"); setView("overview"); return "Started the rush-hour scenario."; }
  if (/drought|water shortage|low water/.test(q)) { setScenario("drought"); setView("overview"); return "Started the water shortage scenario."; }
  if (/emergency|fire|incident/.test(q)) { setScenario("emergency"); setView("emergency"); return "Started the emergency demo."; }
  if (/normal|reset|restore/.test(q)) { $("resetBtn").click(); return "Restored normal demo conditions."; }
  if (/traffic/.test(q)) { setView("traffic"); return "Opened traffic control."; }
  if (/environment|air|aqi|pollution/.test(q)) { setView("environment"); return "Opened the environment monitor."; }
  if (/water|reservoir/.test(q)) { setView("water"); return "Opened water management."; }
  if (/help|commands/.test(q)) return "Try saying: open traffic, open water, rush-hour scenario, water shortage, emergency demo, or reset demo.";
  return "Command not recognised. Say help to hear example commands.";
}
let voiceRecognition = null;
$("voiceBtn").addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Voice commands need a supported browser, such as Chrome or Edge.");
    addChatMessage("Voice commands aren't available in this browser. Try Chrome or Edge, then allow microphone access.", "bot");
    $("chatPanel").hidden = false;
    return;
  }
  if (voiceRecognition) { try { voiceRecognition.stop(); } catch (_) {} }
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.lang = "en-IN";
  voiceRecognition.interimResults = false;
  voiceRecognition.maxAlternatives = 1;
  voiceRecognition.onstart = () => showToast("Listening… try saying “open traffic” or “water shortage”.");
  voiceRecognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    const result = runVoiceCommand(transcript);
    showToast(result);
    $("chatPanel").hidden = false;
    addChatMessage(`Voice command: “${transcript}”`, "user");
    addChatMessage(result + " Say “help” for supported commands.", "bot");
  };
  voiceRecognition.onerror = event => showToast(`Voice command unavailable: ${event.error}. You can still use the buttons.`);
  voiceRecognition.start();
});


/* === Round 2: live zone status, live simulation === */
function updateZoneStatus() {
  const p = $("zoneInfo").querySelector("p");
  if (!p.dataset.base) p.dataset.base = p.textContent;
  const z = state.selectedZone;
  let s;
  if (z === "Market Square") s = statusForTraffic(state.traffic), s.txt = "traffic " + state.traffic + "%";
  else if (z === "Water Reservoir") s = statusForWater(state.water), s.txt = "reserve " + state.water + "%";
  else if (z === "Medical Center") s = { label: state.incidents.length ? "Incidents active" : "Clear", level: state.incidents.length ? "bad" : "good", txt: state.incidents.length + " test incident(s)" };
  else s = statusForAQI(state.aqi), s.txt = "AQI " + state.aqi;
  p.textContent = p.dataset.base + " Live status: " + s.label + " (" + s.txt + ").";
  $("zoneInfo").querySelector(".zone-indicator").style.background = { good: "#34d399", warn: "#fbbf24", bad: "#fb7185" }[s.level];
}
let liveTimer = null;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
$("liveBtn").addEventListener("click", () => {
  if (liveTimer) { clearInterval(liveTimer); liveTimer = null; $("liveBtn").textContent = "〰 Live sim"; showToast("Live simulation stopped."); return; }
  $("liveBtn").textContent = "■ Stop sim";
  showToast("Live simulation running: sample values drift randomly.");
  liveTimer = setInterval(() => {
    const r = n => Math.round((Math.random() - 0.5) * 2 * n);
    state.traffic = clamp(state.traffic + r(7), 0, 100);
    state.aqi = clamp(state.aqi + r(9), 0, 300);
    state.water = clamp(state.water + r(2), 0, 100);
    render();
  }, 1800);
});


/* === Round 3: light / dark theme === */
function applyTheme(t) {
  const light = t === "light";
  document.documentElement.dataset.theme = light ? "light" : "dark";
  $("themeBtn").textContent = light ? "🌙 Dark" : "☀ Light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = light ? "#eef3f9" : "#07111f";
  if (cityChart) {
    const tick = light ? "#4a6078" : "#8ca3ba", s = cityChart.options.scales, tip = cityChart.options.plugins.tooltip;
    s.x.ticks.color = tick; s.y.ticks.color = tick;
    s.y.grid.color = light ? "#d5e0ec" : "#203247";
    tip.backgroundColor = light ? "#ffffff" : "#13253a";
    tip.titleColor = light ? "#0f2237" : "#edf5ff";
    tip.bodyColor = light ? "#3d5269" : "#c4d6e8";
    tip.borderColor = light ? "#d5e0ec" : "transparent"; tip.borderWidth = 1;
    cityChart.update();
  }
}
function setTheme(t) { applyTheme(t); try { localStorage.setItem("sc-theme", t); } catch (_) {} }
$("themeBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
  showToast((next === "light" ? "Light" : "Dark") + " theme on.");
});
applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
