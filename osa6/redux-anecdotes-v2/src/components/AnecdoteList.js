import React from 'react'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { setNotification, zeroNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.store.dispatch(anecdoteVoting(anecdote.id))
    this.props.store.dispatch(setNotification(`You voted '${anecdote.content}'`)) 
    setTimeout(() => {
      this.props.store.dispatch(zeroNotification())
    }, 5000)
  }

  anecdotesToShow = () => {
    const { anecdotes, filter } = this.props.store.getState()
    return anecdotes.filter(function(a){
      return a.content.toLowerCase().indexOf(filter.filter) !== -1;
    })
  }

  render() {
    const anecdotes = this.anecdotesToShow()

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => this.handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>)}
      </div>
    )
  }
}

export default AnecdoteList
