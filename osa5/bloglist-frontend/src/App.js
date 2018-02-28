import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import styles from './App.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newTitle: '',
      newUrl: '',
      newAuthor: '',
      message: null
    }
  }

  componentDidMount() {
    console.log("Did mount");

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      blogService.getAll().then(blogs =>
        this.setState({ blogs })
      )
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBloglistUser')
      blogService.setToken(null)
      this.setState({ user: null })
      this.setState({ blogs: [] })
    } catch (exception) {
      this.setState({
        error: 'uloskirjautuminen epäonnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    const blogObject = {
      title: this.state.newBlog,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
        this.setState({
          message: `a new blog '${this.state.newTitle}' by '${this.state.newAuthor}' added`,
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      })
      .catch(error => {
        this.setState({
          error: `blogia '${blogObject.title}' ei voitu lisätä`,
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }

  deleteBlog = (blog) => {
    if (this.state.user !== null) {
      if (blog.user === null || blog.user === undefined) {
        this.doDelete(blog)
      } else if (this.state.user.username.toString() === blog.user.username.toString()) {
        this.doDelete(blog)
      } else {
        this.noRightsToDelete(blog)
      }
    } else {
      this.setState({
        error: `Vain kirjautuneet käyttäjät voivat poistaa blogeja.`,
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  doDelete = (blog) => {
    const updatedBlogs = this.state.blogs.filter(b => {
      return b !== blog
    })
    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      blogService.deleteBlog(blog.id).then(
        this.setState({ blogs: updatedBlogs })
      ).catch(error => {
        this.setState({
          error: `blogia '${blog.title}' ei voitu poistaa`,
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
    } else {
      this.noRightsToDelete(blog)
    }
  }

  noRightsToDelete = (blog) => {
    console.log(blog);
    this.setState({
      error: `blogia '${blog.title}' ei voi poistaa, sinulla ei ole oikeuksia`,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  render() {
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          newTitle={this.newTitle}
          newAuthor={this.newAuthor}
          newUrl={this.newUrl}
          handleChange={this.handleFieldChange}
        />
      </Togglable>
    )

    return (
      <div>
        <Notification message={this.state.error} error={true} />
        <Notification message={this.state.message} error={false} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.logout}>
              Logout </button>
            {blogForm()}
          </div>
        }

        <h2> blogs</h2>
        {
          this.state.blogs.sort(function (a, b) {
            return b.likes - a.likes
          }).map(blog =>
            <Blog key={blog.id}
              blog={blog}
              deleteBlog={this.deleteBlog}
              user={this.state.user} />
            )
        }
      </div>
    );

  }
}

export default App;
