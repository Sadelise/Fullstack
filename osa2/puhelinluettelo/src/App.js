import React from 'react';
import "./App.css"
import Persons from "./Persons"
import AddForm from "./AddForm"
import Filter from "./Filter"
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterBy: '',
      success: null
    }
  }

  componentWillMount() {
    personService
      .getAll().then(persons => {
        this.setState({ persons })
      })
  }

  handleFilterBy = (event) => {
    this.setState({ filterBy: event.target.value })
  }
  handleNewNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleNewPerson = (event) => {
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
      if (window.confirm(found.name + " on jo luettelossa, korvataanko vanha numero uudella?")) {
        this.updateExisting(personObject, found)
      }
    } else {
      this.saveNewPerson(personObject)
    }
  }
  updateExisting = (personObject, found) => {
    const updatedPersons = this.state.persons.slice();
    const index = this.state.persons.map(function (person) {
      return person.name;
    }).indexOf(found.name);
    updatedPersons[index].number = this.state.newNumber
    personService.update(found.id, personObject)
      .then(newPerson => {
        this.setState({
          persons: updatedPersons,
          newName: '',
          newNumber: ''
        })
      })
      .catch(error => {
        this.componentWillMount()
        this.saveNewPerson(personObject)
      })
    this.setMessage("päivitettiin " + personObject.name)
  }

  saveNewPerson = (personObject) => {
    personService.create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: ''
        })
        this.setMessage("lisättiin " + newPerson.name)
      })
  }
  deletePerson = (person) => {
    if (window.confirm('Poistetaanko ' + person.name + '?')) {
      personService.deletePerson(person.id)
        .then(response => {
          this.setMessage("poistettiin " + person.name)
          this.componentWillMount()
        })
    }
  }
  setMessage = (message) => {
    this.setState({ success: message })
    setTimeout(() => {
      this.setState({ success: null })
    }, 5000)
  }
  render() {
    const personsToShow =
      this.state.filterBy === '' ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filterBy.toLowerCase()) > -1)
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.success} />
        <Filter filterBy={this.state.filterBy}
          handleFilterBy={this.handleFilterBy}
        />
        <AddForm addPerson={this.addPerson}
          newName={this.state.newName}
          handleNewPerson={this.handleNewPerson}
          newNumber={this.state.newNumber}
          handleNewNumber={this.handleNewNumber}
        />
        <Persons persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
export default App