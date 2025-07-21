import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const handleTrackAction = () => {
    isRemoval ? onRemove(track) : onAdd(track);
  };

  return (
    <div className="Track">
      {/* Icon Block */}
      <div className="Track-icon">
        <img src={track.icon} alt="" className="Track-icon-img" />
      </div>

      {/* Info */}
      <div className="Track-info">
        <h3>{track.name}</h3>
        <p>
          {track.artist} • {track.album}
        </p>

        {track.preview_url && (
          <audio controls src={track.preview_url} className="Track-audio">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

      {/* + / – Button */}
      <div className="Track-action" onClick={handleTrackAction}>
        {isRemoval ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
      </div>
    </div>
  );
};

export default Track;
