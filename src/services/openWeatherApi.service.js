/* eslint-disable camelcase */
import axios from 'axios';

const ONE_CALL_API_URL = 'https://api.openweathermap.org/data/2.5/onecall';
const CURRENT_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getCurrentWeather = ({ lat, lon }) => axios.get(
  `${CURRENT_WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
);

const getDailyWeather = ({ lat, lon }) => axios.get(
  `${ONE_CALL_API_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
);

const openWeatherApiService = {
  getCurrentWeather,
  getDailyWeather,
};

export default openWeatherApiService;
