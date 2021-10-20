import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommendation = (props) => {
  const [user, setUser] = useState(null)
  const { data } = useQuery(CURRENT_USER)
  const result = useQuery(
    ALL_BOOKS,
    {
      variables: { genre: `${user?.favoriteGenre}` },
    },
    { fetchPolicy: 'no-cache' }
  )
  useEffect(() => {
    if (data) {
      setUser(data.me)
    }
  }, [data])
  if (!props.show) {
    return null
  }
  result.refetch()
  if (user.loading || user === null) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      <p>book in your favorite genre {user.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation
