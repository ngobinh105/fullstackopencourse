import blogService from '../../services/blogs'

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      payload: blogs,
    })
  }
}

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      payload: newBlog,
    })
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      payload: updatedBlog,
    })
  }
}
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      payload: id,
    })
  }
}
export const addComment = (id, newComment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.postComment(id, newComment)
    dispatch({
      type: 'ADD_COMMENT',
      payload: updatedBlog,
    })
  }
}
export default { initializeBlog, addNewBlog, updateBlog, addComment }
