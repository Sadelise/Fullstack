import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList' 
import PropTypes from 'prop-types'

class App extends React.Component {

  render() {
    const { store } = this.context

    const anecdotes = this.context.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification store={store}/>
        <AnecdoteList store={store} />
        <AnecdoteForm store={store} />
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App