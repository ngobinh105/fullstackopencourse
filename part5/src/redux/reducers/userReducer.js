const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.payload
    default:
      return state
  }
}

export default userReducer
