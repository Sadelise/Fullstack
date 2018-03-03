import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import PropTypes from 'prop-types'
import Filter from './components/Filter'

class App extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  render() {
    const { store } = this.context


    // const anecdotes = this.context.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter store={store}/>
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