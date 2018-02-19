const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce(function(sum, blog) {
    return sum + blog.likes
  }, 0)
  return blogs.length === 0 ? 0 : likes
}

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map(function(blog) {
    return parseInt(blog.likes)
  }, 0));
  const favorite = blogs.find(function(blog) {
    return blog.likes === max;
  });

  return favorite
}

const mostBlogs = (blogs) => {
  const max = Math.max(...blogs.map(function(blog) {
    return parseInt(blog.blogs)
  }, 0));
  const most = blogs.find(function(blog) {
    return blog.blogs === max;
  });

  return most.author
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}