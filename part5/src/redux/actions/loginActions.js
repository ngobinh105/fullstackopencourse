import loginService from '../../services/login'

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const userInfo = await loginService.login({ username, password })

    dispatch({
      type: 'USER_LOGIN',
      payload: userInfo,
    })
    return userInfo
  }
}
export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  }
}
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}
export default { userLogin, userLogout }
