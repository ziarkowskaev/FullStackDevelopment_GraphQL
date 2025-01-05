import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery,  useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";
import Notify from "./components/Notify";
import AuthorForm from "./components/AuthorForm";
import LoginForm from './components/LoginForm'
const App = () => {
  //start website with authors page
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const resultsA = useQuery(ALL_AUTHORS);
  const resultsB = useQuery(ALL_BOOKS);
  const resultUser = useQuery(ME)
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

    const buttonStyles = {
      padding: '0.75rem 1.25rem',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      margin: '0.5rem',
      boxSizing: 'border-box',
      outline: 'none',
    };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '1rem' }} >
        <button onClick={() => setPage("authors")} style={buttonStyles}>Authors</button>
        <button onClick={() => setPage("books")} style={buttonStyles}>Books</button>
        <button onClick={() => setPage("add")} style={buttonStyles}>Add book</button>
        <button onClick={logout} style={{ ...buttonStyles, backgroundColor: '#dc3545', color: '#fff' }}>Logout</button>
      </div>
      <div style={{marginLeft: '1rem' }}>
      <h1 style={{ marginBottom: '1rem', fontWeight: 600}}>Library App</h1>

        <Notify errorMessage={errorMessage} />

        {page === "add" && <NewBook show={page === "add"} setError={notify} />}

        <Authors show={page === "authors"} authors={resultsA.data.allAuthors} />

        <Books show={page === "books"} books={resultsB.data.allBooks} />

      </div>
      
    </div>
  );
};

export default App;
