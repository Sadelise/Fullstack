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

const format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
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

module.exports = {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb
}