interface tokenReducerProps{
    token: string
}

const initialState: tokenReducerProps = {
    token: ''
}

const tokenReducer = (state = initialState, action: { type: string, payload: string } ) => {
    if (action.type === 'SET_TOKEN'){
        return {...state, token: action.payload}
    }
    return state
}

export default tokenReducer;