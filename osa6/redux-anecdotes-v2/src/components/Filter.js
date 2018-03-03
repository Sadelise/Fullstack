import React from 'react'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
      var filter = event.target.value.trim()
      this.props.store.dispatch(setFilter(filter))
    }
    render() {
      const style = {
        marginBottom: 10
      }

      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}

export default Filter
