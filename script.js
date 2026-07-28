"use strict";

/**
 * DualShield application controller.
 * All state is ephemeral and remains in memory. Nothing is stored or transmitted.
 */
(() => {
  const appState = {
    selectedMode: null,
    currentSimulation: "sms",
    progressStep: 3,
    simulationCompleted: false,
    simulationRunId: 0,
    futureFlags: {
      phase4Ready: false,
      secureSimulationEnabled: false,
      vulnerableSimulationEnabled: false,
      dashboardEnabled: false
    }
  };

  const modeContent = {
    secure: {
      label: "Secure Mode active",
      title: "Protected Environment",
      description: "Layered safeguards inspect the fictional request and help the user make a safer decision.",
      icon: "✓",
      controls: [
        ["URL reputation checking", "Evaluates whether a destination is known or suspicious."],
        ["Email filtering", "Screens suspicious patterns before a message reaches the user."],
        ["Browser protection", "Displays warnings when a page or link appears unsafe."],
        ["Security awareness", "Helps users recognize manipulation and verify unusual requests."],
        ["Multi-factor authentication", "Adds another verification layer beyond a password."],
        ["Safe browsing habits", "Encourages deliberate checks before opening links or sharing data."]
      ]
    },
    vulnerable: {
      label: "Vulnerable Mode active",
      title: "Unprotected Environment",
      description: "Missing safeguards allow the fictional request to progress without meaningful checks.",
      icon: "!",
      controls: [
        ["No phishing detection", "Suspicious message patterns are not identified."],
        ["No verification", "The sender and destination are accepted without checking."],
        ["Unsafe user behavior", "Urgency drives action before careful evaluation."],
        ["High risk of credential theft", "Sensitive information would be exposed in a real incident."],
        ["Poor security awareness", "Common social-engineering indicators go unnoticed."],
        ["Weak protection", "No layered controls exist to interrupt the attempt."]
      ]
    }
  };

  const timelineContent = {
    secure: {
      label: "Defensive response",
      statusTitle: "Protected",
      statusBadge: "Protection Active",
      statusIcon: "◆",
      riskLevel: "Low",
      riskPercent: 5,
      score: 95,
      exposure: 5,
      completeIcon: "✓",
      completeTitle: "Threat blocked successfully",
      outcome: "Layered defenses and safe user behavior prevented the fictional attempt.",
      indicators: [
        ["Firewall Active", true],
        ["URL Reputation Enabled", true],
        ["Email Filtering Active", true],
        ["Safe User Behavior", true]
      ],
      steps: [
        ["✉", "Message received", "A suspicious fictional message reaches the protected environment."],
        ["⌁", "URL reputation scan", "The destination is checked before the user can proceed."],
        ["◎", "Email filter detects indicators", "Urgency and sender inconsistencies raise a warning."],
        ["!", "Browser warning displayed", "The user receives a clear visual safety alert."],
        ["♙", "User recognizes phishing signs", "Awareness supports the technical protection layers."],
        ["✓", "Threat blocked successfully", "URL blocked, user protected, and credentials remain secure."]
      ]
    },
    vulnerable: {
      label: "Risk awareness sequence",
      statusTitle: "Unprotected",
      statusBadge: "At Risk",
      statusIcon: "!",
      riskLevel: "High",
      riskPercent: 75,
      score: 25,
      exposure: 75,
      completeIcon: "!",
      completeTitle: "Risk demonstrated safely",
      outcome: "Poor security awareness and missing protection layers increase cyber risk.",
      indicators: [
        ["Firewall Disabled", false],
        ["Unsafe Link Opened", false],
        ["No Verification", false],
        ["User Ignored Warning", false]
      ],
      steps: [
        ["✉", "User opens phishing message", "The fictional request is viewed without protective filtering."],
        ["!", "Warning signs ignored", "Urgency and the unusual sender are not investigated."],
        ["↗", "Suspicious verification clicked", "The simulated link is followed without checking its destination."],
        ["⌑", "Information exposure illustrated", "Fictional placeholders show what could be placed at risk."],
        ["◎", "Impact explained", "Ignored warnings may lead to credential exposure in a real incident."],
        ["!", "Simulation complete", "The scenario demonstrates the cost of missing controls and unsafe choices."]
      ]
    }
  };

  const learningContent = [
    ["♙", "Verify sender identity", "Confirm unexpected requests using a trusted contact method."],
    ["⌁", "Inspect URLs", "Read the complete destination and look for misspellings or unusual domains."],
    ["◇", "Enable MFA", "Use an additional authentication factor to reduce account risk."],
    ["↻", "Keep browsers updated", "Security updates help browsers recognize and block known threats."],
    ["◎", "Think before clicking", "Pause and evaluate the request, especially when it feels urgent."],
    ["!", "Do not panic", "Artificial urgency is designed to interrupt careful decision-making."]
  ];

  const dashboardProfiles = {
    secure: {
      kpis: [
        ["!", "Threats Detected", 6, "", "↑ 100%", "All simulated indicators identified"],
        ["◆", "Blocked Attacks", 1, "", "↑ 1", "Fictional attempt interrupted"],
        ["♙", "User Awareness", 94, "%", "↑ 18%", "Strong recognition behavior"],
        ["◇", "Protection Level", 95, "%", "↑ 24%", "Layered controls enabled"],
        ["▲", "Risk Score", 5, "%", "↓ 70%", "Low simulated exposure"],
        ["✓", "Security Health", 96, "%", "Stable", "Environment operating safely"]
      ],
      metrics: [["Threat Detection", 98], ["URL Reputation", 96], ["Browser Protection", 94], ["Email Security", 97], ["User Awareness", 94], ["Overall Protection", 95]],
      bars: [["Email Threat", 82], ["SMS Threat", 68], ["Credential Exposure Risk", 5], ["User Awareness", 94], ["Browser Protection", 94], ["Firewall Status", 100]],
      threat: "Low",
      result: "Threat Blocked",
      summary: "Defensive technology and informed user behavior worked together to stop the fictional phishing attempt.",
      matrixCell: "low-low"
    },
    vulnerable: {
      kpis: [
        ["!", "Threats Detected", 1, "", "↓ 83%", "Most indicators went unnoticed"],
        ["◆", "Blocked Attacks", 0, "", "↓ 1", "No defensive interruption"],
        ["♙", "User Awareness", 25, "%", "↓ 55%", "Warning signs were ignored"],
        ["◇", "Protection Level", 25, "%", "↓ 65%", "Critical controls unavailable"],
        ["▲", "Risk Score", 75, "%", "↑ 70%", "High simulated exposure"],
        ["!", "Security Health", 28, "%", "At Risk", "Immediate improvement recommended"]
      ],
      metrics: [["Threat Detection", 18], ["URL Reputation", 10], ["Browser Protection", 22], ["Email Security", 15], ["User Awareness", 25], ["Overall Protection", 25]],
      bars: [["Email Threat", 88], ["SMS Threat", 76], ["Credential Exposure Risk", 75], ["User Awareness", 25], ["Browser Protection", 22], ["Firewall Status", 8]],
      threat: "High",
      result: "Risk Demonstrated",
      summary: "Missing safeguards and rushed decisions allowed the fictional scenario to progress, illustrating why layered security matters.",
      matrixCell: "high-high"
    }
  };

  const recommendations = [
    ["◇", "Enable Multi-Factor Authentication", "Add a second verification step so a password alone cannot grant access."],
    ["⌁", "Inspect URLs Carefully", "Check the complete domain before following any unexpected link."],
    ["♙", "Verify Sender Identity", "Use a trusted channel to confirm unusual or urgent requests."],
    ["↗", "Avoid Unknown Links", "Navigate to an official website directly instead of using message links."],
    ["↻", "Update Software", "Install security updates for browsers and devices promptly."],
    ["⌑", "Use Password Managers", "Generate unique credentials and avoid reusing passwords."],
    ["◆", "Enable Browser Security", "Keep built-in safe-browsing and warning features active."]
  ];

  const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const select = (selector, scope = document) => scope.querySelector(selector);
  let lastFocusedElement = null;
  let toastTimer = null;

  function setMenuState(isOpen) {
    const toggle = select("[data-nav-toggle]");
    toggle?.setAttribute("aria-expanded", String(isOpen));
    toggle?.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    select("[data-nav-menu]")?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  function initializeNavigation() {
    const header = select("[data-header]");
    const toggle = select("[data-nav-toggle]");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);

    toggle?.addEventListener("click", () => {
      setMenuState(toggle.getAttribute("aria-expanded") !== "true");
    });

    selectAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        selectAll(".nav-link").forEach((item) => item.classList.remove("is-active"));
        link.classList.add("is-active");
        setMenuState(false);
      });
    });

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function switchSimulation(type) {
    if (!["sms", "email"].includes(type)) return;
    appState.currentSimulation = type;

    selectAll("[data-simulation-tab]").forEach((tab) => {
      const selected = tab.dataset.simulationTab === type;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    selectAll("[data-simulation-view]").forEach((view) => {
      const selected = view.dataset.simulationView === type;
      view.classList.toggle("is-active", selected);
      view.hidden = !selected;
    });
  }

  function showIndicators() {
    const indicators = selectAll("[data-indicator-list] li");
    const button = select("[data-reveal-indicators]");
    button.disabled = true;
    button.innerHTML = '<span aria-hidden="true">✓</span> Indicators Revealed';

    indicators.forEach((indicator, index) => {
      window.setTimeout(() => indicator.classList.add("is-revealed"), index * 170);
    });
  }

  function getFocusableElements(container) {
    return selectAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])', container)
      .filter((element) => !element.hidden);
  }

  function openEducationModal(trigger) {
    const modal = select("[data-education-modal]");
    lastFocusedElement = trigger;
    modal.hidden = false;
    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      modal.classList.add("is-open");
      select("[data-modal-dialog]")?.focus();
    });
  }

  function closeEducationModal() {
    const modal = select("[data-education-modal]");
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");

    window.setTimeout(() => {
      modal.hidden = true;
      lastFocusedElement?.focus();
    }, 200);
  }

  function updateSimulationState(updates = {}) {
    Object.entries(updates).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(appState, key)) appState[key] = value;
    });
    updateProgress();
  }

  function updateProgress() {
    selectAll("[data-progress] li").forEach((step, index) => {
      step.classList.toggle("is-complete", index < appState.progressStep - 1);
      step.classList.toggle("is-active", index === appState.progressStep - 1);
      if (index === appState.progressStep - 1) {
        step.setAttribute("aria-current", "step");
      } else {
        step.removeAttribute("aria-current");
      }
    });
  }

  function createControlItem([title, description], mode) {
    const item = document.createElement("li");
    const symbol = document.createElement("span");
    const copy = document.createElement("div");
    const heading = document.createElement("strong");
    const detail = document.createElement("small");

    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = mode === "secure" ? "✓" : "!";
    heading.textContent = title;
    detail.textContent = description;
    copy.append(heading, detail);
    item.append(symbol, copy);
    return item;
  }

  function renderArchitecture(mode) {
    const outcome = select("[data-flow-outcome]");
    const paths = mode === "secure"
      ? [
          ["Firewall", "Defensive filter"],
          ["URL Reputation", "Destination check"],
          ["Safe", "Attempt interrupted"]
        ]
      : [
          ["Ignored Warning", "No intervention"],
          ["Potential Compromise", "Simulation only"]
        ];

    outcome.replaceChildren();
    outcome.className = `flow-outcome ${mode}-flow`;

    paths.forEach(([title, label], index) => {
      const node = document.createElement("div");
      const small = document.createElement("small");
      const strong = document.createElement("strong");
      small.textContent = label;
      strong.textContent = title;
      node.className = "branch-node";
      node.style.setProperty("--flow-index", index);
      node.append(small, strong);
      outcome.append(node);

      if (index < paths.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "branch-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        outcome.append(arrow);
      }
    });
  }

  function showModeExplanation(mode) {
    const content = modeContent[mode];
    const panel = select("[data-mode-information]");
    const empty = select("[data-mode-empty]");
    const body = select("[data-mode-content]");
    const controls = select("[data-mode-controls]");

    panel.className = `mode-information ${mode}-information`;
    empty.hidden = true;
    body.hidden = false;
    select("[data-mode-info-icon]").textContent = content.icon;
    select("[data-mode-info-label]").textContent = content.label;
    select("[data-mode-info-title]").textContent = content.title;
    select("[data-mode-info-description]").textContent = content.description;
    controls.replaceChildren(...content.controls.map((item) => createControlItem(item, mode)));
    renderArchitecture(mode);
  }

  function updateModeUI() {
    const mode = appState.selectedMode;
    selectAll("[data-mode-option]").forEach((card) => {
      const selected = card.dataset.modeOption === mode;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-checked", String(selected));
      card.tabIndex = selected || !mode ? 0 : -1;
    });

    const status = select("[data-mode-status]");
    status.className = `state-chip ${mode ? `${mode}-status` : ""}`;
    status.innerHTML = mode
      ? `<i></i>${mode === "secure" ? "Protected environment" : "At-risk environment"}`
      : "<i></i>No mode selected";

    select("[data-ready-title]").textContent =
      mode ? `${mode === "secure" ? "Secure" : "Vulnerable"} Mode is ready` : "Choose a mode to continue";
    select("[data-ready-description]").textContent =
      mode ? "The configuration is held in memory and is ready for the Phase 4 placeholder."
        : "Your selection stays in memory only while this page is open.";

    showModeExplanation(mode);
  }

  function showToast(title, message, tone = "info") {
    const toast = select("[data-mode-toast]");
    select("[data-toast-title]", toast).textContent = title;
    select("[data-toast-message]", toast).textContent = message;
    toast.className = `mode-toast ${tone}-toast is-visible`;

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function selectMode(mode) {
    if (!modeContent[mode]) return;
    updateSimulationState({
      selectedMode: mode,
      progressStep: 3,
      simulationCompleted: false
    });
    updateModeUI();
    showToast(
      `${mode === "secure" ? "Secure" : "Vulnerable"} Mode Activated`,
      mode === "secure" ? "Defensive architecture is now selected." : "Unprotected architecture is now selected.",
      mode
    );
  }

  function prepareNextPhase() {
    if (!appState.selectedMode) {
      showToast("Choose an Environment", "Select Secure Mode or Vulnerable Mode before continuing.", "warning");
      select("[data-mode-option]")?.focus();
      return;
    }

    appState.futureFlags.phase4Ready = true;
    runSimulation();
  }

  function delay(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }

  function resetExecutionUI() {
    select("[data-execution-content]").hidden = true;
    select("[data-initializer]").hidden = false;
    const exposure = select("[data-fictional-exposure]");
    exposure.hidden = true;
    exposure.classList.remove("is-visible");
    select("[data-simulation-results]").hidden = true;
    select("[data-learning-panel]").hidden = true;
    select("[data-restart-actions]").hidden = true;
    select("[data-timeline-complete]").hidden = true;
    select("[data-execution-timeline]").replaceChildren();
    select("[data-learning-cards]").replaceChildren();
    selectAll("[data-init-check]").forEach((item) => item.classList.remove("is-complete", "is-active"));
    const progress = select("[data-initializer-progress]");
    progress.setAttribute("aria-valuenow", "0");
    select("span", progress).style.width = "0%";
  }

  async function runInitialization(runId) {
    const messages = [
      "Checking security environment...",
      "Loading phishing scenario...",
      "Preparing simulation...",
      "Analyzing protection layers..."
    ];
    const progress = select("[data-initializer-progress]");

    for (let index = 0; index < messages.length; index += 1) {
      if (runId !== appState.simulationRunId) return false;
      const item = select(`[data-init-check="${index}"]`);
      item.classList.add("is-active");
      select("[data-initializer-message]").textContent = messages[index];
      const value = (index + 1) * 25;
      progress.setAttribute("aria-valuenow", String(value));
      select("span", progress).style.width = `${value}%`;
      await delay(600);
      item.classList.remove("is-active");
      item.classList.add("is-complete");
    }
    return runId === appState.simulationRunId;
  }

  function updateStatusPanel(mode) {
    const content = timelineContent[mode];
    const panel = select("[data-security-status]");
    panel.className = `security-status ${mode}-status-panel`;
    select("[data-status-icon]").textContent = content.statusIcon;
    select("[data-status-title]").textContent = content.statusTitle;
    select("[data-status-badge]").textContent = content.statusBadge;
    select("[data-risk-level]").textContent = content.riskLevel;
    select("[data-risk-fill]").style.width = `${content.riskPercent}%`;

    const indicators = content.indicators.map(([label, positive]) => {
      const item = document.createElement("li");
      const icon = document.createElement("span");
      icon.textContent = positive ? "✓" : "×";
      icon.setAttribute("aria-hidden", "true");
      item.className = positive ? "positive" : "negative";
      item.append(icon, label);
      return item;
    });
    select("[data-live-indicators]").replaceChildren(...indicators);
  }

  function createTimelineStep(step, index, mode) {
    const item = document.createElement("li");
    const marker = document.createElement("span");
    const copy = document.createElement("div");
    const number = document.createElement("small");
    const title = document.createElement("strong");
    const description = document.createElement("p");

    item.className = `timeline-event ${mode}-event`;
    marker.className = "timeline-marker";
    marker.textContent = step[0];
    marker.setAttribute("aria-hidden", "true");
    number.textContent = `Step ${index + 1}`;
    title.textContent = step[1];
    description.textContent = step[2];
    copy.append(number, title, description);
    item.append(marker, copy);
    return item;
  }

  async function renderTimeline(mode, runId) {
    const content = timelineContent[mode];
    const timeline = select("[data-execution-timeline]");
    select("[data-timeline-label]").textContent = content.label;

    for (let index = 0; index < content.steps.length; index += 1) {
      if (runId !== appState.simulationRunId) return false;
      const item = createTimelineStep(content.steps[index], index, mode);
      timeline.append(item);
      window.requestAnimationFrame(() => item.classList.add("is-visible"));
      select("[data-timeline-counter]").textContent = `${index + 1} / ${content.steps.length}`;

      if (mode === "vulnerable" && index === 3) {
        const exposure = select("[data-fictional-exposure]");
        exposure.hidden = false;
        window.requestAnimationFrame(() => exposure.classList.add("is-visible"));
      }
      await delay(650);
    }
    return runId === appState.simulationRunId;
  }

  function calculateSimulationScore(mode) {
    const content = timelineContent[mode];
    select("[data-security-score]").textContent = `${content.score}%`;
    select("[data-exposure-score]").textContent = `${content.exposure}%`;
    select("[data-security-score-bar]").style.width = `${content.score}%`;
    select("[data-exposure-score-bar]").style.width = `${content.exposure}%`;
  }

  function showLearningCards() {
    const cards = learningContent.map(([icon, title, description], index) => {
      const article = document.createElement("article");
      const symbol = document.createElement("span");
      const heading = document.createElement("h4");
      const copy = document.createElement("p");
      symbol.textContent = icon;
      symbol.setAttribute("aria-hidden", "true");
      heading.textContent = title;
      copy.textContent = description;
      article.style.setProperty("--card-index", index);
      article.append(symbol, heading, copy);
      return article;
    });
    select("[data-learning-cards]").replaceChildren(...cards);
  }

  function finishSimulation(mode) {
    const content = timelineContent[mode];
    const complete = select("[data-timeline-complete]");
    select("[data-complete-icon]").textContent = content.completeIcon;
    select("[data-complete-title]").textContent = content.completeTitle;
    select("[data-complete-outcome]").textContent = content.outcome;
    complete.className = `timeline-complete ${mode}-complete`;
    complete.hidden = false;

    calculateSimulationScore(mode);
    showLearningCards();
    select("[data-simulation-results]").hidden = false;
    select("[data-learning-panel]").hidden = false;
    select("[data-restart-actions]").hidden = false;
    updateSimulationState({ progressStep: 4, simulationCompleted: true });
    complete.focus();
    window.setTimeout(() => initializeDashboard(mode), 500);
  }

  async function runSimulation() {
    const mode = appState.selectedMode;
    if (!mode) return;
    appState.simulationRunId += 1;
    const runId = appState.simulationRunId;
    resetExecutionUI();

    const section = select("[data-execution-section]");
    section.hidden = false;
    section.className = `execution section ${mode}-execution`;
    select("[data-execution-mode-badge]").textContent =
      `${mode === "secure" ? "◆ Secure" : "▲ Vulnerable"} Mode`;
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (!await runInitialization(runId)) return;
    select("[data-initializer]").hidden = true;
    select("[data-execution-content]").hidden = false;
    updateStatusPanel(mode);
    if (!await renderTimeline(mode, runId)) return;
    finishSimulation(mode);
  }

  function resetSimulation(mode = appState.selectedMode) {
    if (!modeContent[mode]) return;
    selectMode(mode);
    updateSimulationState({ progressStep: 3, simulationCompleted: false });
    runSimulation();
  }

  function generateSimulationID() {
    const values = new Uint32Array(2);
    window.crypto.getRandomValues(values);
    return `SIM-${values[0].toString(16).slice(0, 4).toUpperCase()}-${values[1].toString(16).slice(0, 6).toUpperCase()}`;
  }

  function animateCounter(element, target, suffix = "") {
    const start = performance.now();
    const duration = 900;
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  }

  function renderKpis(profile) {
    const cards = profile.kpis.map(([icon, label, value, suffix, trend, description], index) => {
      const card = document.createElement("article");
      card.className = "kpi-card";
      card.style.setProperty("--kpi-index", index);
      card.innerHTML = `<div class="kpi-top"><span aria-hidden="true">${icon}</span><small>${trend}</small></div><strong>0${suffix}</strong><h3>${label}</h3><p>${description}</p>`;
      window.setTimeout(() => animateCounter(select("strong", card), value, suffix), index * 90);
      return card;
    });
    select("[data-kpi-grid]").replaceChildren(...cards);
  }

  function renderMetricRings(profile) {
    const circumference = 2 * Math.PI * 38;
    const rings = profile.metrics.map(([label, value]) => {
      const item = document.createElement("div");
      item.className = "metric-ring";
      item.innerHTML = `<div><svg viewBox="0 0 92 92" aria-hidden="true"><circle cx="46" cy="46" r="38"></circle><circle class="metric-ring-value" cx="46" cy="46" r="38"></circle></svg><strong>${value}%</strong></div><span>${label}</span>`;
      const circle = select(".metric-ring-value", item);
      circle.style.strokeDasharray = String(circumference);
      circle.style.strokeDashoffset = String(circumference);
      window.requestAnimationFrame(() => { circle.style.strokeDashoffset = String(circumference * (1 - value / 100)); });
      return item;
    });
    select("[data-metric-rings]").replaceChildren(...rings);
  }

  function renderSecurityBars(profile) {
    const bars = profile.bars.map(([label, value]) => {
      const item = document.createElement("div");
      item.className = "soc-bar";
      item.innerHTML = `<div><span>${label}</span><strong>${value}%</strong></div><div class="soc-bar-track"><i></i></div>`;
      window.requestAnimationFrame(() => { select("i", item).style.width = `${value}%`; });
      return item;
    });
    select("[data-security-bars]").replaceChildren(...bars);
  }

  function updateRiskMatrix(profile, mode) {
    selectAll("[data-risk-matrix] [data-cell]").forEach((cell) => cell.classList.remove("is-current"));
    select(`[data-cell="${profile.matrixCell}"]`)?.classList.add("is-current");
    const label = select("[data-matrix-label]");
    label.textContent = mode === "secure" ? "Low Risk" : "High Risk";
    label.className = mode === "secure" ? "matrix-low" : "matrix-high";
  }

  function renderCharts(profile) {
    const charts = [
      ["Threat Distribution", [["Email", profile.bars[0][1]], ["SMS", profile.bars[1][1]], ["Other", 12]]],
      ["Risk Comparison", [["Protected", 100 - profile.kpis[4][2]], ["Exposed", profile.kpis[4][2]]]],
      ["Protection vs Awareness", [["Protection", profile.metrics[5][1]], ["Awareness", profile.metrics[4][1]]]]
    ].map(([title, data]) => {
      const article = document.createElement("article");
      const heading = document.createElement("h4");
      const plot = document.createElement("div");
      heading.textContent = title;
      plot.className = "mini-chart";
      data.forEach(([label, value]) => {
        const bar = document.createElement("div");
        bar.innerHTML = `<span>${label}</span><i><b style="height:${value}%"></b></i><strong>${value}%</strong>`;
        plot.append(bar);
      });
      article.append(heading, plot);
      return article;
    });
    select("[data-charts]").replaceChildren(...charts);
  }

  function renderRecommendations() {
    const cards = recommendations.map(([icon, title, description]) => {
      const card = document.createElement("article");
      card.innerHTML = `<span aria-hidden="true">${icon}</span><div><h4>${title}</h4><p>${description}</p></div>`;
      return card;
    });
    select("[data-recommendations]").replaceChildren(...cards);
  }

  async function populateEventLog() {
    const log = select("[data-event-log]");
    log.replaceChildren();
    const now = new Date();
    const events = ["Simulation Started", `${appState.currentSimulation.toUpperCase()} Message Loaded`, "Warning Indicators Displayed", `${appState.selectedMode === "secure" ? "Secure" : "Vulnerable"} Mode Selected`, "Simulation Completed", "Dashboard Generated"];
    for (let index = 0; index < events.length; index += 1) {
      const line = document.createElement("p");
      const eventTime = new Date(now.getTime() - (events.length - index) * 4000).toLocaleTimeString([], { hour12: false });
      line.innerHTML = `<time>[${eventTime}]</time> <span>${events[index]}</span>`;
      log.append(line);
      log.scrollTop = log.scrollHeight;
      await delay(180);
    }
  }

  function renderDashboardTimeline() {
    selectAll("[data-dashboard-timeline] li").forEach((node, index) => {
      window.setTimeout(() => node.classList.add("is-visible"), index * 130);
    });
  }

  function initializeDashboard(mode) {
    const profile = dashboardProfiles[mode];
    const dashboard = select("[data-dashboard]");
    const simulationId = generateSimulationID();
    appState.futureFlags.dashboardEnabled = true;
    appState.dashboard = { simulationId, timestamp: new Date().toISOString() };
    dashboard.hidden = false;
    dashboard.className = `soc-dashboard section ${mode}-dashboard`;
    select("[data-dashboard-date]").textContent = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    select("[data-simulation-id]").textContent = simulationId;
    select("[data-overview-mode]").textContent = mode === "secure" ? "Secure" : "Vulnerable";
    select("[data-overview-duration]").textContent = "≈ 6.3 seconds";
    select("[data-overview-threat]").textContent = profile.threat;
    select("[data-overview-result]").textContent = profile.result;
    select("[data-overview-summary]").textContent = profile.summary;
    select("[data-overview-badge]").textContent = `${mode === "secure" ? "◆" : "▲"} ${mode} mode`;
    select("[data-overview-badge]").className = `${mode}-overview-badge`;
    renderKpis(profile);
    renderMetricRings(profile);
    renderSecurityBars(profile);
    updateRiskMatrix(profile, mode);
    renderCharts(profile);
    renderRecommendations();
    renderDashboardTimeline();
    populateEventLog();
    const protection = profile.metrics[5][1];
    const circumference = 2 * Math.PI * 57;
    const circle = select("[data-main-gauge-circle]");
    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(circumference);
    window.requestAnimationFrame(() => { circle.style.strokeDashoffset = String(circumference * (1 - protection / 100)); });
    animateCounter(select("[data-main-gauge-value]"), protection, "%");
  }

  function downloadSummary() {
    if (!appState.dashboard || !appState.selectedMode) return;
    const profile = dashboardProfiles[appState.selectedMode];
    const content = [
      "DUALSHIELD EDUCATIONAL SIMULATION SUMMARY",
      "========================================",
      `Simulation Mode: ${appState.selectedMode === "secure" ? "Secure" : "Vulnerable"}`,
      `Threat Level: ${profile.threat}`,
      `Protection Score: ${profile.metrics[5][1]}%`,
      `Timestamp: ${appState.dashboard.timestamp}`,
      `Simulation ID: ${appState.dashboard.simulationId}`,
      "",
      "Recommendations:",
      ...recommendations.map((item) => `- ${item[1]}: ${item[2]}`),
      "",
      "All values are fictional and generated for cybersecurity education."
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${appState.dashboard.simulationId}-summary.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function initializeAccordion() {
    const trigger = select("[data-accordion-trigger]");
    const content = select("[data-accordion-content]");
    trigger?.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      content.hidden = expanded;
    });
  }

  function initializeSimulation() {
    select("[data-start-button]")?.addEventListener("click", () => {
      select("#simulation")?.scrollIntoView({ behavior: "smooth" });
    });

    selectAll("[data-simulation-tab]").forEach((tab) => {
      tab.addEventListener("click", () => switchSimulation(tab.dataset.simulationTab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const next = tab.dataset.simulationTab === "sms" ? "email" : "sms";
        switchSimulation(next);
        select(`[data-simulation-tab="${next}"]`)?.focus();
      });
    });

    select("[data-reveal-indicators]")?.addEventListener("click", showIndicators);
    selectAll("[data-verify-action]").forEach((button) => {
      button.addEventListener("click", () => openEducationModal(button));
    });

    select("[data-modal-close]")?.addEventListener("click", closeEducationModal);
    select("[data-modal-return]")?.addEventListener("click", closeEducationModal);
    select("[data-modal-continue]")?.addEventListener("click", () => {
      closeEducationModal();
      window.setTimeout(() => select("#environment")?.scrollIntoView({ behavior: "smooth" }), 220);
    });

    const modal = select("[data-education-modal]");
    modal?.addEventListener("click", (event) => {
      if (event.target === modal) closeEducationModal();
    });
  }

  function initializeModeSelector() {
    const cards = selectAll("[data-mode-option]");
    cards.forEach((card) => {
      card.addEventListener("click", () => selectMode(card.dataset.modeOption));
      card.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        const nextMode = card.dataset.modeOption === "secure" ? "vulnerable" : "secure";
        selectMode(nextMode);
        select(`[data-mode-option="${nextMode}"]`)?.focus();
      });
    });

    select("[data-continue-button]")?.addEventListener("click", prepareNextPhase);
    selectAll("[data-try-mode]").forEach((button) => {
      button.addEventListener("click", () => resetSimulation(button.dataset.tryMode));
    });
    select("[data-restart-simulation]")?.addEventListener("click", () => resetSimulation());
    select("[data-download-summary]")?.addEventListener("click", downloadSummary);
    select("[data-print-report]")?.addEventListener("click", () => window.print());
    select("[data-dashboard-restart]")?.addEventListener("click", () => resetSimulation());
    initializeAccordion();
  }

  function initializeGlobalKeyboardHandling() {
    document.addEventListener("keydown", (event) => {
      const modal = select("[data-education-modal]");
      if (event.key === "Escape" && !modal.hidden) {
        closeEducationModal();
        return;
      }
      if (event.key !== "Tab" || modal.hidden) return;

      const dialog = select("[data-modal-dialog]");
      const focusable = getFocusableElements(dialog);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function initializeApp() {
    initializeNavigation();
    initializeSimulation();
    initializeModeSelector();
    initializeGlobalKeyboardHandling();
    switchSimulation(appState.currentSimulation);
    updateProgress();

    const year = select("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    // TODO (Final Phase): Apply final visual polish and advanced animations.
    // TODO (Final Phase): Add an accessible theme switcher and keyboard shortcuts.
    // TODO (Final Phase): Complete performance optimization and deployment configuration.
    // TODO (Final Phase): Generate README documentation and GitHub Pages support.
  }

  document.addEventListener("DOMContentLoaded", initializeApp);
})();
