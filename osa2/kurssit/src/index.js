import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = ({ kurssi }) =>
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto kurssi={kurssi} />
        <Yhteensa kurssi={kurssi} />
    </div>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>
const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>
const Sisalto = ({ kurssi }) => {
    return (
        <div>
            {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}
const Yhteensa = ({ kurssi }) => {
    var total = kurssi.osat.reduce(function (sum, osa) {
        return sum + osa.tehtavia
    }, 0)
    return "yhteensä " + total + " tehtävää";
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
            },
            {
                nimi: 'Redux',
                tehtavia: 7,
                id: 4
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