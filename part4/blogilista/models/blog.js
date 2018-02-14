const mongoose = require('mongoose')

const mongoUrl = 'mongodb://lordevan7:<salasana>@ds235388.mlab.com:35388/miller_blogment'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = Blog