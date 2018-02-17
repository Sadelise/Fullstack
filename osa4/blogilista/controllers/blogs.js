const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  if (blog.title === undefined) {
    return response.status(400).json({
      error: 'title missing'
    })
  }
  if (blog.url === undefined) {
    return response.status(400).json({
      error: 'url missing'
    })
  }
  const result = await blog.save();
  response.status(201).json(result)
})


module.exports = blogsRouter