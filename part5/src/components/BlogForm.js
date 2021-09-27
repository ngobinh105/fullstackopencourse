import React, { useState, useImperativeHandle, forwardRef } from 'react'

const BlogForm = forwardRef(({ onSubmit }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => {
    return { title, author, url, setTitle, setAuthor, setUrl }
  })
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          author
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div>
          url
          <input value={url} onChange={(e) => setUrl(e.target.value)}></input>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
})
BlogForm.displayName = 'Blog Form'

export default BlogForm
