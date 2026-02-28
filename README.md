# MOBA 5v5 Player Checker

A clean, minimal browser tool to look up player usernames in MOBA 5v5 (Mobile Legends: Bang Bang) using a User ID and Zone ID.

---

## ✨ Features

- 🔍 **Nickname Lookup** — Fetches a player's in-game name via User ID + Zone ID
- 💾 **Remember Last Search** — Saves your last successful lookup to `localStorage` and lets you restore it with one click
- 🌗 **Dark / Light Theme** — Respects your system preference on first load; toggle persists across sessions
- ⌨️ **Enter Key Support** — Press `Enter` anywhere on the page to trigger the lookup
- ⚡ **Loading State** — Animated spinner with button lock while fetching
- ✅ **Clear Feedback** — Color-coded result panel for success, error, and loading states

---

## 🛠️ Tech Stack

| Layer   | Technology                                                      |
| ------- | --------------------------------------------------------------- |
| Markup  | HTML5 (semantic)                                                |
| Styling | Vanilla CSS (CSS custom properties)                             |
| Logic   | Vanilla JavaScript (ES2017 async/await)                         |
| Fonts   | Plus Jakarta Sans, JetBrains Mono (Google Fonts)                |
| API     | [isan.eu.org Nickname API](https://api.isan.eu.org/nickname/ml) |

No build tools, frameworks, or dependencies — just open `index.html` in any browser.

---

## 📂 Project Structure

```
MOBA 5v5 Player Checker/
├── index.html    # App shell, form, and theme toggle button
├── styles.css    # Full design system — dark/light themes, components, animations
└── script.js     # Theme system, API fetch logic, localStorage helpers
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
| **Check Nickname** | Fetches the player nickname for the entered IDs                   |
| **Use Previous**   | Restores the last successful User ID + Zone ID from local storage |
| **Clear**          | Clears the input fields (does **not** wipe saved data)            |
| **☀️ / 🌙 icon**   | Toggles between light and dark theme (top-right corner)           |

---

## 🌐 API

Lookups are powered by the public **isan.eu.org** nickname API:

```
GET https://api.isan.eu.org/nickname/ml?id={userId}&zone={zoneId}
```

- Returns a JSON object containing the player's `name` or `nickname` field.
- No API key required.

---

## 🎨 Design System

The UI uses CSS custom properties for theming, making it trivial to swap or extend colors.

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

This project is open-source and free to use for personal use.

---

Made with ❤️ by **cozydhur**
