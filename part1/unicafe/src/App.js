import React, { useState } from 'react'

const Buttons = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
  return (
    <div>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <span>
      <button onClick={onClick}>{text}</button>
    </span>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = good / all
  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick}
      />
      <h2>statistics</h2>
      {good === 0 && neutral === 0 && bad === 0 ? (
        'No Feedback given'
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      )}
    </div>
  )
}

export default App
