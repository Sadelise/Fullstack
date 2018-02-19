const supertest = require('supertest')
const {
  app,
  server
} = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({
      username: 'nakki',
      password: 'kastike'
    })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'Matti',
      password: 'meiks',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    const usernames = usersAfterOperation.map(u => u.username)
    console.log("usersAfterOperation ", usersAfterOperation);
    console.log("usernames ", usernames);
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'nakki',
      password: 'salasana',
      adult: false
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({
      error: 'username must be unique'
    })

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if password is too short', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'naks',
      password: 'sa',
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({
      error: 'password must be at least 3 characters long'
    })

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('adult defaults to true if not given', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'kaks',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    const usernames = usersAfterOperation.map(u => u.username)

    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    expect(usernames).toContain(newUser.username)

    const saved = usersAfterOperation.find(function(user) {
      return user.username === "kaks";
    });
    expect(saved.adult).toBe(true)
  })
})