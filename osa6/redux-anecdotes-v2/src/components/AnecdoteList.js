import React from 'react'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { setNotification, zeroNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => {
    this.props.anecdoteVoting(anecdote.id)
    this.props.setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.zeroNotification()
    }, 5000)
  }

  anecdotesToShow = () => {
    const { anecdotes, filter } = this.props
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  setNotification,
  zeroNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
