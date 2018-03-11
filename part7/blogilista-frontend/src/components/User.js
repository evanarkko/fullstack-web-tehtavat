import React from 'react'

const User = ({user}) => {
    const userStyle = {
        border: 'solid green',
        borderRadius: '1em',
        paddingLeft: 10,
        margin: 10,
        backgroundColor: 'yellow'
    }
    return(
        <div style={userStyle}>
            <h2>{user ? user.name : ""}</h2>
            <h3>Added blogs</h3>
            <ul>
                {user ? user.blogs.map(blog => <li>{blog.title}</li>) : ""}
            </ul>

        </div>
    )
}

export default User