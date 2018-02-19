const Blog = require('../models/blog')
const User = require('../models/user')

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

const format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}
const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    password: user.password,
    adult: user.adult
  }
}
const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(formatUser)
}
module.exports = {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb,
  formatUser,
  usersInDb
}