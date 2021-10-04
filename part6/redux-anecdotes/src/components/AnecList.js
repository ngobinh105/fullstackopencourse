import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecList = ({ setMessage }) => {
  const searchValue = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()
  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(addVote(anecdote, id))
  }
  return (
    <div>
      {console.log('anecdotes', anecdotes)}
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) => {
          return anecdote.content
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  vote(anecdote.id)
                  setMessage(`you voted ${anecdote.content}`)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecList
