const clientId = "cbda996d8e014cb793628f6286ae54d1";
const redirectUri = "http://127.0.0.1:5174";
let accessToken;

// Utility: Generate Random String for PKCE
function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars.charAt(x % chars.length))
    .join("");
}

// Utility: Create Code Challenge from Verifier
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      const codeVerifier = generateRandomString(128);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      localStorage.setItem("code_verifier", codeVerifier);

      const state = generateRandomString(16);
      const scope = "playlist-modify-public";

      const authUrl = new URL("https://accounts.spotify.com/authorize");
      authUrl.searchParams.append("client_id", clientId);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("redirect_uri", redirectUri);
      authUrl.searchParams.append("scope", scope);
      authUrl.searchParams.append("state", state);
      authUrl.searchParams.append("code_challenge_method", "S256");
      authUrl.searchParams.append("code_challenge", codeChallenge);

      window.location.href = authUrl.toString();
    } else {
      const codeVerifier = localStorage.getItem("code_verifier");

      const tokenUrl = "https://accounts.spotify.com/api/token";
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      const data = await response.json();
      accessToken = data.access_token;

      window.history.replaceState({}, document.title, redirectUri);
      return accessToken;
    }
  },

  async search(term) {
    const token = await this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) return;

    const token = await this.getAccessToken();

    // Get current user's ID
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = await userResponse.json();
    const userId = userData.id;

    // Create new playlist
    const createResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          public: true,
        }),
      }
    );

    const playlistData = await createResponse.json();
    const playlistId = playlistData.id;

    // Add tracks to new playlist
    return fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );
  },
};

export default Spotify;
