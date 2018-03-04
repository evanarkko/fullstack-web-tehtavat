const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const users = await User.find({})
    const userIds = users.map(user => user.id)

    const body = request.body
    if(!body.title || !body.url) {
        return response.sendStatus(400)
    }
    if(!body.likes) body.likes = 0
    body.user = userIds.find(id => true) //first user in list added as owner


    const blog = new Blog(body)
    const result = await blog.save()


    const user = User.findById(body.user)

    console.log(body.user)
    user.blogs = user.blogs.concat(result._id)
    await user.save()


    response.status(201).json(result)
})

blogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.sendStatus(204)
})

blogRouter.put('/:id', async (req, res) => {
    const blog = req.body

    result = await Blog.findByIdAndUpdate(req.params.id, blog)
    res.json(result)
})

module.exports = blogRouter

