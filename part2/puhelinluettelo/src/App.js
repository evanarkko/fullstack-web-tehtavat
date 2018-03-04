import React from 'react';
import Number from './comps/Numbers'
import personService from './services/persons'
import Alert from './comps/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',


            addedPerson: null,
            deletedP: null,
            alteredP: null

        }
    }

    componentWillMount() {
        console.log('will mount')
        personService.getAll().then(personas => {
            this.setState({persons: personas})
        })
    }

    addNewPerson = (event) => {
        event.preventDefault()
        const newPerson = {name: this.state.newName, number: this.state.newNumber}
        if (!this.state.persons.map(person => person.name).includes(newPerson.name)) {//tarkistetaan onko jo nimi (varmaan tarpeeton)
            personService.create(newPerson).then(responsePerson => {
                this.setState({
                    persons: this.state.persons.concat(responsePerson),
                    addedPerson: newPerson.name
                })
                setTimeout(() => {
                    this.setState({addedPerson: null})
                }, 4000)
            })
        } else {
            const id = this.state.persons.find(person => person.name === newPerson.name).id
            if (window.confirm(`${newPerson.name} on jo luettelossa. Korvataanko numero?`)) {
                personService.updateNumber(id, newPerson)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.map(person => person.id !== id ? person : newPerson),
                            alteredP: newPerson.name
                        })
                        setTimeout(() => {
                            this.setState({alteredP: null})
                        }, 4000)
                    }).catch(error => {
                        personService.create(newPerson).then(responsePerson => {
                            this.setState({persons: this.state.persons.filter(person => person.name !== responsePerson.name).concat(responsePerson)})
                        })
                    })
            }
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

    deletePersonById = (id) => {
        return () => {
            const person = this.state.persons.find(person => person.id === id)
            if (window.confirm(`Poistetaanko ${person.name}?`)) {
                personService.remove(id)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== id)})
                    })
                this.setState({
                    deletedP: person.name
                })
                setTimeout(() => {
                    this.setState({deletedP: null})
                }, 4000)
            }
        }
    }

    render() {
        const filteredPeople = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Alert.AdditionAlert addedPerson={this.state.addedPerson}/>
                <Alert.DeletionAlert deletedPerson={this.state.deletedP}/>
                <Alert.AlterAlert alteredPerson={this.state.alteredP}/>
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

                <h2>Numerot</h2>
                <table>
                    <tbody>
                    {filteredPeople.map(person => <Number
                        key={person.id}
                        person={person}
                        deletePerson={this.deletePersonById(person.id)}
                    />)}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        document.title = 'Puhelinluettelo'
    }
}


export default App