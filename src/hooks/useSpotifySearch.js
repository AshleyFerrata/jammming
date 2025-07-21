// src/hooks/useSpotifySearch.js
import { useState } from "react";
import { getAccessToken } from "../utils/auth";

export function useSpotifySearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (term) => {
    if (!term) return;
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        term
      )}`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Spotify error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const tracks = data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        icon: track.album.images[2].url,
        preview_url: track.preview_url,
      }));

      setResults(tracks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
}
