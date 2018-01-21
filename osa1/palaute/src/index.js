import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            hyva: 0,
            huono: 0,
            neutraali: 0
        }
    }
    annaPalaute = (tyyppi) => {
        return () => {
            if (tyyppi === "hyva") {
                this.setState((prevState) => ({
                    hyva: prevState.hyva + 1
                }));
            } else if (tyyppi === "neutraali") {
                this.setState((prevState) => ({
                    neutraali: prevState.neutraali + 1
                }));
            } else if (tyyppi === "huono") {
                this.setState((prevState) => ({
                    huono: prevState.huono + 1
                }));
            }
        }
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
                <Button annaPalaute={this.annaPalaute}
                    tyyppi={"hyva"} />
                <Button annaPalaute={this.annaPalaute}
                    tyyppi={"neutraali"} />
                <Button annaPalaute={this.annaPalaute}
                    tyyppi={"huono"} />
                <div>{statistics}</div>
            </div>
        )
    }
}

const Button = ({ annaPalaute, tila, tyyppi }) => {
    return (
        <button onClick={annaPalaute(tyyppi)}>
            {tyyppi}
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
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{otsikko}</td>
                        <td>{arvo}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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