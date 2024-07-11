import { useState } from "react";

const Recommend = (props) => {
  const user = props.user
  console.log(user)
  if (!props.show) {
    return null;
  }

  const books = props.books;


///.filter(book => book.genres.includes(user.favoriteGenre ) )
  return (
    <div>
      <h2>books</h2>
      <div>
      
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books
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

export default Recommend;
