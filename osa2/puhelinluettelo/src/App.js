import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
  }

  handleNewPerson = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: ''
    })
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
      <p>{person.name}</p>
    </div>
  )
}

export default App