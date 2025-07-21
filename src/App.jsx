import React, { useEffect, useState } from "react";
import "./App.css";

import SearchBar from "./molecules/SearchBar";
import SearchResults from "./molecules/SearchResults";
import Playlist from "./molecules/Playlist";

import Spotify from "./utils/Spotify";
import { useSpotifySearch } from "./hooks/useSpotifySearch"; // importing the useSpotifySearch hook

import {
  redirectToSpotifyAuth,
  fetchAccessToken,
  getAccessToken,
} from "./utils/auth";

const App = () => {
  // === State Setup ===
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [tokenReady, setTokenReady] = useState(false);
  const { search, results, loading, error } = useSpotifySearch();

  useEffect(() => {
    const init = async () => {
      let token = getAccessToken();

      if (!token) {
        token = await fetchAccessToken();
      }

      if (token) {
        console.log("Token successfully loaded:", token);
        setTokenReady(true);
      } else {
        console.warn("No token available. Redirecting...");
        redirectToSpotifyAuth();
      }
    };

    init();
  }, []);

  if (!tokenReady) return <p>Authorizing with Spotify...</p>;

  // === Add Track to Playlist ===
  const addTrack = (track) => {
    // Avoid duplicates
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) return;
    setPlaylistTracks((prev) => [...prev, track]);
  };

  // === Remove Track from Playlist ===
  const removeTrack = (track) => {
    const updated = playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    setPlaylistTracks(updated);
  };

  // === Update Playlist Name ===
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // === Save to Spotify ===
  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist"); // Reset name
      setPlaylistTracks([]); // Clear tracks
    });
  };

  return (
    <div className="App">
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <SearchBar onSearch={search} />

      <div className="App-main">
        <SearchResults searchResults={results} onAdd={addTrack} />

        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
};

export default App;

//const search = (term) => {
//Spotify.search(term).then(results => {
//setSearchResults(results);
//});
//};
//const search = (term) => {
//   const mockResults = [
//   {
//     id: '1',
//     name: "Cola",
//     artist: "CamelPhat, Elderbrook",
//     album: "Cola",
//     uri: "spotify:track:6GgPZls4lnYq5CqN6t1uZo"
//   },
//   {
//     id: '2',
//     name: "Turn Back Time",
//     artist: "Diplo, Sonny Fodera",
//     album: "Turn Back Time",
//     uri: "spotify:track:6HfBgsZ2vL5uHspI6yWmDU"
//   },
//   {
//     id: '3',
//     name: "Escape",
//     artist: "Kx5, deadmau5, Kaskade",
//     album: "Kx5",
//     uri: "spotify:track:7jvvL9JSSrE3cXtm5WsdYz"
//   },
//   {
//     id: '4',
//     name: "My Paradise",
//     artist: "Jamie Jones",
//     album: "My Paradise",
//     uri: "spotify:track:5mBkSpN78vIUdHbE1XDkiJ"
//   },
//   {
//     id: '5',
//     name: "Love Tonight (Edit)",
//     artist: "Shouse",
//     album: "Love Tonight",
//     uri: "spotify:track:5o3xQ6rJZ5pJJcxy9bLgUf"
//   },

//   {
//     id: '6',
//     name: "Losing It",
//     artist: "FISHER",
//     album: "Losing It",
//     uri: "spotify:track:7ofnI0UMW8fhC0jlG4yVVW"
//   }
// ];

//   setSearchResults(mockResults);
// };
