import React, { useState } from "react";
import { SearchUser } from "./SearchUser";
import { GitHubUser } from "./GitHubUser";
import { UserRepositories } from "./UserRepositories";
import { RepositoryReadme } from "./RepositoryReadme";

export default function App() {
  const [login, setLogin] = useState();
  const [repo, setRepo] = useState();
  return (
    <>
      <SearchUser value={login} onSearch={setLogin} />
      {login && <GitHubUser login={login} />}
      {login && <UserRepositories login={login} repo={repo} selectedRepo={setRepo} />}
      {login && repo && <RepositoryReadme login={login} repo={repo} />}
    </>
  );
}
