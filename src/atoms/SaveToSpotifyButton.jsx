import React from 'react';
import Button from '@mui/material/Button';

const SaveToSpotifyButton = ({ onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="SaveToSpotifyButton"
      sx={{
        marginTop: '24px',
        padding: '12px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#ffffff',
        background: "linear-gradient(to right, #d16ba5, #351777ff, #2E2C83)",
        width: '100%',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#666666',
        },
        '&.Mui-disabled': {
          backgroundColor: '#999',
          color: '#ddd',
        },
      }}
    >
      SAVE TO SPOTIFY
    </Button>
  );
};

export default SaveToSpotifyButton;
