const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    response.status(400).json({ error: 'unknown endpoint' })
    return
  }

  if (!blog.user) {
    const users = await User.find({})
    blog.user = users[0].id
  }
  const res = await blog.save()

  // lay user
  let userId = blog.user
  const user = await User.findById(userId)
  console.log('user', user)
  //lay blog id
  const blogId = res.id
  // gan blog id vo user.blogs
  user.blogs = [...user.blogs, blogId]
  await user.save()

  response.status(201).json(res)
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response) => {
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
    })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
