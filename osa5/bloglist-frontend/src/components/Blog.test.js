import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('only blog name and author are shown first', () => {
        const blog = {
            title: 'Blogi',
            author: "Jaakko",
            url: 'www.blogi.fi',
            likes: 2
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        const blogDiv = blogComponent.find('.blog')
        expect(blogDiv.text()).toContain(blog.title)
        expect(blogDiv.text()).toContain(blog.author)

        console.log(blogDiv.debug())
    })

    it('after clicking name the details are displayed', () => {
        const blog = {
            title: 'Blogi',
            author: "Jaakko",
            url: 'www.blogi.fi',
            likes: 2
        }
        const mockHandler = jest.fn()

        const blogComponent = shallow(<Blog blog={blog} />)

        // haetaan klikattava osa komponentista
        const nameDiv = blogComponent.find('.blog')
        nameDiv.simulate('click')

        // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
        const contentDiv = blogComponent.find('.details')
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(blog.likes)
        console.log(nameDiv.debug())
        console.log(contentDiv.debug())
    })
})