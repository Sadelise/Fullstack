import React from 'react';

const Filter = (props) => {
    return (
        <div>
            rajaa näytettäviä
            <input value={props.filterBy}
                onChange={props.handleFilterBy} />
        </div>
    )
}

export default Filter