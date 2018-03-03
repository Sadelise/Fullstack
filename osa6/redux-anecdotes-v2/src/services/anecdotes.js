import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, {
    content
  })
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(url + `/${anecdote.id}`, {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  })
  return response.data
}

export default {
  getAll,
  createNew,
  updateAnecdote
}