import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './slices/auth';
import messageReducer from './slices/message';

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
