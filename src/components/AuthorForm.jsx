import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR } from '../queries'

const AuthorForm = ({setError}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [ updateAuthor, result] = useMutation(UPDATE_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    console.log('Submitting with variables:', { name, setBornTo: born });

    updateAuthor({ variables: { name, setBornTo: born } })
    
    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h2>Set year birth</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default AuthorForm