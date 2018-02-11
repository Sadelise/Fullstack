const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [{
    "title": "Coding coders code cody code",
    "author": "Jaakko",
    "url": "www.blogi.fi",
    "likes": 0
  },
  {
    "title": "Coding code",
    "author": "Tiina",
    "url": "www.blogit.fi",
    "likes": 1
  }
]

beforeAll(async () => {
  await Blog.remove({})
  console.log('cleared')

  const blogObject = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  console.log('saved')
  await Promise.all(promiseArray)
  console.log('done')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(title).toContain('Coding coders code cody code')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Coderoni",
    author: "Kalle",
    url: "www.blogsidoodles.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(title).toContain('Coderoni')
})

afterAll(() => {
  server.close()
})