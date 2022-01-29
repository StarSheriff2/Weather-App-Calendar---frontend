import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import openWeatherApiService from '../services/openWeatherApi.service';
import { setMessage } from '../slices/message';

const WeatherForecast = ({
  coordinates, dateTime, weatherData, setWeatherData, id,
}) => {
  const getDateDiff = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();
  const dateDiff = getDateDiff(new Date(), dateTime);
  const idIcon = `${id}Icon`;
  const idTemp = `${id}Temp`;

  const [loaded, setLoaded] = useState(false);

  const [lat, lon] = coordinates.split(', ');

  const exclamationIcon = (<i className="fas fa-exclamation-circle" />);

  if (dateDiff < 0 || dateDiff > 7) {
    return (
      <div>
        {exclamationIcon}
      </div>
    );
  }

  const fetchWeatherData = async () => {
    if (dateDiff === 0) {
      const { data } = await openWeatherApiService.getCurrentWeather({ lat, lon });
      const { weather, main } = data;
      return { icon: weather[0].icon, temp: Math.round(main.temp) };
    }
    const { data } = await openWeatherApiService.getDailyWeather({ lat, lon });
    const { daily: tempByDate } = data;
    const reminderHour = dateTime.getHours();
    let reminderDatetimeTemp;

    if (reminderHour >= 5 && reminderHour < 12) {
      reminderDatetimeTemp = tempByDate[dateDiff].temp.morn;
    } else if (reminderHour >= 12 && reminderHour < 17) {
      reminderDatetimeTemp = tempByDate[dateDiff].temp.day;
    } else if (reminderHour >= 17 && reminderHour < 19) {
      reminderDatetimeTemp = tempByDate[dateDiff].temp.eve;
    } else {
      reminderDatetimeTemp = tempByDate[dateDiff].temp.night;
    }

    const { weather } = tempByDate[dateDiff];
    return { icon: weather[0].icon, temp: Math.round(reminderDatetimeTemp) };
  };

  useEffect(async () => {
    try {
      const data = await fetchWeatherData();
      const { icon, temp } = data;
      setWeatherData((prevData) => ({ ...prevData, [idIcon]: icon, [idTemp]: temp }));
      setLoaded(true);
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      dispatch(setMessage(`Weather services error: ${message}`));
      return exclamationIcon;
    }

    return () => {
      setWeatherData({});
      setLoaded(false);
    };
  }, []);

  if (!loaded) {
    return (<span className="spinner-border spinner-border-sm" />);
  }

  return (
    loaded && (
      <div className="d-flex flex-column justify-content-between align-items-center">
        <span>{`${weatherData[idTemp]}°`}</span>
        <span><img src={`http://openweathermap.org/img/wn/${weatherData[idIcon]}@2x.png`} alt="weather icon" width="60" /></span>
      </div>
    )
  );
};

WeatherForecast.propTypes = {
  coordinates: PropTypes.string.isRequired,
  dateTime: PropTypes.shape(
    null,
  ).isRequired,
  weatherData: PropTypes.shape(
    null,
  ).isRequired,
  setWeatherData: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default WeatherForecast;
