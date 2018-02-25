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

    const addedBlog = request.body
    if(!addedBlog.title || !addedBlog.url) {
        return response.sendStatus(400)
    }
    if(!addedBlog.likes) addedBlog.likes = 0
    addedBlog.user = userIds.find(id => true) //first user added


    const blog = new Blog(addedBlog)

    const result = await blog.save()
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

