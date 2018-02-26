import React from 'react'
import { shallow } from 'enzyme'
import Blog from './SimpleBlog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Blogi',
      author: "Jaakko",
      likes: 2
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const blogDiv = blogComponent.find('.blog')
    const likesDiv = blogComponent.find('.likes')
    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})