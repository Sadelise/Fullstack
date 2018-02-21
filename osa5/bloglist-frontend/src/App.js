import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import styles from './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newBlog: '',
      newUrl: '',
      newAuthor: '',
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
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
      this.setState({ user: null })
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
      })
      .catch(error => {
        this.setState({
          error: `blogia '${blogObject.title}' ei voitu lisätä`,
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })

    this.setState({
      message: `a new blog '${blogObject.title}' by '${blogObject.author}' added`,
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const Notification = ({ message, error }) => {
      if (message === null) {
        return null
      }
      if (error === true) {
        return (
          <div className='error'>
            {message}
          </div>
        )
      } else {
        return (
          <div className='message'>
            {message}
          </div>
        )
      }
    }

    const blogForm = () => (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <div>
            Title
          <input
              name="newBlog"
              value={this.state.newBlog}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Author
          <input
              name="newAuthor"
              value={this.state.newAuthor}
              onChange={this.handleFieldChange}
            /></div>
          <div>
            Url
          <input
              name="newUrl"
              value={this.state.newUrl}
              onChange={this.handleFieldChange}
            /></div>
          <button type="submit">Tallenna</button>
        </form>
      </div>
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

        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    );
  }
}

export default App;
