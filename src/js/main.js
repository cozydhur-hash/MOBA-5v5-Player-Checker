import { initTheme, toggleTheme } from "./ui/theme.js";
import { storage } from "./utils/storage.js";
import { ui } from "./ui/render.js";
import { fetchValidationData, parseValidationMessage } from "./services/api.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize app
  initTheme();
  setupEventListeners();
});

function setupEventListeners() {
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  
  const lookupBtn = document.getElementById("lookupBtn");
  if (lookupBtn) {
    lookupBtn.addEventListener("click", handleCheckNickname);
  }
  
  const usePreviousBtn = document.getElementById("usePreviousBtn");
  if (usePreviousBtn) {
    usePreviousBtn.addEventListener("click", handleLoadPrevious);
  }

  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => ui.clearFields());
  }

  // Allow Enter key to trigger lookup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (e.target.tagName !== "BUTTON") {
             handleCheckNickname();
        }
    }
  });
}

function handleLoadPrevious() {
  const saved = storage.getSavedPlayer();
  if (saved.userId || saved.zoneId) {
    ui.userIdInput.value = saved.userId || "";
    ui.zoneIdInput.value = saved.zoneId || "";
    ui.resetResult();
  } else {
    ui.setError("No saved details found.");
  }
}

async function handleCheckNickname() {
  const userId = ui.userIdInput.value.trim();
  const zoneId = ui.zoneIdInput.value.trim();

  if (!userId || !zoneId) {
    ui.setError("Please enter both IDs.");
    return;
  }

  ui.setLoading();

  try {
    const data = await fetchValidationData(userId, zoneId);
    
    if (!data.message) {
      ui.setError("User or Server ID not found.");
      return;
    }

    const parsed = parseValidationMessage(data.message);
    if (!parsed) {
      ui.setError("Could not parse nickname. Check console for raw data.");
      return;
    }

    storage.savePlayer(userId, zoneId);
    ui.setSuccess(parsed.nickname, parsed.region);

  } catch (error) {
    ui.setError("Connection failed. Check your network.");
  }
}
