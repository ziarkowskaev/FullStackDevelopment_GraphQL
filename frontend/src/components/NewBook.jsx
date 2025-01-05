import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    //make sure that the Author and Books views are kept up to date after new book is added
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });

    setTitle("");
    setPublished(0);
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div >
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '600', textAlign: 'center' }}>
        Create Book
      </h2>
  
      <form onSubmit={submit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Author</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Published</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
            style={{
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Genre</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
              style={{
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid #ced4da',
                borderRadius: '0.25rem',
                width: '100%',
                transition: 'border-color 0.2s ease'
              }}
            />
            <button
              type="button"
              onClick={addGenre}
              style={{
                padding: '0.75rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}
            >
              Add Genre
            </button>
          </div>
        </div>
  
        <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>
          Added genres: {genres.join(' ')}
        </div>
  
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            width: '100%',
          }}
        >
          Create Book
        </button>
      </form>
    </div>
  );
  
};

export default NewBook;
