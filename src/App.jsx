import React from "react";
import { useState } from "react";
import "./App.css";
import SearchBar from "./molecules/SearchBar";
import SearchResults from "./molecules/SearchResults";
import Playlist from "./molecules/Playlist";
import Tracklist from "./molecules/Tracklist";
import SaveToSpotifyButton from "./atoms/SaveToSpotifyButton";
import SearchButton from "./atoms/SearchButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Spotify from './utils/Spotify'; 



const tracks = [
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
  },
  {
    id: 2,
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    uri: "spotify:track:6UelLqGlWMcVH1E5c4H7lY",
  },
  {
    id: 3,
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    uri: "spotify:track:463CkQjx2Zk1yXoBuierM9",
  },
  {
    id: 4,
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    uri: "spotify:track:4ZtFanR9U6ndgddUvNcjcG",
  },
  {
    id: 5,
    name: "Toxic",
    artist: "Britney Spears",
    album: "In the Zone",
    uri: "spotify:track:6I9VzXrHxO9rA9A5euc8Ak",
  },
  {
    id: 6,
    name: "Don’t Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    uri: "spotify:track:3PfIrDoz19wz7qK7tYeu62",
  },
  {
    id: 7,
    name: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    uri: "spotify:track:4iJyoBOLtHqaGxP12qzhQI",
  },
  {
    id: 8,
    name: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
    uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
  },
];

function App() {
  const [searchResults, setSearchResults] = useState(tracks);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const handleAddToPlaylist = (track) => {
    if (!playlist.find((t) => t.id === track.id)) {
      setPlaylist([...playlist, track]);

      // Remove the added track from searchResults
      setSearchResults((prevResults) =>
        prevResults.filter((t) => t.id !== track.id)
      );
    }
  };

  const handleRemoveFromPlaylist = (id) => {
    const removedTrack = playlist.find((t) => t.id === id);

    // Remove from playlist
    const updatedPlaylist = playlist.filter((t) => t.id !== id);
    setPlaylist(updatedPlaylist);

    // Re-add to searchResults only if it's not already there
    setSearchResults((prevResults) => {
      if (!prevResults.find((t) => t.id === id)) {
        return [...prevResults, removedTrack];
      }
      return prevResults;
    });
  };

  const handleSearch = (term) => {
    Spotify.search(term).then(results => {
      setSearchResults(results);
  });
};
    // Here you would typically call a search function to fetch results from an API
    // For now, we'll just log the action

  return (
    <Box sx={{ padding: "2rem", minHeight: "100vh" }}>
      {/* HEADER */}
      <AppBar
        position="static"
        sx={{
          padding: "1rem",
          backgroundColor: "transparent",
          boxShadow: "none",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ color: "white" }}
        >
          Ja
          <span style={{ color: "#b388ff", fontSize: "2.8rem" }}>mmm</span>
          ing
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: "white",
            opacity: 0.8,
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          Build your perfect Spotify playlist
        </Typography>
      </AppBar>
      {/* SEARCH BAR + BUTTON */}
      <Box
        className="search-container"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <SearchBar onSearch={handleSearch} />

        <SearchButton onClick={handleSearch} />
      </Box>

      {/* TRACKLIST AND PLAYLIST */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <Tracklist arrayOfTracks={searchResults} onAdd={handleAddToPlaylist} />
        <Playlist
          playlist={playlist}
          onRemove={handleRemoveFromPlaylist}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          setPlaylist={setPlaylist}
          setSearchResults={setSearchResults}
/>

      </Box>
    </Box>
  );
}

export default App;
