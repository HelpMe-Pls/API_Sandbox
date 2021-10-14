import React, { useState } from "react";
import { UserRepositories } from "./UserRepositories";
import { Fetch } from "./Fetch";
import { SearchUser } from "./SearchUser";

function GitHubUser({ login }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
}

function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={(repoName) => console.log(`${repoName} selected`)}
      />
    </div>
  );
}

export default function App() {
  const [login, setLogin] = useState("helpme-pls");
  return (
    <>
      <p>
        {/* moving the <SearchUser> here because it uses the same {login} input as the <GitHubUser> */}
        <SearchUser value={login} onSearch={setLogin} />
      </p>
      <GitHubUser login={login} />
    </>
  );
}
