/* ── DevTools Block ── */
(function () {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Block common DevTools keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    const forbidden =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === "U");
    if (forbidden) e.preventDefault();
  });
})();

/* ── Theme System ── */
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("ml_theme", theme);
}

function toggleTheme() {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

// Initialise: saved preference → system preference → dark
(function initTheme() {
  const saved = localStorage.getItem("ml_theme");
  const system = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  applyTheme(saved || system);
})();

/* ── Player Checker ── */
const userIdInput = document.getElementById("userId");
const zoneIdInput = document.getElementById("zoneId");

function resetResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.className = "";
  resultDiv.innerHTML = "";
}

async function checkNickname() {
  const userId = userIdInput.value.trim();
  const zoneId = zoneIdInput.value.trim();
  const resultDiv = document.getElementById("result");
  const btn = document.getElementById("lookupBtn");

  if (!userId || !zoneId) {
    resultDiv.className = "error";
    resultDiv.innerHTML = "Please enter both IDs.";
    return;
  }

  btn.disabled = true;
  resultDiv.className = "loading";
  resultDiv.innerHTML = '<span class="spinner"></span>Checking…';

  try {
    const targetUrl =
      "https://moogold.com/wp-content/plugins/id-validation-new/id-validation-ajax.php";
    const url = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

    const payload = new URLSearchParams({
      attribute_amount: "Weekly Pass",
      "text-5f6f144f8ffee": userId,
      "text-1601115253775": zoneId,
      quantity: 1,
      "add-to-cart": 15145,
      product_id: 15145,
      variation_id: 4690783,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://moogold.com/product/mobile-legends/",
        Origin: "https://moogold.com",
      },
      body: payload.toString(),
    });

    if (!response.ok) throw new Error("HTTP " + response.status);

    const data = await response.json();
    const message = data.message;


    if (!message) {
      resultDiv.className = "error";
      resultDiv.textContent = "User or Server ID not found.";
      return;
    }

    // Exact format: "User ID: …\nServer ID: …\nIn-Game Nickname: xD12\nCountry: IN"
    const nickname = (message.match(/In-Game Nickname:\s*(.+)/i) || [])[1]?.trim();
    const region   = (message.match(/Country:\s*(.+)/i)           || [])[1]?.trim();

    if (!nickname) {
      resultDiv.className = "error";
      resultDiv.textContent = "Could not parse nickname. Check console for raw data.";
      return;
    }

    // Save to localStorage only on a confirmed successful result
    localStorage.setItem("ml_userId", userId);
    localStorage.setItem("ml_zoneId", zoneId);

    resultDiv.className = "success";
    resultDiv.innerHTML = `
      <div class="result-header">
        <i data-lucide="check-circle"></i>
        Valid Account
      </div>
      <div class="result-field">
        <i data-lucide="user-round"></i>
        <div class="result-field-content">
          <span class="result-label">Nickname</span>
          <span class="result-value">${nickname}</span>
        </div>
      </div>
      ${region ? `
      <div class="result-field">
        <i data-lucide="globe"></i>
        <div class="result-field-content">
          <span class="result-label">Country</span>
          <span class="result-value">${region}</span>
        </div>
      </div>` : ""}
    `;

    // Re-render Lucide icons inside the dynamically added HTML
    lucide.createIcons();
  } catch (error) {
    resultDiv.className = "error";
    resultDiv.textContent = "Connection failed. Check your network.";
  } finally {
    btn.disabled = false;
  }
}

function loadPrevious() {
  const savedId = localStorage.getItem("ml_userId");
  const savedZone = localStorage.getItem("ml_zoneId");
  if (savedId || savedZone) {
    userIdInput.value = savedId || "";
    zoneIdInput.value = savedZone || "";
    resetResult();
  } else {
    const resultDiv = document.getElementById("result");
    resultDiv.className = "error";
    resultDiv.textContent = "No saved details found.";
  }
}

function clearFields() {
  // Clear input fields only — localStorage is intentionally preserved
  userIdInput.value = "";
  zoneIdInput.value = "";
  // Hide result panel so no stale username card remains visible
  resetResult();
}

// Allow Enter key to trigger lookup
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkNickname();
});
