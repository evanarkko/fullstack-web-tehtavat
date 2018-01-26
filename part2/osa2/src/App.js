import React from 'react'
import Note from './components/Note'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: props.notes,
            newNote: 'New note...',
            showAllNotes: true
        }
    }

    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().new,
            important: Math.random() > 0.5,
            id: this.state.notes.length + 1
        }

        const notes = this.state.notes.concat(noteObject)

        this.setState({
            notes,
            newNote: ''
        })
    }
    handleInputChange = (event) => {
        console.log(event.target.value)
        this.setState({newNote : event.target.value})
    }

    toggleVisible = () => {
        this.setState({showAllNotes: !this.state.showAllNotes})
    }

    render() {
        const notesToShow = this.state.showAllNotes ?
            this.state.notes : this.state.notes.filter(note => note.important)
        const label = this.state.showAllNotes ? 'vain tärkeät' : 'kaikki'

        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleVisible}>
                        Näytä {label}
                    </button>
                </div>
                <ul>
                    {notesToShow.map(note => <Note key={note.id} note={note} />)}
                </ul>
                <form onSubmit={this.addNote}>
                    <input value={this.state.newNote} onChange={this.handleInputChange}/>
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default App