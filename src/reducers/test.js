export const test = (state = [], action) => {
    switch (action.type) {
      case 'TEST':
        return [
          ...action.data
        ]
      default:
        return state
    }
  }