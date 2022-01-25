/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:3001/';
// const API_URL = 'http://0.0.0.0:3001/';

const getReminders = () => axios.get(`${API_URL}reminders`, { headers: authHeader() });

const weatherAppCalendarApi = {
  getReminders,
};

export default weatherAppCalendarApi;
