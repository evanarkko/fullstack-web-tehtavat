import React from 'react'


const Number = ({person, deletePerson}) => {
    return(
        <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={deletePerson}>poista</button></td>
        </tr>
    )
}

export default Number