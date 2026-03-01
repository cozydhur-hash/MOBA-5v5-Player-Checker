// Vercel serverless function — proxies the MooGold validation request
// server-side so there are no CORS issues regardless of the client origin.

export default async function handler(req, res) {
  // Allow all origins (the function itself is the trust boundary)
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { userId, zoneId } = req.query;

  if (!userId || !zoneId) {
    return res.status(400).json({ error: "userId and zoneId are required." });
  }

  const payload = new URLSearchParams({
    attribute_amount: "Weekly Pass",
    "text-5f6f144f8ffee": userId,
    "text-1601115253775": zoneId,
    quantity: 1,
    "add-to-cart": 15145,
    product_id: 15145,
    variation_id: 4690783,
  });

  try {
    const response = await fetch(
      "https://moogold.com/wp-content/plugins/id-validation-new/id-validation-ajax.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://moogold.com/product/mobile-legends/",
          Origin: "https://moogold.com",
        },
        body: payload.toString(),
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: "Upstream request failed: HTTP " + response.status });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
