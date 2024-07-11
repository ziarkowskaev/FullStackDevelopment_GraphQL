import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery,  useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";
import Notify from "./components/Notify";
import AuthorForm from "./components/AuthorForm";
//import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
const App = () => {
  //start website with authors page
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const resultsA = useQuery(ALL_AUTHORS);
  const resultsB = useQuery(ALL_BOOKS);
  //const resultUser = useQuery(ME)
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient()
  //skipping laoding is causing an error since data is undefined
  if (resultsA.loading || resultsB.loading) {
    return <div>loading...</div>;
  }

  if (resultUser.loading) return <p>Loading...</p>;
  if (resultUser.error) return <p>Error: {error.message}</p>;

  const user = resultUser.data;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

    if (!token) {
      return (
        <>
          <Notify errorMessage={errorMessage} />
          <LoginForm setToken={setToken} setError={notify} />
        </>
      )
    }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {<button onClick={() => setPage("recommend")}>recommend</button>}
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      {page === "add" && <NewBook show={page === "add"} setError={notify} />}

      <Authors show={page === "authors"} authors={resultsA.data.allAuthors} />
      <AuthorForm show={page === "authors"} authors={resultsA.data.allAuthors} setError={notify}/>

      <Books show={page === "books"} books={resultsB.data.allBooks} />
      {<Recommend user={user.me} show={page === "recommend"} books={resultsB.data.allBooks}/>}
    </div>
  );
};

export default App;
