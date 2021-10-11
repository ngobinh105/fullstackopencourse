const notificationReducer = (state = { message: '', error: false }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'SET_ERROR_MESSAGE':
      return action.payload
    case 'RESET_MESSAGE':
      return { message: '', error: false }
    default:
      return state
  }
}

export default notificationReducer
