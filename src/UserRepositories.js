import React from "react";
import { Fetch } from "./Fetch";
import { RepoMenu } from "./RepoMenu";

export function UserRepositories({ login, singleRepo, selectedRepo = (f) => f }) {
  return (
    <>
      <Fetch
        uri={`https://api.github.com/users/${login}/repos`}
        renderSuccess={({ data }) => (
          <RepoMenu
            repositories={data}
            currentRepo={singleRepo}
            onSelect={selectedRepo} // passing in {name} (from <RepoMenu> definition) to {selectedRepo} which ends up in {setRepo} at App.js
          />
        )}
      />
    </>
  );
}
