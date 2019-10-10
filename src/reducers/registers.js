export const registers = (state=[], action) => {
    switch (action.type) {
      case 'UPDATE_REGISTERS':
          return action.registers;
      default:
        return state;
    }
  }