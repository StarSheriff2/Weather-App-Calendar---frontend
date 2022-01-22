import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './slices/auth';
import messageReducer from './slices/message';

const appReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
