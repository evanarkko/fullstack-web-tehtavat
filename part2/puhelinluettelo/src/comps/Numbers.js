import React from 'react'

const Numbers = ({people}) => {
    return (
        <div>
            <h2>Numerot</h2>
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
        </div>
    )

}

export default Numbers