const $ = require("jquery");

const dummy = (blogs) => {
    if (blogs) return 1
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(b => b.likes))
    console.log(blogs.map(b => b.likes))
    console.log(mostLikes)
    const favoriteBlog = blogs.find(blog => Number(blog.likes) === mostLikes)
    console.log(favoriteBlog)
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const authors = []
    blogs.forEach(blog => {
            const author = authors.find(author => author.name === blog.author)
            if(!author){
                authors.push({
                        name: blog.author,
                        blogs: 1
                    })
            }else{
                author.blogs = author.blogs + 1
            }
        })
    const mostBlogs = Math.max(...authors.map(a => a.blogs))
    const biggestBlogger = authors.find(author => author.blogs === mostBlogs)
    return biggestBlogger
}

const mostLikes = (blogs) => {
    const authors = []
    blogs.forEach(blog => {
        const author = authors.find(author => author.name === blog.author)
        if(!author){
            authors.push({
                name: blog.author,
                likes: blog.likes
            })
        }else{
            author.likes = author.likes + blog.likes
        }
    })
    const mostLikes = Math.max(...authors.map(a => a.likes))
    const bestBlogger = authors.find(author => author.likes === mostLikes)
    return bestBlogger
}

/*const trimContent = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}*/



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}