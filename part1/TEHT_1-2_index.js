import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (prop) => {
    return (
        <h1>{prop.name}</h1>
    )
}

const Osa = (prop) => {
    return (
        <p>{prop.osa} {prop.tehtavia}</p>
    )
}

const Sisalto = (prop) => {
    return (
        <div>
            <Osa osa={prop.osa1} tehtavia={prop.tehtavia1}/>
            <Osa osa={prop.osa2} tehtavia={prop.tehtavia2}/>
            <Osa osa={prop.osa3} tehtavia={prop.tehtavia3}/>
        </div>

    )
}

const Yhteensa = (prop) => {
    return (
        <p>Yhteensä {prop.t1+prop.t2+prop.t3} tehtävää</p>
    )
}

const App = () => {
    const kurssi = "Half Stack- Sovelluskehitys"
    const osa1 = "Reactin perusteet"
    const tehtavia1 = 10
    const osa2 = "Tiedonvälitys propseilla"
    const tehtavia2 = 7
    const osa3 = "Komponenttien tila"
    const tehtavia3 = 14
    return (
        <div>
            <Otsikko name={kurssi}/>
            <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
            <Yhteensa t1={tehtavia1} t2={tehtavia2} t3={tehtavia3}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))