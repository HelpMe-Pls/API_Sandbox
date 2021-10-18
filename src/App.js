import React, { useState } from "react";
import { SearchUser } from "./SearchUser";
import { GitHubUser } from "./GitHubUser";
import { UserRepositories } from "./UserRepositories";
import { RepositoryReadme } from "./RepositoryReadme";

//TODO: Try this to see if it fixes:
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci


export default function App() {
  const [login, setLogin] = useState();
  const [repo, setRepo] = useState();

  const handleSearch = login => {
    if (login) return setLogin(login);
      setLogin("");
      setRepo("");
  };

  if (!login)
    return (
      <SearchUser value={login} onSearch={handleSearch} />
    );

  return (
    <>
      <SearchUser value={login} onSearch={handleSearch} />
      {login && <GitHubUser login={login} />}
      {login && <UserRepositories login={login} repo={repo} selectedRepo={setRepo} />}
      {login && repo && <RepositoryReadme login={login} repo={repo} />}
    </>
  );
}
