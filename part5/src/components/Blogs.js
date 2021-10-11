import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blog }) => {
  // const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        <div>
          {blog.title} {blog.author}
          {/* <button onClick={toggleVisibility}>view</button> */}
        </div>
      </Link>
      {/* <div className='test-div2' style={showWhenVisible}>
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
              console.log('like click?')
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
      </div> */}
    </div>
  )
}

export default Blogs
