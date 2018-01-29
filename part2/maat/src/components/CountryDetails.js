import React from 'react'

const CountryDetails = ({country}) => {

    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <img className={'flagImage'} alt='flag' src={country.flag}/>
        </div>
    )
}

export default CountryDetails