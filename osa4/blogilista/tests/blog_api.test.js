const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.remove({})
  console.log('cleared')
  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
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
  const blogsInDb = await helper.blogsInDb()
  expect(response.body.length).toBe(blogsInDb.length)
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
  const blogsBefore = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()
  const titles = blogsAfter.map(r => r.title)
  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  expect(titles).toContain('Coderoni')
})

test('if likes is not defined, likes equals 0', async () => {
  const newBlog = {
    title: "No likes",
    author: "Kille",
    url: "www.blogsidoodles.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = await api
    .get('/api/blogs')

  console.log("responsebody ", response.body);
  const blogs = response.body;

  const saved = blogs.find(function(blog) {
    return blog.title === "No likes";
  });
  expect(saved.likes).toBe(0)
})

test('blog without title and url is not added ', async () => {
  const newBlog = {
    author: "Liina",
    likes: 10
  }
  const blogsBefore = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.length).toBe(blogsBefore.length)
})

describe('deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: "Delete me",
      author: "Kella",
      url: "www.blogsideletes.com",
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await helper.blogsInDb()
    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})

afterAll(() => {
  server.close()
})