import React from 'react';

const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            <h2>Numerot</h2>
            {persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
        </div>
    )
}
const Person = ({ person, deletePerson }) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                            <button type="submit" onClick={() => deletePerson(person)}>
                                delete </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Persons