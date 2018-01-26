import React from 'react'

const Names = ({people}) => {
    return (
        <table>
            <tbody>
            {people.map(person =>
                <tr key={person.name}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                </tr>
            )}
            </tbody>
        </table>
    )

}

export default Names