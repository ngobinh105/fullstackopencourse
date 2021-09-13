import React from 'react'

const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => (
        <Part key={item.name} name={item.name} exercises={item.exercises} />
      ))}
    </div>
  )
}
const Header = ({ name }) => {
  return <div>{name}</div>
}
const Total = ({ parts }) => {
  return (
    <div>
      Number of exercises{' '}
      {parts.reduce((acc, cur) => {
        return acc + cur.exercises
      }, 0)}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
