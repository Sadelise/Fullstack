import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({ kurssi }) =>
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto kurssi={kurssi} />
    </div>
const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    return (
        <div>
            {props.kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}
const Yhteensa = (props) => {
    const [osa1, osa2, osa3] = props.kurssi.osat
    return (
        <p>yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)