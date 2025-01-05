import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0, backgroundColor: '#f8f9fa' }}>
      <form 
        onSubmit={submit} 
        style={{
          backgroundColor: '#fff', 
          borderRadius: '0.5rem', 
          padding: '2rem', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          width: '100%', 
          maxWidth: '400px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username" style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            style={{
              padding: '0.75rem', 
              fontSize: '1rem', 
              border: '1px solid #ced4da', 
              borderRadius: '0.25rem', 
              marginTop: '0.5rem', 
              transition: 'border-color 0.15s ease-in-out', 
              width: '100%'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password" style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{
              padding: '0.75rem', 
              fontSize: '1rem', 
              border: '1px solid #ced4da', 
              borderRadius: '0.25rem', 
              marginTop: '0.5rem', 
              transition: 'border-color 0.15s ease-in-out', 
              width: '100%'
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
            transition: 'background-color 0.15s ease-in-out', 
            width: '100%'
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
