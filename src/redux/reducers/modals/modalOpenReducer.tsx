interface AuthState {
    modalOpen: boolean;
  }
  
  const initialState: AuthState = {
    modalOpen: false,
  };
  
  const modalOpenReducer = (state = initialState, action: { type: string, payload: boolean }) => {
    if (action.type === 'SET_MODAL_OPEN') {
      return { ...state, modalOpen: action.payload };
    }
    return state;
  };
  
  export default modalOpenReducer;