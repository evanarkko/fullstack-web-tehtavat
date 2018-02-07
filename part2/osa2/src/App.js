import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            newNote: 'New note...',
            showAllNotes: true,
            error: null
        }
    }

    componentWillMount() {
        noteService.getAll().then(notes => {
            console.log('data: ', notes)
            this.setState({notes})
        })
    }

    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date(),
            important: Math.random() > 0.5,
            id: this.state.notes.length + 1
        }

        noteService.create(noteObject)
            .then(newNote => {
                this.setState({
                    notes: this.state.notes.concat(newNote),
                    newNote: ''
                })
            })
    }
    handleInputChange = (event) => {
        console.log(event.target.value)
        this.setState({newNote: event.target.value})
    }

    toggleVisible = () => {
        this.setState({showAllNotes: !this.state.showAllNotes})
    }

    toggleImportanceOf = (id) => {
        return () => {
            const note = this.state.notes.find(n => n.id === id)
            const changedNote = {...note, important: !note.important}

            noteService.update(id, changedNote)
                .then(updatedNote => {
                    this.setState({
                        notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
                    })
                })
                .catch(error => {
                    this.setState({
                        error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
                        notes: this.state.notes.filter(n => n.id !== id)
                    })
                    setTimeout(() => {
                        this.setState({error: null})
                    }, 5000)
                })
        }
    }



    render() {
        const notesToShow = this.state.showAllNotes ?
            this.state.notes : this.state.notes.filter(note => note.important)
        const label = this.state.showAllNotes ? 'vain tärkeät' : 'kaikki'

        return (
            <div>
                <h1>Muistiinpanot</h1>
                <Notification message={this.state.error}/>
                <div>
                    <button onClick={this.toggleVisible}>
                        Näytä {label}
                    </button>
                </div>
                <ul>
                    {notesToShow.map(note =>
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={this.toggleImportanceOf(note.id)}
                        />
                    )}
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