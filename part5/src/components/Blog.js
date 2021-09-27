import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}
          <button
            onClick={() => {
              handleLike(blog.id, { ...blog, likes: blog.likes + 1 })
            }}
          >
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {blog.user.username === user.username && (
          <div>
            <button
              onClick={() => {
                handleDelete(blog.id, blog)
              }}
            >
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
