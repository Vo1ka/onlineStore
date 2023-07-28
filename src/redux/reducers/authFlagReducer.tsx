interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
};

const authFlagReducer = (state = initialState, action: { type: string, payload: boolean }) => {
  if (action.type === 'SET_IS_AUTH') {
    return { ...state, isAuth: action.payload };
  }
  return state;
};

export default authFlagReducer;