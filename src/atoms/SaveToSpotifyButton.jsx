import React from 'react';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Spotify from '../utils/Spotify';

const SaveToSpotifyButton = ({ playlist, playlistName, setPlaylist, setSearchResults, setPlaylistName }) => {
  const handleClick = () => {
    const uris = playlist.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, uris).then(() => {
      setPlaylist([]);
      setSearchResults([]);
      setPlaylistName('New Playlist');
    });
  };

  return (
    <Button
      variant="contained"
      startIcon={<LibraryMusicIcon />}
      onClick={handleClick}
      isDisabled={playlist.length === 0}
      sx={{
        margin: '0 auto',
        background: 'linear-gradient(to right, #8e24aa, #3949ab)',
        borderRadius: '1.5rem',
        padding: '0.75rem 2rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        width: '75%',
        color: 'white',
        opacity: playlist.length === 0 ? 0.4 : 1,
        '&:hover': {
        background: 'linear-gradient(to right, #ab47bc, #5c6bc0)',
      }
      }}
    >
      SAVE TO SPOTIFY
    </Button>
  );
};

export default SaveToSpotifyButton;
