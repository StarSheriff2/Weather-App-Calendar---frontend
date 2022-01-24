/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import weatherAppCalendarApi from '../services/weather-app-calendar-api';

export const fetchReminders = createAsyncThunk(
  'reminders/fetchReminders',
  async (thunkAPI) => {
    try {
      const response = await weatherAppCalendarApi.getReminders();
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

const initialState = { entities: [] };

const remindersSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchReminders.fulfilled]: (state, action) => {
      state.entities = action.payload;
    },
  },
});

const { reducer } = remindersSlice;
export default reducer;
