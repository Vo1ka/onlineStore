import { combineReducers } from 'redux';
import disabledReducer from './disabledReducer';
import messagesReducer from './messagesReducer';
import loginDataReducer from './loginDataReducer';
import authFlagReducer from './authFlagReducer';
import inputValueReducer from './inputValueReducer'
import modalOpenReducer from './modals/modalOpenReducer';
import tokenReducer from './tokenReducer'
const rootReducer = combineReducers({
  isDisabled: disabledReducer,
  messages: messagesReducer,
  data: loginDataReducer,
  auth: authFlagReducer,
  inputValue: inputValueReducer,
  modalOpen: modalOpenReducer,
  token: tokenReducer,
});

export default rootReducer;