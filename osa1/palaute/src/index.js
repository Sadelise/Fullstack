import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            hyva: 0,
            huono: 0,
            neutraali: 0
        }
    }
    hyva = () => {
        this.setState((prevState) => ({
            hyva: prevState.hyva + 1
        }));
    }
    huono = () => {
        this.setState((prevState) => ({
            huono: prevState.huono + 1
        }));
    }
    neutraali = () => {
        this.setState((prevState) => ({
            neutraali: prevState.neutraali + 1
        }));
    }

    render() {
        let statistics;
        if (this.state.hyva > 0 ||
            this.state.huono > 0 ||
            this.state.neutraali > 0) {
            statistics =
                <Statistics hyva={this.state.hyva}
                    neutraali={this.state.neutraali}
                    huono={this.state.huono} />
        } else {
            statistics = "ei yhtään palautetta annettu"
        }

        return (
            <div>
                <Otsikko otsikko={"anna palautetta"} />
                <Button tila={this.hyva}
                    otsikko={"hyva"} />
                <Button tila={this.neutraali}
                    otsikko={"neutraali"} />
                <Button tila={this.huono}
                    otsikko={"huono"} />
                <p>{statistics}</p>
            </div>
        )
    }
}
const Button = ({ tila, otsikko }) => {
    return (
        <button onClick={tila}>
            {otsikko}
        </button>
    )
}
const Statistics = ({ hyva, neutraali, huono }) => {
    const keskiarvo = Keskiarvo(hyva, neutraali, huono)
    const positiivisia = Positiivisia(hyva, neutraali, huono)
    return (
        <div>
            <Otsikko otsikko={"statistiikka"} />
            <Statistic otsikko={"hyvä"}
                arvo={hyva} />
            <Statistic otsikko={"neutraali"}
                arvo={neutraali} />
            <Statistic otsikko={"huono"}
                arvo={huono} />
            <Statistic otsikko={"keskiarvo"}
                arvo={keskiarvo} />
            <Statistic otsikko={"positiivisia"}
                arvo={positiivisia} />
        </div>
    )
}
const Statistic = ({ otsikko, arvo }) => {
    return (
        <div>{otsikko} {arvo}</div>
    )
}
const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}
function Keskiarvo(hyva, neutraali, huono) {
    console.log("keskiarvossa " + hyva)
    return ((hyva - huono) / (hyva + neutraali + huono))
}
function Positiivisia(hyva, neutraali, huono) {
    return (
        <div>{hyva / (hyva + neutraali + huono) * 100} %</div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)