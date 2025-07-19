import React from 'react';
import Button from '@mui/material/Button';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import '/src/App.css';
import Tracklist from '../molecules/Tracklist'; 


const SaveToSpotifyButton = ({ disabled }) => {
  return (
    <Button
        variant="contained"
        disabled={disabled}
        startIcon={<LibraryMusicIcon />}
    sx={{
      margin: '0 auto',
        background: 'linear-gradient(to right, #8e24aa, #3949ab)',
        borderRadius: '1.5rem',
        padding: '0.75rem 2rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        width: '75%',
        color: 'white',
        opacity: disabled ? 0.4 : 1,
        '&:hover': {
        background: 'linear-gradient(to right, #ab47bc, #5c6bc0)',
    },
  }}
>
  SAVE TO SPOTIFY
</Button>
  );
};
 
export default SaveToSpotifyButton;