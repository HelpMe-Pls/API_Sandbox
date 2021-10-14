import React from "react";

export const SearchUser = ({ inp, onSearch = (f) => f }) => {
  return (
    <input value={inp} onChange={(e) => onSearch(e.target.value)}></input>
  );
};
