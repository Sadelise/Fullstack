import React from 'react'

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

export default Kurssi