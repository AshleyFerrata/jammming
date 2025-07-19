import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Typography from "@mui/material/Typography";
import { Save } from "@mui/icons-material";
import SaveToSpotifyButton from "../atoms/SaveToSpotifyButton";
import Track from "./Track";

const Playlist = ({ playlist, onRemove }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        margin: "2rem auto",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        padding: "1rem",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="white">
            My Playlist
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
            {playlist.length} tracks
          </Box>
        </Box>
      </Box>

      {playlist.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            paddingTop: "4rem",
            fontSize: "1.25rem",
          }}
        >
          <LibraryMusicIcon sx={{ fontSize: 48, marginBottom: "1rem" }} />
          <Typography variant="body1">Your playlist is empty</Typography>
          <Typography variant="body2">
            Add tracks from the search results
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: "100%" }}>
          {playlist.map((song) => (
            <Track song={song} key={song.id} onRemove={onRemove} />
          ))}
        </List>
      )}
      {playlist.length > 0 && <SaveToSpotifyButton />}
    </Box>
  );
};

export default Playlist;
