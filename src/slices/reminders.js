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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const newReminder = createAsyncThunk(
  'reminders/newReminder',
  async (params, thunkAPI) => {
    try {
      const response = await weatherAppCalendarApi.createReminder(params);
      thunkAPI.dispatch(fetchReminders());
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  status: 'idle',
  entities: [],
  newReminderStatus: 'idle',
};

const remindersSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchReminders.pending]: (state) => {
      state.status = 'pending';
    },
    [fetchReminders.fulfilled]: (state, action) => {
      const reminders = {};

      action.payload.forEach((r) => {
        const year = parseInt(r.date.slice(0, 4), 10);
        const month = parseInt(r.date.slice(5, 7), 10);

        if (!(year in reminders)) {
          reminders[year] = {};
          reminders[year][month] = {};
          reminders[year][month][r.date] = [r];
        } else if (!(month in reminders[year])) {
          reminders[year][month] = {};
          reminders[year][month][r.date] = [r];
        } else if (!(r.date in reminders[year][month])) {
          reminders[year][month][r.date] = [r];
        } else {
          reminders[year][month][r.date].push(r);
        }
      });

      const remindersArr = Object.keys(reminders).map((year) => ({
        months: Object.keys(reminders[year]).map((month) => ({
          id: parseInt(month, 10),
          dates: Object.keys(reminders[year][month]).map((date) => ({
            id: date,
            reminders: reminders[year][month][date],
          })),
        })),
        id: parseInt(year, 10),
      }));

      state.status = 'fulfilled';
      state.entities = remindersArr;
    },
    [fetchReminders.rejected]: (state) => {
      state.status = 'rejected';
      state.entities = [];
    },
    [newReminder.pending]: (state) => {
      state.newReminderStatus = 'pending';
    },
    [newReminder.fulfilled]: (state) => {
      state.newReminderStatus = 'fulfilled';
    },
    [newReminder.rejected]: (state) => {
      state.newReminderStatus = 'rejected';
    },
  },
});

export const remindersState = (state) => state.reminders;
const { reducer } = remindersSlice;
export default reducer;
