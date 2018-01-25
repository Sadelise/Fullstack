import React from 'react';

const AddForm = (props) => {
  return (
    <div>
      <h2>Lisää uusi</h2>
      <form onSubmit={props.addPerson}>
        <div>
          nimi: <input
            value={props.newname}
            onChange={props.handleNewPerson}
          />
        </div>
        <div>
          numero: <input
            value={props.newNumber}
            onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default AddForm