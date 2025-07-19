import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Track = ({ song, onAdd, onRemove }) => {
  const handleClick = () => {
    if (onAdd) {
      onAdd(song);
    } else if (onRemove) {
      onRemove(song.id);
    }
  };

  // if this Track component is being rendered by Tracklist, onAdd = true and on Remove = false
  // if this Track component is being rendered by Playlist, onRemove will be true and onAdd will be false

  const addButtonStyle = {
    color: "#00FF88",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
      color: "#00FF88",
    },
  };
  const removeButtonStyle = { color: "#FF5252" };
  return (
    <ListItem
      key={song.id}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        borderRadius: "0.5rem",
        mb: 1,
        color: "white",
      }}
      secondaryAction={
        <IconButton
          onClick={handleClick}
          sx={onAdd ? addButtonStyle : removeButtonStyle}
        >
          {onAdd ? <AddIcon /> : <RemoveCircleOutlineIcon />}
        </IconButton>
      }
    >
      <Box sx={{ mr: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MusicNoteIcon sx={{ color: "white" }} />
        </Box>
      </Box>
      <ListItemText
        primary={song.name}
        secondary={`${song.artist} — ${song.album}`}
      />
    </ListItem>
  );
};

export default Track;
