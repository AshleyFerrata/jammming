import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '700px' }}>
      <TextField
        fullWidth
        placeholder="Search for a song, artist, or album"
        variant="outlined"
        sx={{
          height: '56px',
          background: 'linear-gradient(to right, #371a70, #2b2b80)',
          borderRadius: '8px',

          '& .MuiOutlinedInput-root': {
            color: 'white',
            height: '56px',
            borderRadius: '8px',
            paddingRight: '8px',

            '& fieldset': {
              borderColor: '#999', // Default border
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#aaa', // On hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#aaa', // On focus
              boxShadow: 'none',   // Remove glow
            },
          },

          '& input::placeholder': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
