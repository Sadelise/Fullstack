import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            anecdotes: [
                {
                    text: 'If it hurts, do it more often',
                    votes: 0
                },
                {
                    text: 'Adding manpower to a late software project makes it later!',
                    votes: 0
                },
                {
                    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
                    votes: 0
                },
                {
                    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
                    votes: 0
                },
                {
                    text: 'Premature optimization is the root of all evil.',
                    votes: 0
                },
                {
                    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
                    votes: 0
                },
            ]
        }
    }

    vote = () => {
        let changedAnecdotes = this.state.anecdotes
        const votes = this.state.anecdotes[this.state.selected]["votes"]
        changedAnecdotes[this.state.selected].votes = votes + 1

        console.log(votes)

        return () => {
            this.setState({
                anecdotes: changedAnecdotes
            })
        }
    }

    next = () => {
        const next = Math.floor(Math.random() * 6);
        return () => {
            this.setState(() => ({
                selected: next
            }));
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.anecdotes[this.state.selected]["text"]}</p>
                <Button toiminto={this.next()}
                    otsikko="next anecdote" />
                <Button toiminto={this.vote()}
                    otsikko="vote" />
            </div>
        )
    }
}

const Button = ({ toiminto, otsikko }) => {
    return (
        <button onClick={toiminto}>
            {otsikko}
        </button>
    )
}

ReactDOM.render(

    // <App anecdotes={anecdotes} />,
    <App />,
    document.getElementById('root')
)




