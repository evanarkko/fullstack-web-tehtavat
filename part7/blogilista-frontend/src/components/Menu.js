import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    const menuStyle = {
        backgroundColor: 'pink',
        fontStyle: 'italic'
    }

    return(
        <div style={menuStyle}>
            <Link to="/">blogs</Link>&nbsp;
            <Link to="/users">users</Link>
        </div>
    )
}

export default Menu