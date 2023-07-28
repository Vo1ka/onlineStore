interface MessagesState {
    errors: string;
    success: string;
  }
  
  const initialState: MessagesState = {
    errors: '',
    success: '',
  };
  
  const messagesReducer = (state = initialState, action: { type: string, payload: string }) => {
    if (action.type === 'SET_ERRORS') {
      return { ...state, errors: action.payload };
    }
    if (action.type === 'SET_SUCCESS') {
      return { ...state, success: action.payload };
    }
    return state;
  };
  
  export default messagesReducer;