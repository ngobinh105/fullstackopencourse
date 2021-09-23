const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('../utils/test_helper')
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  await api.post('/api/users').send(helper.initialUser)
}, 100000)
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
}, 10000)

test('blog id is unique', async () => {
  const response = await api.get('/api/blogs')
  const idLists = response.body.map((blog) => blog.id)
  idLists.forEach((id) => {
    expect(id).toBeDefined()
  })
  expect(idLists).toHaveLength([...new Set(idLists)].length)
}, 10000)

test('blogs post test', async () => {
  const loginUserInfo = {
    username: 'testuser',
    password: 'testing',
  }
  const userLogin = await api.post('/api/login').send(loginUserInfo)
  const token = `bearer ${userLogin.body.token}`
  const newBlog = {
    title: 'New Blog',
    author: 'Binh Ngo',
    url: 'https://binhngo.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const authors = blogsAtEnd.map(({ author }) => author)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain('Binh Ngo')
}, 10000)

test('blogs likes property test', async () => {
  const loginUserInfo = {
    username: 'testuser',
    password: 'testing',
  }
  const userLogin = await api.post('/api/login').send(loginUserInfo)
  const token = `bearer ${userLogin.body.token}`
  const newBlog = {
    title: 'New Blog with likes property missing',
    author: 'Binh Ngo',
    url: 'https://binhngo.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(
    (element) => element.title === 'New Blog with likes property missing'
  )
  expect(addedBlog.likes).toEqual(0)
}, 10000)

test('blogs title and url property missing test', async () => {
  const loginUserInfo = {
    username: 'testuser',
    password: 'testing',
  }
  const userLogin = await api.post('/api/login').send(loginUserInfo)
  const token = `bearer ${userLogin.body.token}`
  const newBlog = {
    author: 'Binh Ngo',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('authorization', token)

    .expect(400)
}, 10000)

test('blog post fails wih no authorization token', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Binh Ngo',
    url: 'https://binhngo.com/',
    likes: 7,
  }
  await api.post('/api/blogs').send(newBlog).expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
