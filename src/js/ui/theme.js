import { storage } from "../utils/storage.js";

const html = document.documentElement;

export function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  storage.setTheme(theme);
}

export function toggleTheme() {
  const current = html.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

export function initTheme() {
  const saved = storage.getTheme();
  const system = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  applyTheme(saved || system);
}
