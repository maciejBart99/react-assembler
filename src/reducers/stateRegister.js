export const stateRegister = (state={}, action) => {
    switch (action.type) {
      case 'UPDATE_STATE':
        return action.stateRegister;
      default:
        return state
    }
  } 