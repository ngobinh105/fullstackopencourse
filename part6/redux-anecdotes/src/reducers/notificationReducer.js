const initialState = null
let timerId

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
    if (timerId) {
      clearTimeout(timerId)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    })
    timerId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: null,
      })
    }, time * 1000)
  }
}

export default notificationReducer
