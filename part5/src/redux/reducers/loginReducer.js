const initialUser = { token: '', username: '', name: '' }

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload
    case 'USER_LOGOUT':
      return initialUser
    case 'SET_USER':
      return action.payload
    default:
      return state
  }
}

export default userReducer
