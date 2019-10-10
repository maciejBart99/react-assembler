export const script = (state='', action) => {
    switch (action.type) {
      case 'UPDATE_SCRIPT':
        return action.script;
      default:
        return state
    }
  }