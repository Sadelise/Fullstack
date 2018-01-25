import React from 'react';
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterBy: ''
    }
  }
  handleFilterBy = (event) => {
    // console.log(event.target.value)
    this.setState({ filterBy: event.target.value })
  }
  handleNewNumber = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  handleNewPerson = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    var avoid = this.state.newName
    var found = this.state.persons.find(function (person) {
      return person.name === avoid;
    });
    if (found) {
      alert("Henkilö on jo olemassa!")
    } else {
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  render() {
    const personsToShow =
      this.state.filterBy === '' ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filterBy.toLowerCase()) > -1)
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä
       <input value={this.state.filterBy}
            onChange={this.handleFilterBy} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newname}
              onChange={this.handleNewPerson}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNewNumber}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {personsToShow.map(person => <Person key={person.name} person={person} />)}
      </div>
    )
  }
}
const Person = ({ person }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App