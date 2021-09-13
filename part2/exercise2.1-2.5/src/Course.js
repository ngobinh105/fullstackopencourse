const Header = ({ name }) => {
  return <h1>{name}</h1>
}
const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return <h4>total of exercises {total}</h4>
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total parts={parts} />
    </div>
  )
}
const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
