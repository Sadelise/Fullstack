import React from 'react'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { setNotification, zeroNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
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
    )}

 handleVote = (anecdote) => {
   this.props.anecdoteVoting(anecdote.id)
   this.props.setNotification(`You voted '${anecdote.content}'`)
   setTimeout(() => {
     this.props.zeroNotification()
   }, 5000)
 }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(function(a){
    return a.content.toLowerCase().indexOf(filter.filter) !== -1;
  })
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  setNotification,
  zeroNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
