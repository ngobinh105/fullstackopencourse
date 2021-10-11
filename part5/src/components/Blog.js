import React from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../redux/actions/blogActions'

const Blog = ({ blogs, handleLike }) => {
  const dispatch = useDispatch()
  const { reset: commentReset, ...comment } = useField('text')
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button
          onClick={() => {
            handleLike(id, { ...blog, likes: blog.likes + 1 })
          }}
        >
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addComment(id, comment.value))
          commentReset()
        }}
      >
        <textarea id='comment' {...comment} />
        <br></br>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={blog.id}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
