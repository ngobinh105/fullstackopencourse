import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [birthYear, setBirthYear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const [selectedOption, setSelectedOption] = useState(null)
  const updatedAuthor = (e) => {
    e.preventDefault()
    updateAuthor({
      variables: { name: selectedOption.value, setBornTo: Number(birthYear) },
    })
    setBirthYear('')
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log('result', result.data.allAuthors)
  const authors = result.data.allAuthors

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))
  console.log('options', options)
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updatedAuthor}>
        {/* <label>name: </label>
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        ></input>
        <br></br>
        <label>born: </label>
        <input
          value={birthYear}
          type='number'
          onChange={({ target }) => setBirthYear(target.value)}
        ></input> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <label>born: </label>
        <input
          value={birthYear}
          type='number'
          onChange={({ target }) => setBirthYear(target.value)}
        ></input>
        <br></br>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
