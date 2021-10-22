import React, { useEffect } from "react";
import { useIterator } from "./hooks";

export function RepoMenu({ repositories, currentRepo, onSelect = (f) => f }) {
  const [current, previous, next] = useIterator(
    repositories,
    currentRepo ? repositories.findIndex((repo) => repo.name === currentRepo) : null
  );

  useEffect(() => {
    if (!current?.name) return;
    onSelect(current.name);
  }, [current, onSelect]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {current && current.name ? (
          <>
            <button onClick={previous}>&lt;</button>
            <p>{current.name}</p>
            <button onClick={next}>&gt;</button>
          </>
        ) : (
          <p>No repos found for this username</p>
        )}
      </div>
    </>
  );
}
