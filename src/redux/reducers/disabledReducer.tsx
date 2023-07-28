const disabledReducer = (state = false, action: { type: string, payload: boolean }) => {
    if (action.type === 'TOGGLE_BUTTON') {
      return action.payload;
    }
    return state;
  };
  
  export default disabledReducer;