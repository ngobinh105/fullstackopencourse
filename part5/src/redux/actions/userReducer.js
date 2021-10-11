import userService from '../../services/users'

export const initializeUser = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      payload: users,
    })
  }
}

export default { initializeUser }
