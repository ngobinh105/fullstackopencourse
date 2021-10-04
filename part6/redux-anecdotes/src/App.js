import React from 'react'
import { useDispatch } from 'react-redux'
import { initialAnecdote } from './reducers/anecdoteReducer'
import AnecForm from './components/AnecForm'
import AnecList from './components/AnecList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {
  removeNotification,
  setNotification,
} from './reducers/notificationReducer'

import { useEffect } from 'react'
const App = () => {
  const dispatch = useDispatch()

  const setMessage = (message) => {
    dispatch(setNotification(message, 5))
  }
  useEffect(() => {
    dispatch(initialAnecdote())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecList setMessage={setMessage} />
      <AnecForm setMessage={setMessage} />
    </div>
  )
}

export default App
