import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
  })
  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('bookapp-user-token', token)
    } // eslint-disable-next-line
  }, [result.data])
  if (!props.show) {
    return null
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>username</label>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
        <br></br>
        <label>password</label>
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <br></br>
        <button type='submit'>log in</button>
      </form>
    </div>
  )
}

export default LoginForm
