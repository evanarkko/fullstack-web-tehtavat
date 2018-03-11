import React from 'react'

const BlogView = ({blog}) => {
    console.log(blog)
    return(
        <div>
            <h2>Title: {blog ? blog.title : ""}</h2>
            <h2>Author: {blog ? blog.author : ""} </h2>
        </div>
    )
}

export default BlogView