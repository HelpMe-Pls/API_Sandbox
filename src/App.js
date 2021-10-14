import React, { useState } from "react";
import { SearchUser } from "./SearchUser";
import { GitHubUser } from "./GitHubUser";
import { UserRepositories } from "./UserRepositories";
import { RepositoryReadme } from "./RepositoryReadme";

export default function App() {
  const [login, setLogin] = useState("helpme-pls");
  const [repo, setRepo] = useState("waterfallXHR");
  return (
    <>
      <SearchUser value={login} onSearch={setLogin} />
      <GitHubUser login={login} />
      <UserRepositories login={login} repo={repo} selectedRepo={setRepo} />
      <RepositoryReadme login={login} repo={repo} />
    </>
  );
}
