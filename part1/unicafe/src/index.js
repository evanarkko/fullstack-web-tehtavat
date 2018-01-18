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
            palautteidenLkm: 0
        }
    }

    countReview = () => {
        this.setState({palautteidenLkm: this.state.palautteidenLkm + 1})
    }
    goodReview = () => {
        this.countReview()
        this.setState({hyva: this.state.hyva + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja + 1})
    }
    neutralReview = () => {
        this.countReview()
        this.setState({neutraali: this.state.neutraali + 1})
    }
    badReview = () => {
        this.countReview()
        this.setState({huono: this.state.huono + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja - 1})
    }

    render() {
        return (
            <div>
                <h2>Anna Palautetta</h2>
                <div>
                    <button onClick={this.goodReview}>Hyvä</button>
                    <button onClick={this.neutralReview}>Neutraali</button>
                    <button onClick={this.badReview}>Huono</button>
                </div>
                <h2>Statistiikka</h2>

                <p>Hyvä: {this.state.hyva}</p>
                <p>Neutraali: {this.state.neutraali}</p>
                <p>Huono: {this.state.huono}</p>
                <PalautteidenKeskiarvo keskiarvonOsoittaja={this.state.keskiarvonOsoittaja}
                                       palautteidenLkm={this.state.palautteidenLkm}/>
                <PositiivistenOsuus hyva={this.state.hyva} palautteidenLkm={this.state.palautteidenLkm}/>
            </div>
        )
    }
}

const PalautteidenKeskiarvo = ({keskiarvonOsoittaja, palautteidenLkm}) => {
    let ka = keskiarvonOsoittaja / palautteidenLkm;
    if (palautteidenLkm === 0) ka = 0
    return (
        <p>Keskiarvo: {ka}</p>
    )
}

const PositiivistenOsuus = ({hyva, palautteidenLkm}) => {
    let po = (hyva / palautteidenLkm) * 100;
    if (hyva === 0) po = 0;
    return (
        <p>Positiivisia: {po}%</p>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));
