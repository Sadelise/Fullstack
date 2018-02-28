import React from 'react';

class App extends React.Component {
  klik = (nappi, id) => () => {
    this.props.store.dispatch({ type: nappi, anecdoteId: id })
  }
  getId = () => (100000 * Math.random()).toFixed(0)
  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        votes: 0,
        id: this.getId()
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((a, b) => a.votes < b.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.klik('VOTE', anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}


export default App