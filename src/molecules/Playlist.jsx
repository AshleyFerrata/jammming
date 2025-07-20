import React from 'react';
import Tracklist from './Tracklist';
import SaveToSpotifyButton from '../atoms/SaveToSpotifyButton';

const Playlist = ({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave
}) => {
  // Controlled input for playlist renaming
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
<div className="Playlist">
  <div className="panel-header">
    <input 
      value={playlistName} 
      onChange={handleNameChange} 
      className="playlist-title-input"
      placeholder="New Playlist"
    />
    <span className="track-count">{playlistTracks.length} tracks</span>
  </div>

  <Tracklist 
    tracks={playlistTracks} 
    onRemove={onRemove} 
    isRemoval={true}
  />

  <SaveToSpotifyButton 
    onClick={onSave} 
    disabled={playlistTracks.length === 0}
  />
</div>

  );
};

export default Playlist;
