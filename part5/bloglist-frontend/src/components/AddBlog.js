import React from 'react'

const AddForm = ({addBlog, fieldChange}) => {
    return(
        <form onSubmit={addBlog}>
            <b>create new</b>
            <table>
                <tbody>
                <tr>
                    <td><input name="title" type="text" placeholder="title" onChange={fieldChange}/></td>
                </tr>
                <tr>
                    <td><input  name="author" type="text" placeholder="author" onChange={fieldChange}/></td>
                </tr>
                <tr>
                    <td><input name="url" type="text" placeholder="url" onChange={fieldChange}/></td>
                </tr>
                <tr>
                    <td><button type="submit">create</button></td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default AddForm