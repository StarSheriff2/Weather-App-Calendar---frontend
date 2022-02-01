import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import openWeatherApiService from '../services/openWeatherApi.service';
import { setMessage } from '../slices/message';

const WeatherForecast = ({
  coordinates, dateTime, dateDiff, currentReminder,
}) => {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const [lat, lon] = coordinates.split(', ');

  const fetchWeatherData = async () => {
    if (currentReminder) {
      const { data } = await openWeatherApiService.getCurrentWeather({ lat, lon });
      const { weather, main } = data;
      return [weather[0].icon, Math.round(main.temp)];
    }
    const { data } = await openWeatherApiService.getDailyWeather({ lat, lon });
    const { daily: tempByDate } = data;
    const { weather } = tempByDate[dateDiff];
    const { icon } = weather[0];
    const reminderHour = dateTime.getHours();
    const { temp } = tempByDate[dateDiff];

    if (reminderHour >= 5 && reminderHour < 12) {
      return [icon, Math.round(temp.morn)];
    } if (reminderHour >= 12 && reminderHour < 17) {
      return [icon, Math.round(temp.day)];
    } if (reminderHour >= 17 && reminderHour < 19) {
      return [icon, Math.round(temp.eve)];
    }
    return [icon, Math.round(temp.night)];
  };

  useEffect(async () => {
    try {
      const [icon, temp] = await fetchWeatherData();
      setWeatherData([icon, temp]);
    } catch (error) {
      dispatch(setMessage('Problems fetching weather data. Try reloading the page.'));
      setError('Network error');
    }

    return () => {
      setWeatherData();
    };
  }, []);

  if (!weatherData && !error) {
    return (<span className="spinner-border spinner-border-sm" />);
  }

  if (error) {
    return (<i className="fas fa-exclamation-circle text-warning" />);
  }

  return (
    weatherData && (
      <div className="d-flex flex-column justify-content-between align-items-center">
        <span>{`${weatherData[1]}°`}</span>
        <span><img src={`http://openweathermap.org/img/wn/${weatherData[0]}@2x.png`} alt="weather icon" width="60" /></span>
      </div>
    )
  );
};

WeatherForecast.propTypes = {
  coordinates: PropTypes.string.isRequired,
  dateTime: PropTypes.shape(
    null,
  ).isRequired,
  dateDiff: PropTypes.number.isRequired,
  currentReminder: PropTypes.bool,
};

WeatherForecast.defaultProps = {
  currentReminder: false,
};

export default WeatherForecast;
