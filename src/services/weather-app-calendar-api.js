/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:3001/';
// const API_URL = 'http://0.0.0.0:3001/';

const getReminders = () => axios.get(`${API_URL}reminders`, { headers: authHeader() });

const createReminder = ({
  description, datetime, city, location_coordinates,
}) => axios.post(`${API_URL}reminders`, {
  reminder: {
    description,
    datetime,
    city,
    location_coordinates,
  },
},
{ headers: authHeader() });

const weatherAppCalendarApi = {
  getReminders,
  createReminder,
};

export default weatherAppCalendarApi;
