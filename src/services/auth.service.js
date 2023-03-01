/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = process.env.REACT_APP_WEATHER_APP_CALENDAR_API;

const register = ({ name, email, password, passwordConfirmation }) => {
  const res = axios.post(`${API_URL}signup`, {
    user: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });

  return res;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}auth/login`, {
    user: {
      email,
      password,
    },
  });

  if (response.data.auth_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
