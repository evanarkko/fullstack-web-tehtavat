import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (prop) => {
    return (
        <h1>{prop.kurssi.nimi}</h1>
    )
}

const Osa = (prop) => {
    return (
        <p>{prop.osa.nimi} {prop.osa.tehtavia}</p>
    )
}

const Sisalto = (prop) => {
    return (
        <div>
            <Osa osa={prop.kurssi.osat[0]}/>
            <Osa osa={prop.kurssi.osat[1]}/>
            <Osa osa={prop.kurssi.osat[2]}/>
        </div>

    )
}

const Yhteensa = (prop) => {
    return (
        <p>Yhteensä {prop.kurssi.osat[0].tehtavia + prop.kurssi.osat[1].tehtavia + prop.kurssi.osat[2].tehtavia} tehtävää</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }
    return (
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi}/>
            <Yhteensa kurssi={kurssi}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))