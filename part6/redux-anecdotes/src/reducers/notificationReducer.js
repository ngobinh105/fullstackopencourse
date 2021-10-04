const initialState = null
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.payload
    }

    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    })
    await delay(time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: null,
    })
  }
}

export default notificationReducer
