import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const genresList = [...new Set(books.map((book) => book.genres).flat())]
  return (
    <div>
      <h2>books</h2>
      <p>in genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              if (genre === 'all' || genre === '') {
                return true
              }
              return book.genres.includes(genre)
            })
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genresList.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
