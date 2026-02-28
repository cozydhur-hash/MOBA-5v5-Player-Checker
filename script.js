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
    const url = `https://api.isan.eu.org/nickname/ml?id=${userId}&zone=${zoneId}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const nickname = data.name || data.nickname;

      if (nickname) {
        // Save to localStorage only on a confirmed successful result
        localStorage.setItem("ml_userId", userId);
        localStorage.setItem("ml_zoneId", zoneId);
        resultDiv.className = "success";
        resultDiv.innerHTML =
          '<span style="color:var(--success);font-weight:600;">' +
          nickname +
          "</span>";
      } else {
        resultDiv.className = "error";
        resultDiv.textContent = "No nickname found for this account.";
      }
    } else {
      resultDiv.className = "error";
      resultDiv.textContent = "User or Server ID not found.";
    }
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
