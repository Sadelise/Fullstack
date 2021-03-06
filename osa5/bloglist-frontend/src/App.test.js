import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('does not render any blogs while user not signed in', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(0)

        console.log(blogComponents.debug())
    })
})

describe('<App /> signed in user', () => {
    let app

    const user = {
        username: 'Jaaks',
        token: 'passu',
        name: 'Jaakko'
    }

    beforeAll(() => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        app = mount(<App />)
    })
    it('blogs render when user is signed in', () => {
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
})