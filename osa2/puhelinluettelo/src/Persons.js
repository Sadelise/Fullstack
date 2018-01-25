import React from 'react';

const Persons = ({ persons }) => {
    return (
        <div>
            <h2>Numerot</h2>
            {persons.map(person => <Person key={person.name} person={person} />)}
        </div>
    )
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

export default Persons