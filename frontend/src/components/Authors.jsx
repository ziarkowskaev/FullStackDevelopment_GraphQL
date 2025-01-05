import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

import AuthorForm from "./AuthorForm";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div style={{ padding: '2rem'}}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '600', textAlign: 'center' }}>Authors</h2>
  
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}></th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Born</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.name} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}>{a.name}</td>
              <td style={{ padding: '0.75rem' }}>{a.born}</td>
              <td style={{ padding: '0.75rem' }}>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorForm  authors={authors} setError={notify}/>
    </div>
  );
  
};

export default Authors;
