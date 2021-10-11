const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  console.log('user', user)
  if (!request.token || !user.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const blog = new Blog({
    ...body,
    user: user._id,
  })
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    response.status(400).json({ error: 'missing title or url' })
    return
  }

  const savedBlog = await blog.save()
  const blogId = savedBlog.id
  user.blogs = [...user.blogs, blogId]
  await user.save()

  response.status(201).json(
    await savedBlog.populate('user', {
      username: 1,
      name: 1,
    })
  )
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  try {
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      console.log('user', user)
      user.blogs = user.blogs.filter(
        (id) => id.toString() !== request.params.id.toString()
      )
      await user.save()
      response.status(204).end()
    } else
      return response.status(401).json({ error: 'wrong token authentication' })
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate('user', {
      username: 1,
      name: 1,
    })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findOne({ _id: request.params.id })
  blog.comments = [...blog.comments, body.comment]
  await blog.save()
  response.json(
    await blog.populate('user', {
      username: 1,
      name: 1,
    })
  )
})
module.exports = blogRouter
