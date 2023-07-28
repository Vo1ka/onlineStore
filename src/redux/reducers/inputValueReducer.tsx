interface ValueState {
    value: string;
}
  
const initialState: ValueState = {
    value: '',
};

const inputValueReducer = (state = initialState, action: { type: string, payload: boolean }) => {
    if (action.type === 'SET_VALUE') {
        return { ...state, value: action.payload };
    }
    return state;
};

export default inputValueReducer