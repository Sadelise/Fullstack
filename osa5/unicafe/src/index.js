import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)
const Nollaa = () => () => {
    store.dispatch({ type: 'ZERO' })
}

const Statistiikka = () => {
    const state = store.getState()

    const palautteita = state.good + state.ok + state.bad
    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{state.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{state.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{state.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{Keskiarvo()}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{Positiivisia()}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={Nollaa()}>nollaa tilasto</button>
        </div >
    )
}

function Keskiarvo() {
    const state = store.getState()
    return ((state.good - state.bad) / (state.good + state.ok + state.bad))
}
function Positiivisia() {
    const state = store.getState()
    return (
        <div>{state.good / (state.good + state.ok + state.bad) * 100} %</div>
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)