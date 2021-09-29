import React, { useState, useImperativeHandle, forwardRef } from 'react'

const BlogForm = forwardRef(({ handleNewBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => {
    return { title, author, url, setTitle, setAuthor, setUrl }
  })
  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleNewBlog({
            title,
            author,
            url,
          })
        }}
      >
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
})
BlogForm.displayName = 'Blog Form'

export default BlogForm
