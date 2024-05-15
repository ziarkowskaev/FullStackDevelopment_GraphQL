import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import Notify from "./components/Notify";
import AuthorForm from "./components/AuthorForm";

const App = () => {
  //start website with authors page
  const [page, setPage] = useState("authors");

  const resultsA = useQuery(ALL_AUTHORS);
  const resultsB = useQuery(ALL_BOOKS);
  const [errorMessage, setErrorMessage] = useState(null)
  //skipping laoding is causing an error since data is undefined
    if(resultsA.loading || resultsB.loading){
      return <div>loading...</div>
    }

    const notify = (message) => {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      {page === "add" && (<NewBook show={page === "add"}  setError={notify} />)}
      
      <Authors show={page === "authors"} authors={resultsA.data.allAuthors} />
      {page === "authors" && <AuthorForm show={page === "authors"} authors={resultsA.data.allAuthors} setError={notify}/>}

      <Books show={page === "books"} books={resultsB.data.allBooks} />

    </div>
  );
};

export default App;
