const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      _id: 1,
      username: 1,
      name: 1
    })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

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

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
      user: user._id
    })

    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({
      error: 'Could not save blog'
    })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blog = await Blog.findById(request.params.id)

  if (!decodedToken.id || !(blog.user.toString() === decodedToken.id.toString())) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({
      error: 'id does not exist'
    })
  }
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    .then(updatedBlog => {
      response.json(Blog.format(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({
        error: 'id does not exist'
      })
    })
})


module.exports = blogsRouter