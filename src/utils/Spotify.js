const clientId = 'YOUR_CLIENT_ID'; // ← Replace with your real Spotify Client ID
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const scope = 'playlist-modify-public';
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = authUrl;
    }
  },

  async search(term) {
    const token = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  async savePlaylist(name, uris) {
    if (!name || !uris.length) return;

    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    const userRes = await fetch('https://api.spotify.com/v1/me', { headers });
    const userId = (await userRes.json()).id;

    const playlistRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name })
    });
    const playlistId = (await playlistRes.json()).id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ uris })
    });
  }
};

export default Spotify;
