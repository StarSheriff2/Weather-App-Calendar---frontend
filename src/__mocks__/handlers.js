/* eslint-disable camelcase */
import { rest } from 'msw';

const weatherCalendarAppApi = process.env.REACT_APP_WEATHER_APP_CALENDAR_API;
const openWeatherApi = 'https://api.openweathermap.org/data/2.5/weather';

const mockWeatherCalendarAppApiResponses = {
  signUp: {
    message: 'Account created successfully',
    auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
  },
  login: {
    auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
    id: 1,
    name: 'Test User',
    email: 'foo@bar.com',
  },
  fetchReminders: [
    {
      id: 1,
      description: 'similique odit nesciunt',
      date: '2023-01-03',
      time: '07:59',
      city: 'Friesenhaven',
      location_coordinates: '32.761874953746414, -47.48298461620212',
    },
    {
      id: 2,
      description: 'velit consequuntur sit',
      date: '2023-01-11',
      time: '05:40',
      city: 'Isaacview',
      location_coordinates: '-68.99870281816538, -34.06243220125242',
    },
  ],
  newReminder: {
    id: 41,
    description: 'Go pick up business cards',
    date: '2022-02-01',
    time: '14:30',
    city: 'Buenos Aires',
    location_coordinates: '-34.6036844, -58.3815591',
  },
};

const mockOpenWeatherAppApiResponses = {
  getWeather: {
    coord: {
      lon: -47.483,
      lat: 32.7619,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 19.8,
      feels_like: 19.95,
      temp_min: 19.8,
      temp_max: 19.8,
      pressure: 1026,
      humidity: 81,
      sea_level: 1026,
      grnd_level: 1026,
    },
    visibility: 10000,
    wind: {
      speed: 7.18,
      deg: 149,
      gust: 8.58,
    },
    clouds: {
      all: 2,
    },
    dt: 1643573367,
    sys: {
      sunrise: 1643537168,
      sunset: 1643575209,
    },
    timezone: -10800,
    id: 0,
    name: '',
    cod: 200,
  },
};

const handlers = [
  rest.post(`${weatherCalendarAppApi}signup`, (req, res, ctx) => res(
    ctx.status(201),
    ctx.json(mockWeatherCalendarAppApiResponses.signUp),
  )),
  rest.get(`${weatherCalendarAppApi}reminders`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockWeatherCalendarAppApiResponses.fetchReminders),
  )),
  rest.get(`${openWeatherApi}`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockOpenWeatherAppApiResponses.reminders),
  )),
];

export default handlers;
