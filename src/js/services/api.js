import { API_URLS, MOOGOLD_PAYLOAD } from "../config/constants.js";

export async function fetchValidationData(userId, zoneId) {
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

  if (isLocal) {
    const proxyUrl = API_URLS.CORS_PROXY + encodeURIComponent(API_URLS.PROXY_TARGET);
    
    const payload = new URLSearchParams({
      ...MOOGOLD_PAYLOAD,
      "text-5f6f144f8ffee": userId,
      "text-1601115253775": zoneId,
    });

    const res = await fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  } else {
    const res = await fetch(
      `${API_URLS.PROD_ENDPOINT}?userId=${encodeURIComponent(userId)}&zoneId=${encodeURIComponent(zoneId)}`
    );
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  }
}

export function parseValidationMessage(message) {
  if (!message) return null;
  const nickname = (message.match(/In-Game Nickname:\s*(.+)/i) || [])[1]?.trim();
  const region   = (message.match(/Country:\s*(.+)/i)           || [])[1]?.trim();
  
  if (!nickname) return null;
  return { nickname, region };
}
