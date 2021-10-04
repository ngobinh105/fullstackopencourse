import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'
const Filter = (props) => {
  const handleChange = (e) => {
    props.filterAnecdote(e.target.value)
  }
  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterAnecdote })(Filter)
