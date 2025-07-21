// src/util/Spotify.js
const clientId = 'cbda996d8e014cb793628f6286ae54d1'; // Replace with your actual client ID
const redirectUri = 'http://127.0.0.1:5174'; // Match this to your Spotify app settings
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const scope = 'playlist-modify-public';
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location = url;
    }
  },

  search(term) {
    const token = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log("search response", response)
        response.json()})
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(name, uris) {
    if (!name || !uris.length) return;

    const token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers })
      .then(response => response.json())
      .then(json => {
        userId = json.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name })
        });
      })
      .then(response => response.json())
      .then(json => {
        const playlistId = json.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ uris })
        });
      });
  }
};

export default Spotify;
