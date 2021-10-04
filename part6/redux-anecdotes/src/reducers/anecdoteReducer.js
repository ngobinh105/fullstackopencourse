import anecdoteService from '../services/anecdotes'
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    case 'ADD_NEW_ANECDOTE':
      return [...state, action.payload]
    case 'INIT_ANECDOTE':
      return action.payload
    default:
      return state
  }
}
export const addVote = (anecdote, id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(
      { ...anecdote, votes: anecdote.votes + 1 },
      id
    )
    dispatch({
      type: 'ADD_VOTE',
      payload: updatedAnecdote,
    })
  }
}
export const addNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote({
      content: anecdote,
      votes: 0,
    })
    dispatch({
      type: 'ADD_NEW_ANECDOTE',
      payload: newAnecdote,
    })
  }
}
export const initialAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      payload: anecdotes,
    })
  }
}

export default anecdoteReducer
