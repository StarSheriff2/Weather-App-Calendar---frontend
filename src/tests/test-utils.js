/* eslint-disable react/prop-types */
import React from 'react';
// import { render as rtlRender } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
import authReducer from '../slices/auth';
import messageReducer from '../slices/message';
import remindersReducer from '../slices/reminders';

const appReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  reminders: remindersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// const render = (
//   ui,
//   {
//     initialState,
//     store = createStore(
//       rootReducer,
//       initialState,
//       applyMiddleware(thunk),
//     ),
//     ...renderOptions
//   } = {},
// ) => {
//   const Wrapper = ({ children }) => (
//     <Provider store={store}>{children}</Provider>
//   );

//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// };

const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      initialState,
    }),
  } = {},
) => ({
  ...TestRenderer.create(<Provider store={store}>{component}</Provider>),
});

// export * from '@testing-library/react';

export default renderWithRedux;
