import React from 'react'

const AdditionAlert = ({addedPerson}) => {
    if (addedPerson === null) {
        return null
    }
    const message = `lisättiin ${addedPerson}`
    return (
        <div className="add">
            {message}
        </div>
    )
}
const DeletionAlert = ({deletedPerson}) => {
    if (deletedPerson === null) {
        return null
    }
    const message = `poistettiin ${deletedPerson}`
    return (
        <div className="delete">
            {message}
        </div>
    )
}
const AlterAlert = ({alteredPerson}) => {
    if (alteredPerson === null) {
        return null
    }
    const message = `muutettiin ${alteredPerson}`
    return (
        <div className="alter">
            {message}
        </div>
    )
}

export default {AdditionAlert, DeletionAlert, AlterAlert}
