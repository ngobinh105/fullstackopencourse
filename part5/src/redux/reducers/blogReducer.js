const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.payload

    case 'ADD_BLOG':
      return [...state, action.payload]

    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )

    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    case 'ADD_COMMENT':
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    default:
      return state
  }
}

export default blogReducer
