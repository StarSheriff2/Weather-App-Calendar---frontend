/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import weatherAppCalendarApi from '../services/weather-app-calendar-api';

export const fetchReminders = createAsyncThunk(
  'reminders/fetchReminders',
  async (thunkAPI) => {
    try {
      const response = await weatherAppCalendarApi.getReminders();
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

const initialState = {
  status: 'idle',
  entities: [],
};

const remindersSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchReminders.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchReminders.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.entities = action.payload;
    },
    [fetchReminders.rejected]: (state) => {
      state.status = 'rejected';
      state.entities = [];
    },
  },
});

export const remindersState = (state) => state.reminders;
const { reducer } = remindersSlice;
export default reducer;
