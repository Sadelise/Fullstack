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
        return (
            <div>
                <Otsikko otsikko={"anna palautetta"} />
                <div>
                    <button onClick={this.hyva}>
                        hyva
              </button>
                    <button onClick={this.neutraali}>
                        neutraali
              </button>
                    <button onClick={this.huono}>
                        huono
              </button>
                    <Otsikko otsikko={"statistiikka"} />
                    <div>hyvä {this.state.hyva}</div>
                    <div>neutraali {this.state.neutraali}</div>
                    <div>huono {this.state.huono}</div>
                </div>
            </div>
        )
    }
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)