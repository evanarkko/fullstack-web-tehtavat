import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            keskiarvonOsoittaja: 0,
            palautteidenLkm: 0,
            anekdoottiNakyvilla: 0,
            anekdootinIndeksi: 0
        }
    }
    annaPalaute = pal => () => {
        this.setState({palautteidenLkm: this.state.palautteidenLkm + 1})
        switch(pal){
            case -1:
                this.setState({huono: this.state.huono + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja - 1})
                break
            case 0:
                this.setState({neutraali: this.state.neutraali + 1})
                break
            case 1:
                this.setState({hyva: this.state.hyva + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja + 1})
                break
            default:
        }
    }

    uusiAnekdootti = () => () => {
        this.setState({anekdoottiNakyvilla: 1, anekdootinIndeksi: random(5)})
    }

    aanestaAnekdoottia = (indeksi) => () => {
        let apu = aanet[indeksi] + 1
        aanet[indeksi] = apu
        this.forceUpdate()
    }

        render() {
        return (
            <div>
                <h2>Anna Palautetta</h2>
                <div>
                    <Button handleClick={this.annaPalaute(1)} text="Hyvä"/>
                    <Button handleClick={this.annaPalaute(0)} text="Neutraali"/>
                    <Button handleClick={this.annaPalaute(-1)} text="Huono"/>
                </div>
                <h2>Statistiikka</h2>

                <Statistics hyva={this.state.hyva}
                            neutraali={this.state.neutraali}
                            huono={this.state.huono}
                            keskiarvonOsoittaja={this.state.keskiarvonOsoittaja}
                            palautteidenLkm={this.state.palautteidenLkm}/><br></br>
                <div>
                    <Button handleClick={this.aanestaAnekdoottia(this.state.anekdootinIndeksi)} text="Äänestä"/>
                    <Button handleClick={this.uusiAnekdootti()} text="Anekdootti"/>
                    <Anecdote indeksi={this.state.anekdootinIndeksi} nakyva={this.state.anekdoottiNakyvilla}/>
                    <h3>Anecdote with most votes:</h3>
                    <Anecdote indeksi={suurimmanLuvunIndeksi(aanet, 6)} nakyva={this.state.anekdoottiNakyvilla}/>
                </div>
            </div>
        )
    }
}

const random = (max) => Math.floor(Math.random()*(max+1)) //random #

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const aanet = [0, 0, 0, 0, 0, 0]

const suurimmanLuvunIndeksi = (taulukko, taulukonPituus) => {
    let suurinLuku = 0;
    let indeksi = 0;
    for(let i = 0; i < taulukonPituus; i++){
        if(taulukko[i] > suurinLuku){
            suurinLuku = taulukko[i]
            indeksi = i
        }
    }
    console.log(taulukko)
    return indeksi
}

const Anecdote = ({indeksi, nakyva}) => {
    if(nakyva === 1){
        return(
            <div>
                <p>{anecdotes[indeksi]}</p>
                <p>has {aanet[indeksi]} votes</p>
            </div>
        )
    }
    return(
        <p></p>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistics = (props) => {
    if (props.palautteidenLkm === 0) {
        return (
            <div>Ei palautteita</div>
        )
    }
    return (
        <table>
            <tbody>
            <Statistic tyyppi="hyva" arvo={props.hyva}/>
            <Statistic tyyppi="neutraali" arvo={props.neutraali}/>
            <Statistic tyyppi="huono" arvo={props.huono}/>
            <Statistic tyyppi="keskiarvo" arvo={props.keskiarvonOsoittaja} lkm={props.palautteidenLkm}/>
            <Statistic tyyppi="positiiviset" arvo={props.hyva} lkm={props.palautteidenLkm}/>
            </tbody>
        </table>
    )
}

const Statistic = ({tyyppi, arvo, lkm}) => {
    switch (tyyppi) {
        case "keskiarvo":
            return (
                <PalautteidenKeskiarvo osoittaja={arvo} palautteidenLkm={lkm}/>
            )
        case "positiiviset":
            return (
                <PositiivistenOsuus hyvia={arvo} palautteidenLkm={lkm}/>
            )
        case "hyva":
            return (
                <tr>
                    <td>Hyvä:</td>
                    <td>{arvo}</td>
                </tr>
            )
        case "neutraali":
            return (
                <tr>
                    <td>Neutraali:</td>
                    <td>{arvo}</td>
                </tr>
            )
        case "huono":
            return (
                <tr>
                    <td>huono:</td>
                    <td>{arvo}</td>
                </tr>
            )
        default:
            break
    }

}

const PalautteidenKeskiarvo = ({osoittaja, palautteidenLkm}) => {
    let ka = osoittaja / palautteidenLkm;
    return (
        <tr>
            <td>Keskiarvo:</td>
            <td>{ka}</td>
        </tr>
    )
}

const PositiivistenOsuus = ({hyvia, palautteidenLkm}) => {
    let po = (hyvia / palautteidenLkm) * 100;
    return (
        <tr>
            <td>Positiivisuutta:</td>
            <td>{po}%</td>
        </tr>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));
