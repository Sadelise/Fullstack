
// const getId = (
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const initialState = {
  message: 'Tervetuloa'
}

const notificationReducer = (store = initialState, action) => {
  if (action.type === 'NOTIFICATION') {
    return [...store, {
      message: action.content,
    }]
  }
  if (action.type === 'ZERO') {

    return [...store, {
      message: '',
    }]
  }

  return store
}

export const setNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    content
  }
}

export const noMessage = () => {
  return {
    type: 'ZERO'
  }
}

export default notificationReducer