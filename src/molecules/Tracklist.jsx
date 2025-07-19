import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Track from "./Track";

const Tracklist = ({ arrayOfTracks, onAdd }) => {
  console.log(arrayOfTracks);
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        margin: "2rem auto",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1rem",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="white">
          Results
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ffffff20",
            color: "white",
            fontSize: "0.875rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "1rem",
          }}
        >
          {arrayOfTracks.length} tracks
        </Box>
      </Box>

      <List>
        {arrayOfTracks.length === 0 ? (
          <ListItem>
            <ListItemText primary="No tracks found." />
          </ListItem>
        ) : (
          arrayOfTracks.map((song) => {
            return <Track song={song} key={song.id} onAdd={onAdd} />;
          })
        )}
      </List>
    </Box>
  );
};

export default Tracklist;
