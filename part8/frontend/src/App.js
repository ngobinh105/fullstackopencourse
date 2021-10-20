import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('')
  const client = useApolloClient()
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      <Recommendation show={page === 'recommend'} token={token} />
      <NewBook show={page === 'add'} setError={notify} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />
    </div>
  )
}

export default App
