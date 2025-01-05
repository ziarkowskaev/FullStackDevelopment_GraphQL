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
<div style={{ display: 'flex', flexDirection: 'column', padding: '2rem'}}>
  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '600' }}>Set Author's Year of Birth</h2>

  <form onSubmit={submit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        style={{ padding: '0.75rem', fontSize: '1rem', border: '1px solid #ced4da', borderRadius: '0.25rem' }}
      />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="born" style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Born</label>
      <input
        id="born"
        type="number"
        value={born}
        onChange={({ target }) => setBorn(Number(target.value))}
        style={{
          padding: '0.75rem',
          fontSize: '1rem',
          border: '1px solid #ced4da',
          borderRadius: '0.25rem',
          marginTop: '0.5rem',
          width: '100%',
          transition: 'border-color 0.2s ease'
        }}
      />
    </div>

    <button
      type="submit"
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        width: '100%',
        marginTop: '1rem'
      }}
    >
      Update Author
    </button>
  </form>
</div>

  );
};

export default AuthorForm;
