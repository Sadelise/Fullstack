import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]


  return (
    <div>
      <p>{osat[0]["nimi"]}</p>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

function Otsikko(props) {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osat[0]} />
      <Osa osa={props.osat[1]} />
      <Osa osa={props.osat[2]} />
    </div>
  )
}

function Osa(props) {
  return (
    <div>
      <p>{props.osa["nimi"]} {props.osa["tehtavia"]}</p>
    </div>
  )
}

function Yhteensa(props) {
  return (
    <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)