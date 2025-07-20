import React from 'react';
import Tracklist from './Tracklist';

const SearchResults = ({ searchResults, onAdd }) => {
  return (
   <div className="SearchResults">
  <div className="panel-header">
    <h2>Popular Tracks</h2>
    <span className="track-count">{searchResults.length} tracks</span>
  </div>

  <Tracklist
    tracks={searchResults}
    onAdd={onAdd}
    isRemoval={false}
  />
</div>

  );
};

export default SearchResults;
