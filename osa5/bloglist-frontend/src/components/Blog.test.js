import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable'

    it('mount renders all components', () => {
        const blog1 = {
            title: 'Blogi',
            author: "Jaakko",
            likes: 2
        }
        const blog2 = {
            title: 'Blogi2',
            author: "Pekka",
            likes: 3
        }

        const blogComponent = mount(
            <Togglable buttonLabel="show...">
                <Blog blog={blog1} />
                <Blog blog={blog2} />
            </Togglable>
        )

        console.log(blogComponent.debug())
    })
