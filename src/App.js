import React, { useState } from "react";
import { SearchUser } from "./SearchUser";
import { GitHubUser } from "./GitHubUser";
import { UserRepositories } from "./UserRepositories";
import { RepositoryReadme } from "./RepositoryReadme";
import useDebounce from "./hooks";


export default function App() {
  const [login, setLogin] = useState();
  const [repo, setRepo] = useState();

  const debouncedSearchTerm = useDebounce(login, 500)

  const handleSearch = login => {
    setLogin(login ?? "");
    setRepo(login ?? "");
  };

  if (!debouncedSearchTerm)
    return (
      <SearchUser value={debouncedSearchTerm} onSearch={handleSearch} />
    );

  return (
    <>
      <SearchUser value={debouncedSearchTerm} onSearch={handleSearch} />
      {login && <GitHubUser login={debouncedSearchTerm} />}
      {login && <UserRepositories login={debouncedSearchTerm} repo={repo} selectedRepo={setRepo} />}
      {login && repo && <RepositoryReadme login={debouncedSearchTerm} repo={repo} />}
    </>
  );
}
