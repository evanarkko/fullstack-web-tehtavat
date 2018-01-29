import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import CountryDetails from './components/CountryDetails'

class App extends Component {
    constructor() {
        super()
        this.state = {
            countries: [],
            displayedCountries: [],
            searchString: ''
        }
        axios.get('https://restcountries.eu/rest/v2/all/').then(response => {
            console.log('data: ', response.data)
            console.log('length: ', Object.keys(response.data).length)
            this.setState({countries: response.data})
        })
    }


    handleSearching = (event) => {
        console.log(event.target.value)
        this.setState({searchString: event.target.value})
        let countries = this.state.countries.filter(
            country =>
                country.name.toLowerCase()
                    .includes(
                        event.target.value.toLowerCase()))
        console.log(countries)

        if (countries.length < 10 && countries.length > 0) {
            this.setState({displayedCountries: countries})
        }else{
            this.setState({displayedCountries: []})
        }
    }

    forceDetails = event => {
        const name = event.target.textContent
        let countries = this.state.countries.filter(
            country =>
                country.name.toLowerCase()
                    .includes(
                        name.toLowerCase()))
        console.log(countries)
        if(countries.length === 1){
            this.setState({displayedCountries: countries})
        }
    }



render(){
    let countryList = this.state.displayedCountries.map(country => <p key={country.alpha2Code} onClick={this.forceDetails}>{country.name}</p>)
    let country = <div/>
    if(this.state.displayedCountries.length === 1){
        country = <CountryDetails country={this.state.displayedCountries[0]}/>
        countryList = []
    }

    return (
        <div><br/>
            <form>
                Find countries: <input value={this.state.searchString} onChange={this.handleSearching}/>
            </form>
            <div>
                {countryList}
            </div>

            {country}
        </div>
    )
    }

}

export default App;
