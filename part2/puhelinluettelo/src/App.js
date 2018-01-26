import React from 'react';
import Numbers from './comps/Numbers'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number: '000 555 000'
                },
                {
                    name: 'Kullin Kääntäjä',
                    number: '120 555 000'
                },
                {
                    name: 'Pentti Joukkola',
                    number: '000 555 0230'
                }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    addNewPerson = (event) => {
        event.preventDefault()
        if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
            const persons = this.state.persons.concat({name: this.state.newName, number: this.state.newNumber})
            this.setState({persons})
        } else {
            alert('Nimi jo listassa')
        }
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value})
    }

    render() {
        const filteredPeople = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    rajaa näytettäviä<input value={this.state.filter} onChange={this.handleFilterChange}/>
                </form>
                <h2>Lisää Uusi</h2>
                <form onSubmit={this.addNewPerson}>
                    <div>
                        <div>nimi: <input value={this.state.newName} onChange={this.handleNameChange}/></div>
                        <div>numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/></div>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <Numbers people={filteredPeople}/>
            </div>
        )
    }
}



export default App