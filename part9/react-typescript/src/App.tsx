import React from 'react'

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}
interface CoursePartWithDescription extends CoursePartBase {
  description: string
}
interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal'
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}
interface CourseSpecial extends CoursePartWithDescription {
  type: 'special'
  requirements: string[]
}
type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecial

interface ContentProps {
  courseParts: CoursePart[]
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}
const Header = ({ courseName }: { courseName: string }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <div key={part.name}>
          <Part coursePart={part} />
          <br />
        </div>
      ))}
    </div>
  )
}
const Total = ({ courseParts }: ContentProps) => {
  return (
    <div>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {coursePart.name} {coursePart.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{coursePart.description}</div>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {coursePart.name} {coursePart.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>
            project exercises {coursePart.groupProjectCount}
          </div>
        </div>
      )
    case 'submission':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {coursePart.name} {coursePart.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{coursePart.description}</div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </div>
      )
    case 'special':
      return (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {coursePart.name} {coursePart.exerciseCount}
          </div>
          <div style={{ fontStyle: 'italic' }}>{coursePart.description}</div>
          <div>required skills:{coursePart.requirements.toString()}</div>
        </div>
      )

    default:
      return assertNever(coursePart)
  }
}
const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
