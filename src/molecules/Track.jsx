import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const handleTrackAction = () => {
    isRemoval ? onRemove(track) : onAdd(track);
  };

  return (
    <div className="Track">
      {/* Icon Block */}
      <div className="Track-icon">
        <div className="Track-icon-bg">
          <MusicNoteIcon className="Track-icon-symbol" />
        </div>
      </div>

      {/* Info */}
      <div className="Track-info">
        <h3>{track.name}</h3>
        <p>{track.artist} • {track.album}</p>
      </div>

      {/* + / – Button */}
      <div className="Track-action" onClick={handleTrackAction}>
        {isRemoval ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
      </div>
    </div>
  );
};

export default Track;
