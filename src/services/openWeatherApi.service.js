/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/onecall/';

const getCurrentWeather = ({ lat, lon }) => axios.get(
  `${API_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
);

const getDailyWeather = ({ lat, lon }) => axios.get(
  `${API_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
);

const openWeatherApiService = {
  getCurrentWeather,
  getDailyWeather,
};

export default openWeatherApiService;
