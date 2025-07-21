// src/utils/auth.js

const clientId = "cbda996d8e014cb793628f6286ae54d1";
const redirectUri = "http://127.0.0.1:5174"; // Must match Spotify dashboard
const scopes = [
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
];

function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function base64urlencode(str) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

export async function redirectToSpotifyAuth() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await sha256(codeVerifier).then(base64urlencode);

  localStorage.setItem("code_verifier", codeVerifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", scopes.join(" "));
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("code_challenge", codeChallenge);

  window.location = authUrl.toString();
}

export async function fetchAccessToken() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const verifier = localStorage.getItem("code_verifier");

  if (!code || !verifier) {
    console.warn("Missing code or verifier for token exchange");
    return null;
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify token exchange failed:", errorText);
      return null;
    }

    const data = await response.json();
    console.log("Token exchange response:", data);

    if (!data.access_token) {
      console.error("Missing access_token in Spotify response");
      return null;
    }

    localStorage.setItem("access_token", data.access_token);
    window.history.replaceState({}, document.title, "/"); // Clean URL
    return data.access_token;
  } catch (err) {
    console.error("Token exchange exception:", err);
    return null;
  }
}


export function getAccessToken() {
  return localStorage.getItem("access_token");
}
