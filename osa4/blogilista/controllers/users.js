const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    password: user.password,
    adult: user.adult
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(formatUser))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({
      username: body.username
    })
    if (existingUser.length > 0) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }
    if (body.password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      adult: body.adult || true,
      password
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({
      error: 'something went wrong...'
    })
  }
})

module.exports = usersRouter