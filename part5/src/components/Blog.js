import React from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addComment } from '../redux/actions/blogActions'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import IconButton from '@mui/material/IconButton'

const Blog = ({ blogs, handleLike }) => {
  const dispatch = useDispatch()
  const { reset: commentReset, ...comment } = useField('text')
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  return (
    <Box>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='div'>
            {blog.title} {blog.author}
          </Typography>
          <Typography>
            <a href={`${blog.url}`}>{blog.url}</a>
          </Typography>
          <Typography>
            {blog.likes} likes
            <IconButton
              onClick={() => {
                handleLike(id, { ...blog, likes: blog.likes + 1 })
              }}
              color='primary'
              variant='outlined'
              size='small'
            >
              <ThumbUpAltIcon />
            </IconButton>
          </Typography>
          <Typography>added by {blog.user.name}</Typography>
        </CardContent>
      </Card>
      <Typography variant='h5'>Comments</Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addComment(id, comment.value))
          commentReset()
        }}
      >
        <textarea id='comment' {...comment} />
        <br></br>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            size='small'
          >
            add comment
          </Button>
        </CardActions>
      </form>
      <Typography variant='body1'>
        <ul>
          {blog.comments.map((comment) => (
            <li key={blog.id}>{comment}</li>
          ))}
        </ul>
      </Typography>
    </Box>
  )
}

export default Blog
