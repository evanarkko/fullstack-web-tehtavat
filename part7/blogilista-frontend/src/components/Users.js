import React from 'react'
import {Link} from 'react-router-dom'

const Users = ({users}) => {
    const userTableStyle = {
        border: 'dotted green',
        padding: 10,
        margin: 10
    }
    return(
        <div>
            <h1>Users</h1>
            <table style={userTableStyle}>
                <tbody>
                <tr><th>Name</th><th>Blogs</th></tr>
                {users.map(user =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user._id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Users