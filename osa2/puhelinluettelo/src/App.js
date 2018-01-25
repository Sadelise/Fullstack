import React from 'react';
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '1234567891'
        }
      ],
      newName: '',
      newNumber: ''
    }
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
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
        {this.state.persons.map(person => <Person key={person.name} person={person} />)}
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