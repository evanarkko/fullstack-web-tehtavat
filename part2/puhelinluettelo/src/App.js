import React from 'react';
import Numbers from './comps/Numbers'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentWillMount() {
        console.log('will mount')
        axios.get('http://localhost:3001/persons').then(response => {
            console.log('data: ', response.data)
            this.setState({persons: response.data})
        })
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