import React from 'react';
import "./App.css"
import Persons from "./Persons"
import AddForm from "./AddForm"
import Filter from "./Filter"
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterBy: ''
    }
  }

  componentWillMount() {
    console.log("mounting")
    axios.get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  handleFilterBy = (event) => {
    console.log(event.target.value)
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
        <Filter filterBy={this.state.filterBy}
          handleFilterBy={this.handleFilterBy}
        />
        <AddForm addPerson={this.addPerson}
          newName={this.state.newName}
          handleNewPerson={this.handleNewPerson}
          newNumber={this.state.newNumber}
          handleNewNumber={this.handleNewNumber}
        />
        <Persons persons={personsToShow} />
      </div>
    )
  }
}


export default App