import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const togglableRef = useRef()
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const handleNewBlog = async (newBlog) => {
    const addedBlog = await blogService.create(newBlog)

    blogFormRef.current.setTitle('')
    blogFormRef.current.setAuthor('')
    blogFormRef.current.setUrl('')

    setBlogs([...blogs, addedBlog])
    if (togglableRef && togglableRef.current) {
      togglableRef.current.toggleVisibility()
    }
    setMessage(
      `a new blog ${blogFormRef.current.title} by ${blogFormRef.current.author} added`
    )
    setTimeout(() => {
      setMessage('')
      setError(false)
    }, 5000)
  }
  const handleLike = async (id, updatedBlog) => {
    const likedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)))
  }
  const handleDelete = async (id, deletedBlog) => {
    if (
      window.confirm(
        `remove blog ${deletedBlog.title} by ${deletedBlog.author}`
      )
    ) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
      {user === null && (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              name='Username'
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              type='password'
              name='Password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      )}
      {user !== null && (
        <div>
          <div>
            <p>
              <span>{user.name} is logged in</span>
              <span>
                <button id='logout-button' onClick={() => handleLogout()}>
                  log out
                </button>
              </span>
            </p>
          </div>

          <Togglable buttonLabel='create a new blog' ref={togglableRef}>
            <BlogForm handleNewBlog={handleNewBlog} ref={blogFormRef} />
          </Togglable>
          <br></br>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  user={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
