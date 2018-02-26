import React from 'react'
import blogs from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: this.props.blog
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    var deleteVisibility = false
    if (this.props.user === null || this.props.user === undefined) {
      deleteVisibility = false
    } else if (this.state.blog.user === null || this.state.blog.user === undefined) {
      deleteVisibility = true
    } else if (this.state.blog.user.username.toString() === this.props.user.username.toString()) {
      deleteVisibility = true
    }

    const hideDeleteVisibility = { display: deleteVisibility ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const likeBlog = () => {
      const blog = this.state.blog
      const changedBlog = { ...blog, likes: blog.likes + 1 }
      this.setState({ blog: changedBlog })
      blogs.update(this.state.blog.id, changedBlog)
    }

    const deleteBlog = () => {
      this.props.deleteBlog(this.state.blog)
    }

    return (
      <div style={blogStyle} >
        <div style={hideWhenVisible} onClick={this.toggleVisibility}>
          <div>
            {this.state.blog.title} {this.state.blog.author}
          </div>
        </div>
        <div style={showWhenVisible} >
          <div>
            <div onClick={this.toggleVisibility}>
              {this.state.blog.title} {this.state.blog.author}
            </div>
            <br></br>
            {this.state.blog.url}
            <br></br>
            {this.state.blog.likes} likes
            <button onClick={() => likeBlog()}>like</button>
            <br></br>
            added by {this.state.blog.user != null ?
              this.state.blog.user.name : 'unknown'
            }
            <div style={hideDeleteVisibility}>
              <button onClick={() => deleteBlog()}>delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog