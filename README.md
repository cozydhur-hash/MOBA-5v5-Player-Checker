# MLBB Lookup — Mobile Legends Player Profile & Region Checker

A fast, minimalistic, and production-ready web application to verify Mobile Legends: Bang Bang (MLBB) player profiles and their geographic region using an in-game User ID and Zone ID.

## What It Does

The application provides an instant lookup to check the validity of any MLBB account. By entering the User ID and Zone ID, it retrieves the in-game Nickname and the Country/Region associated with that account.

## How to Use

1. Enter the player's 8-10 digit **User ID** in the first field.
2. Enter the player's 4-5 digit **Zone ID** in the second field.
3. Click the **Check Nickname** button to fetch the player's profile.

You easily recall previous searches by clicking the "Use Previous" button. The application supports an automatic Dark/Light mode theme based on your system preferences, which you can manually toggle using the top-right button.

## Local Development

If you'd like to run the website locally on your own machine:

1. Clone or download the repository.
2. Because the application uses ES Modules, it needs to be served via an HTTP server. Run a simple local server in the project directory:

```bash
# Using Python
python -m http.server

# Or using Node/npx
npx serve .
```

3. Open the provided `localhost` URL in your browser.

_Note: The app automatically routes its requests through a secure proxy when run locally, so you don't need to configure a local backend to test it._
