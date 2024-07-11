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
    <div>
      <h2>books</h2>
      <div>
      {genres.map(genre => (
  <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => filter ? book.genres.includes(filter) : true)
          .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Books;
