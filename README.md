# MOBA 5v5 Player Checker

A minimal, production-ready vanilla JavaScript web application to look up player profiles using a User ID and Zone ID.

Features a scalable ES module architecture and a serverless proxy pattern for safe client interactions.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS (Custom Properties), Vanilla JS (ES Modules)
- **Icons**: Lucide
- **Backend / API proxy**: Node.js (Vercel Serverless Function)

## Local Development

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd moba-player-checker
    ```

2.  **Run a local server:**
    Because the application uses ES Modules (`<script type="module">`), it must be served via HTTP to avoid CORS restrictions on local `.js` files.

    ```bash
    # using npx
    npx serve .

    # or using python
    python -m http.server
    ```

3.  **Local API Proxy Behavior:**
    When the app detects it is running on `localhost` or `127.0.0.1`, it automatically routes validation requests through `corsproxy.io` to bypass browser restrictions. No local backend setup is required.

## Deployment to Vercel

This project is structured for zero-config deployment to Vercel.

1.  Push the repository to GitHub.
2.  Import the repository into Vercel.
3.  Ensure the Framework Preset is set to **Other**.
4.  Leave Build Command and Output Directory empty (or default).
5.  Deploy.

Vercel will detect the `index.html` as the static output and compile the `api/validate.js` function into a Serverless Function automatically.

_Note: There are currently no environment variables required for deployment (`.env` is not needed)._
