import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  if (!props.show) {
    return null;
  }

  const books = props.books;

  const genresDuplicates = books
  .map(book => book.genres)  
  .flat(Infinity)  

//remove duplicates
const genres = (genresDuplicates.filter((item,
  index) => genresDuplicates.indexOf(item) === index));

  return (
    <div style={{ padding: '2rem'}}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '600', textAlign: 'center' }}>Books</h2>
  
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              margin: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #007bff',
              backgroundColor: 'transparent',
              color: '#007bff',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
          >
            {genre}
          </button>
        ))}
      </div>
  
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}></th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Author</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.filter(book => filter ? book.genres.includes(filter) : true)
            .map((book) => (
              <tr key={book.title} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.75rem' }}>{book.title}</td>
                <td style={{ padding: '0.75rem' }}>{book.author.name}</td>
                <td style={{ padding: '0.75rem' }}>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Books;
