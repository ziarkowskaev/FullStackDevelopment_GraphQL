import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../queries";
import { ALL_AUTHORS } from "../queries";
import Select from "react-select";

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  //for defining all authors options based on the authors array
  function forOption(author) {
    return { value: author.name, label: author.name };
  }
  const options = authors.map(forOption);

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    //make sure that the Author  views are kept up to date after author is updated
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("person not found");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    updateAuthor({
      variables: { name: selectedOption.value, setBornTo: born },
    });
    setSelectedOption(null);
    setBorn(0);
  };

  return (
    <div>
      <h2>Set year birth</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
