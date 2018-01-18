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
    goodReview = () => () => {
        this.countReview()
        this.setState({hyva: this.state.hyva + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja + 1})
    }
    neutralReview = () => () => {
        this.countReview()
        this.setState({neutraali: this.state.neutraali + 1})
    }
    badReview = () => () => {
        this.countReview()
        this.setState({huono: this.state.huono + 1, keskiarvonOsoittaja: this.state.keskiarvonOsoittaja - 1})
    }

    render() {
        return (
            <div>
                <h2>Anna Palautetta</h2>
                <div>
                    <Button handleClick={this.goodReview()} text="Hyvä"/>
                    <Button handleClick={this.neutralReview()} text="Neutraali"/>
                    <Button handleClick={this.badReview()} text="Huono"/>
                </div>
                <h2>Statistiikka</h2>

                <Statistics hyva={this.state.hyva}
                            neutraali={this.state.neutraali}
                            huono={this.state.huono}
                            keskiarvonOsoittaja={this.state.keskiarvonOsoittaja}
                            palautteidenLkm={this.state.palautteidenLkm}/>
            </div>
        )
    }
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistics = (props) => {
    return (
        <div>
            <Statistic tyyppi="hyva" arvo={props.hyva}/>
            <Statistic tyyppi="neutraali" arvo={props.neutraali}/>
            <Statistic tyyppi="huono" arvo={props.huono}/>
            <Statistic tyyppi="keskiarvo" arvo={props.keskiarvonOsoittaja} lkm={props.palautteidenLkm}/>
            <Statistic tyyppi="positiiviset" arvo={props.hyva} lkm={props.palautteidenLkm}/>
        </div>
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
                <p>Hyvä: {arvo}</p>
            )
        case "neutraali":
            return (
                <p>Neutraali: {arvo}</p>
            )
        case "huono":
            return (
                <p>Huono: {arvo}</p>
            )
        default: break
    }

}

const PalautteidenKeskiarvo = ({osoittaja, palautteidenLkm}) => {
    let ka = osoittaja / palautteidenLkm;
    if (palautteidenLkm === 0) ka = 0
    return (
        <p>Keskiarvo: {ka}</p>
    )
}

const PositiivistenOsuus = ({hyvia, palautteidenLkm}) => {
    let po = (hyvia / palautteidenLkm) * 100;
    if (hyvia === 0) po = 0;
    return (
        <p>Positiivisia: {po}%</p>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'));
