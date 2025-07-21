import React from 'react';
import Tracklist from './Tracklist';
import SaveToSpotifyButton from '../atoms/SaveToSpotifyButton';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Playlist = ({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave
}) => {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  const isEmpty = playlistTracks.length === 0;

  return (
    <div className="Playlist">
      <input 
        value={playlistName} 
        onChange={handleNameChange} 
        className="playlist-title-input"
        placeholder="New Playlist"
      />

      <div className="playlist-content">
        {isEmpty ? (
          <div className="empty-playlist-state">
            <div className="empty-icon">
              <MusicNoteIcon fontSize="large" />
            </div>
            <p className="empty-title">Your playlist is empty</p>
            <p className="empty-subtitle">Add tracks from the search results</p>
          </div>
        ) : (
          <Tracklist 
            tracks={playlistTracks} 
            onRemove={onRemove} 
            isRemoval={true}
          />
        )}
      </div>

      <SaveToSpotifyButton 
        onClick={onSave} 
        disabled={isEmpty}
      />
    </div>
  );
};

export default Playlist;
