const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const users = await User.find({})
        const usernames = users.map(user => user.username)
        if(usernames.includes(body.username)){
            response.status(400).json({ error: 'Username already taken...' })
            return
        }

        if(body.password.length < 3){
            response.status(400).json({ error: 'password less than 3 characters...' })
            return
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult || true,
            passwordHash
        })



        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(formatUser))
})

module.exports = usersRouter