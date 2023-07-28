interface DataState {
    code: string;
    otp: string;
    phone: string;
  }
  
  const initialState: DataState = {
    code: '',
    otp: '',
    phone: '',
  };
  
  const loginDataReducer = (state = initialState, action: { type: string, payload: string }) => {
    if (action.type === 'SET_CODE') {
      return { ...state, code: action.payload };
    }
    if (action.type === 'SET_OTP') {
      return { ...state, otp: action.payload };
    }
    if (action.type === 'SET_PHONE_NUMBER') {
      return { ...state, phone: action.payload };
    }
    return state;
  };
  
  export default loginDataReducer;