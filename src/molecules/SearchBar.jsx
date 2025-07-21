import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import SearchButton from "../atoms/SearchButton";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setTerm(e.target.value);
    console.log(term);
  };

  // Trigger Spotify search
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit handler fired");
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="SearchBar"
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <TextField
          value={term}
          type="text"
          onChange={handleChange}
          placeholder="Search for a song"
          variant="outlined"
          sx={{
            width: "400px",
            backgroundColor: "white",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#aaa",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#888",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />
        <SearchButton />
      </div>
    </form>
  );
};

export default SearchBar;
