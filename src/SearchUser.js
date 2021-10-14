import React from "react";

export const SearchUser = ({ value, onSearch = (f) => f }) => {
  return (
    <input value={value} onChange={(e) => onSearch(e.target.value)}></input>
  );
};
