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
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='test-div2' style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes <span className='like-count'>{blog.likes}</span>
          <button
            id='like-button'
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
              id='remove-button'
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
