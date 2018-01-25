import React from 'react';
import "./App.css"
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filterBy: ''
    }
  }

  componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterBy = (event) => {
    console.log(event.target.value)
    this.setState({ filterBy: event.target.value })
  }

  filterByName = (name) => {
    if (name !== undefined) {
      this.setState({ filterBy: name })
    }
  }

  render() {
    const countriesToShow =
      this.state.filterBy === '' ?
        this.state.countries :
        this.state.countries.filter(country => country.name.toLowerCase().indexOf(this.state.filterBy.toLowerCase()) > -1)



    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          find countries:
            <input value={this.state.filterBy}
            onChange={this.handleFilterBy} />
        </div>
        <Countries countries={countriesToShow} filterByName={this.filterByName} />
      </div>
    )
  }
}
const Countries = ({ countries, filterByName }) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <CountryList key={country.name} country={country} filterByName={filterByName} />)}
      </div>
    )
  } else {
    return "Too many countries, specify another filter"
  }
}
const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="Flag"></img>
    </div>
  )
}

const CountryList = ({ country, filterByName }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td >
              <div onClick={() => filterByName(country.name)}>
                {country.name}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}


export default App




