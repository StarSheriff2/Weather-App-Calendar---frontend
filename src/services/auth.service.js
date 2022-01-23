/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3001/';

const register = ({
  name, email, password, passwordConfirmation,
}) => axios.post(`${API_URL}signup`, {
  user: {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  },
});

const login = async (email, password) => {
  const response = await axios
    .post(`${API_URL}auth/login`, {
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
