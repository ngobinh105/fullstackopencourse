import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, userLogout, setUser } from './redux/actions/loginActions'
import { useField } from './hooks'
import {
  setMessage,
  setErrorMessage,
  resetMessage,
} from './redux/actions/notificationActions'
import {
  addNewBlog,
  updateBlog,
  removeBlog,
  initializeBlog,
} from './redux/actions/blogActions'
import { initializeUser } from './redux/actions/userReducer'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')
  // const [user, setUser] = useState(null)
  // const [error, setError] = useState(false)
  // const [message, setMessage] = useState('')
  const togglableRef = useRef()
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const padding = { padding: 5 }
  const handleLogin = async () => {
    try {
      // const user = await loginService.login({
      //   username,
      //   password,
      // })
      const returnUser = await dispatch(
        userLogin(username.value, password.value)
      )
      window.localStorage.setItem('loggedUser', JSON.stringify(returnUser))
      blogService.setToken(returnUser.token)
      // setUser(user)
      // setUsername('')
      usernameReset()
      // setPassword('')
      passwordReset()
    } catch (error) {
      // setError(true)
      // setMessage(error.response.data.error)
      // setTimeout(() => {
      //   setMessage(null)
      //   setError(false)
      // }, 5000)
      dispatch(setErrorMessage(error.response.data.error))
      setTimeout(() => {
        dispatch(resetMessage())
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(userLogout())
  }
  const handleNewBlog = async (newBlog) => {
    dispatch(addNewBlog(newBlog))
    // const addedBlog = await blogService.create(newBlog)

    blogFormRef.current.setTitle('')
    blogFormRef.current.setAuthor('')
    blogFormRef.current.setUrl('')

    // setBlogs([...blogs, addedBlog])
    if (togglableRef && togglableRef.current) {
      togglableRef.current.toggleVisibility()
    }
    // setMessage(
    //   `a new blog ${blogFormRef.current.title} by ${blogFormRef.current.author} added`
    // )
    dispatch(
      setMessage(
        `a new blog ${blogFormRef.current.title} by ${blogFormRef.current.author} added`
      )
    )
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
    // setTimeout(() => {
    //   setMessage('')
    //   setError(false)
    // }, 5000)
  }
  // const handleLike = async (id, updatedBlog) => {
  //   const likedBlog = await blogService.update(id, updatedBlog)
  //   setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)))
  // }
  const handleLike = async (id, updatedBlog) => {
    dispatch(updateBlog(id, updatedBlog))
  }
  const handleDelete = async (id, deletedBlog) => {
    if (
      window.confirm(
        `remove blog ${deletedBlog.title} by ${deletedBlog.author}`
      )
    ) {
      // await blogService.remove(id)
      // setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(removeBlog(id))
    }
  }
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])
  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUser())
  }, [])
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON)
      if (localUser) {
        console.log('localstorage', localUser)
        dispatch(setUser(localUser))
        blogService.setToken(localUser.token)
      }
    }
  }, [])
  console.log('users', users)
  return (
    <Router>
      <div>
        <Notification />
        {/* <Notification message={message} error={error} /> */}

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static' color='transparent'>
            <Toolbar>
              <Typography sx={{ flexGrow: 1 }}>
                <Link
                  style={{
                    ...padding,

                    textDecoration: 'none',
                  }}
                  to='/'
                >
                  Blogs
                </Link>
                <Link
                  style={{
                    ...padding,

                    textDecoration: 'none',
                  }}
                  to='/users'
                >
                  Users
                </Link>
              </Typography>
              {userInfo.token ? (
                <>
                  <span style={{ ...padding }}>{userInfo.name}</span>
                  <span style={{ ...padding }}>
                    <Button
                      variant='contained'
                      color='success'
                      id='logout-button'
                      onClick={() => handleLogout()}
                    >
                      log out
                    </Button>
                  </span>
                </>
              ) : (
                <>
                  <TextField
                    size='small'
                    label='username'
                    margin='dense'
                    variant='outlined'
                    color='primary'
                    id='username'
                    {...username}
                  ></TextField>
                  <TextField
                    sx={{ marginLeft: '5px' }}
                    size='small'
                    label='password'
                    margin='dense'
                    variant='outlined'
                    color='primary'
                    id='password'
                    {...password}
                  ></TextField>
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ height: 40, marginTop: '3px', marginLeft: '5px' }}
                    id='login-button'
                    onClick={() => {
                      handleLogin()
                    }}
                  >
                    Log in
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <div>
          <h2>BLOG APP</h2>
          <Switch>
            <Route path='/users/:id'>
              <User users={users} blogs={blogs} />
            </Route>
            <Route path='/blogs/:id'>
              <Blog blogs={blogs} handleLike={handleLike} />
            </Route>
            <Route path='/users'>
              <Users users={users} />
            </Route>

            <Route path='/'>
              <Togglable buttonLabel='create a new blog' ref={togglableRef}>
                <BlogForm handleNewBlog={handleNewBlog} ref={blogFormRef} />
              </Togglable>
              <br></br>
              <div>
                {blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blogs
                      key={blog.id}
                      blog={blog}
                      handleLike={handleLike}
                      handleDelete={handleDelete}
                      user={userInfo}
                    />
                  ))}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
