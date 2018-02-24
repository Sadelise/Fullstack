import React from 'react'
import Togglable from './Togglable'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible} onClick={this.toggleVisibility}>
          <div>
            {this.props.blog.title} {this.props.blog.author}
          </div>
        </div>
        <div style={showWhenVisible} onClick={this.toggleVisibility}>
          <div>
            {this.props.blog.title} {this.props.blog.author}
            <br></br>
            {this.props.blog.url}
            <br></br>
            {this.props.blog.likes} likes
            <button>like</button>

            <br></br>
            added by {this.props.blog.user != null ?
              this.props.blog.user.name : 'unknown'
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Blog