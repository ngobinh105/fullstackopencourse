import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const defaultToken = localStorage.getItem('bookapp-user-token') ?? ''
  const [token, setToken] = useState(defaultToken)
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
  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (dataInStore.allBooks.every((data) => data.id !== addedBook.id)) {
      const newData = [...dataInStore.allBooks, addedBook]
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: newData },
      })
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
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
      <NewBook
        show={page === 'add'}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
      />
    </div>
  )
}

export default App
