# MOBA 5v5 Player Checker

A clean, minimal browser tool to look up MOBA 5v5 (Mobile Legends: Bang Bang) player profiles using a User ID and Zone ID.

---

## ✨ Features

- 🔍 **Nickname & Country Lookup** — Fetches a player's in-game name and country via User ID + Zone ID
- 💾 **Remember Last Search** — Saves your last successful lookup to `localStorage` and restores it with one click
- 🌗 **Dark / Light Theme** — Respects system preference on first load; toggle persists across sessions
- ⌨️ **Enter Key Support** — Press `Enter` anywhere on the page to trigger the lookup
- ⚡ **Loading State** — Animated spinner with button lock while fetching
- ✅ **Clear Feedback** — Color-coded result card (success / error / loading states)
- 🔒 **Inspect Protection** — Right-click and common DevTools shortcuts are disabled

---

## 🛠️ Tech Stack

| Layer   | Technology                                       |
| ------- | ------------------------------------------------ |
| Markup  | HTML5 (semantic)                                 |
| Styling | Vanilla CSS (CSS custom properties)              |
| Logic   | Vanilla JavaScript (ES2017 async/await)          |
| Icons   | [Lucide](https://lucide.dev) (CDN)               |
| Fonts   | Plus Jakarta Sans, JetBrains Mono (Google Fonts) |
| API     | MooGold ID Validation (via corsproxy.io)         |

No build tools or frameworks — just open `index.html` in any browser.

---

## 📂 Project Structure

```
MOBA 5v5 Player Checker/
├── index.html    # App shell, form, icons, and theme toggle
├── styles.css    # Full design system — dark/light themes, components, animations
└── script.js     # DevTools block, theme system, API fetch logic, localStorage helpers
```

---

## 🚀 Usage

1. Clone or download this repository.
2. Open `index.html` in any modern browser — **no server required**.
3. Enter your **User ID** and **Zone ID** from Mobile Legends.
4. Click **Check Nickname** (or press `Enter`).

### Button Reference

| Button             | Action                                                            |
| ------------------ | ----------------------------------------------------------------- |
| **Check Nickname** | Fetches the player nickname and country for the entered IDs       |
| **Use Previous**   | Restores the last successful User ID + Zone ID from local storage |
| **Clear**          | Clears the input fields (does **not** wipe saved data)            |
| **☀️ / 🌙 icon**   | Toggles between light and dark theme (top-right corner)           |

---

## 🌐 API

Lookups use the **MooGold ID Validation** endpoint, routed through **corsproxy.io** to bypass browser CORS restrictions.

The API returns a structured message with the following fields:

```
User ID: …
Server ID: …
In-Game Nickname: …
Country: …
```

No API key required.

---

## 🎨 Design System

The UI uses CSS custom properties for theming.

| Token       | Dark value        | Light value       |
| ----------- | ----------------- | ----------------- |
| `--bg`      | `#000000`         | `#f8f9fb`         |
| `--surface` | `#0a0a0a`         | `#ffffff`         |
| `--accent`  | `#10b981`         | `#059669`         |
| `--error`   | `#f87171`         | `#dc2626`         |
| `--font`    | Plus Jakarta Sans | Plus Jakarta Sans |
| `--mono`    | JetBrains Mono    | JetBrains Mono    |

---

## 📦 Local Storage Keys

| Key         | Description                          |
| ----------- | ------------------------------------ |
| `ml_theme`  | Last chosen theme (`dark` / `light`) |
| `ml_userId` | Last successfully looked-up User ID  |
| `ml_zoneId` | Last successfully looked-up Zone ID  |

Data is saved **only** when a lookup returns a valid nickname.

---

## 📄 License

© 2026 @cozydhur. All rights reserved.
