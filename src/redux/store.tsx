import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// создайте хранилище с помощью configureStore
const store = configureStore({
  reducer: rootReducer,
});

export default store;