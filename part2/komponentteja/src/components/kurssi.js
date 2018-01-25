import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    const parts = props.kurssi.osat
    return(
        <div>
            {parts.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}
const Yhteensa = (props) => {
    const parts = props.kurssi.osat
    return(
        <p>yhteensä {parts.map(osa => osa.tehtavia).reduce((sum, val) => sum + val)} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return(
        <div>
            <Otsikko kurssi={kurssi}/>
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi}  />
        </div>
    )
}

export default Kurssi