export const setMessage = (message) => {
  return (dispatch) => {
    dispatch({ type: 'SET_MESSAGE', payload: { message, error: false } })
  }
}

export const setErrorMessage = (message) => {
  return (dispatch) => {
    dispatch({ type: 'SET_MESSAGE', payload: { message, error: true } })
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET_MESSAGE',
  }
}

export default { setMessage, setErrorMessage }
