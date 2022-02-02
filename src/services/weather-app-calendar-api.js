/* eslint-disable camelcase */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_WEATHER_APP_CALENDAR_API;

const getReminders = () => axios.get(`${API_URL}reminders`, { headers: authHeader() });

const createReminder = ({
  description, datetime, city, locationCoordinates,
}) => axios.post(`${API_URL}reminders`, {
  reminder: {
    description,
    datetime,
    city,
    location_coordinates: locationCoordinates,
  },
},
{ headers: authHeader() });

const weatherAppCalendarApi = {
  getReminders,
  createReminder,
};

export default weatherAppCalendarApi;
