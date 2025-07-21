import React from "react";
import Button from "@mui/material/Button";

const SearchButton = ({ onClick }) => {
  return (
    <Button
      className="SearchButton"
      type="submit"
      onClick={onClick}
      sx={{
        height: "56px",
        marginLeft: "12px",
        borderRadius: "8px",
        padding: "0 24px",
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "1rem",
        background: "linear-gradient(to right, #d16ba5, #86a8e7)",
        color: "white",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        "&:hover": {
          background: "linear-gradient(to right, #c471f5, #6a82fb)",
        },
      }}
    >
      SEARCH
    </Button>
  );
};

export default SearchButton;
