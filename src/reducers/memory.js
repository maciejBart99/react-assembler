export const memory = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_MEMORY':
          return action.memory;
      case 'CLEAR_MEMORY':
          return [];
      default:
        return state
    }
  }