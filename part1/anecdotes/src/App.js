import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]
  const n = 7
  const copy = Array(n).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...copy])
  const mostVotesIndex = votes.findIndex(
    (element) => element === votes.reduce((acc, cur) => (acc > cur ? acc : cur))
  )
  console.log('mostVotesIndex', mostVotesIndex)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>
        has {votes[selected]} {votes[selected] === 1 ? 'vote' : 'votes'}
      </div>
      <div>
        <button
          onClick={() =>
            setVotes(
              votes.map((vote, index) => (selected === index ? vote + 1 : vote))
            )
          }
        >
          vote
        </button>
        <button
          onClick={() => {
            setSelected(getRandomInt(7))
          }}
        >
          next anecdote
        </button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>
        has {votes[mostVotesIndex]}{' '}
        {votes[mostVotesIndex] === 1 ? 'vote' : 'votes'}
      </div>
    </div>
  )
}

export default App
