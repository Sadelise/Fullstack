const initialState = {
  filter: ''
}

const filterReducer = (store = initialState, action) => {
  switch (action.type) {
  case 'FILTER':
    return {
      filter: action.filter,
    }
  default:
    return store
  }
}

export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default filterReducer