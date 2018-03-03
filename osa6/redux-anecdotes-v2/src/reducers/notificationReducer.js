const initialState = {
  message: 'Tervetuloa'
}

const notificationReducer = (store = initialState, action) => {
  if (action.type === 'NOTIFICATION') {
    return {
      message: action.content,
    }
  }
  if (action.type === 'ZERO') {
    return {
      message: '',
    }
  }
  return store
}

export const setNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    content
  }
}

export const zeroNotification = () => {
  return {
    type: 'ZERO'
  }
}

export default notificationReducer