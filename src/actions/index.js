export const registersUpdated = (registers) => ({
    type: 'UPDATE_REGISTERS',
    registers
  });

export const memoryUpdated = (memory) => ({
    type: 'UPDATE_MEMORY',
    memory
});

export const memoryClear = (memory) => ({
  type: 'CLEAR_MEMORY',
  memory
});

export const scriptUpdated = (script) => ({
  type: 'UPDATE_SCRIPT',
  script
});

export const stateRegisterUpdated = (stateRegister) => ({
  type: 'UPDATE_STATE',
  stateRegister
});