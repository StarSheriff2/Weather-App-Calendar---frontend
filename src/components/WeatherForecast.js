import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import openWeatherApiService from '../services/openWeatherApi.service';
import { setMessage } from '../slices/message';

const WeatherForecast = ({
  coordinates, date, dateTime, weatherData, setWeatherData, id,
}) => {
  const getDateDiff = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();
  const formDate = new Date(date).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const dateDiff = getDateDiff(new Date(), dateTime);
  const idIcon = `${id}Icon`;
  const idTemp = `${id}Temp`;

  const [loaded, setLoaded] = useState(false);

  const [lat, lon] = coordinates.split(', ');

  const exclamationIcon = (<i className="fas fa-exclamation-circle" />);

  if (formDate < today || dateDiff > 7) {
    return (
      <div>
        {exclamationIcon}
      </div>
    );
  }

  const fetchWeatherData = async () => {
    if (formDate === today) {
      const { data } = await openWeatherApiService.getCurrentWeather({ lat, lon });
      const { weather, main } = data;
      return { icon: weather[0].icon, temp: main.temp };
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
    return { icon: weather[0].icon, temp: reminderDatetimeTemp };
  };

  useEffect(async () => {
    if (Object.keys(weatherData).length === 0 || !(idIcon in weatherData)) {
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
    } else if (idIcon in weatherData) {
      setLoaded(true);
    }

    return () => {
      setWeatherData({});
      setLoaded(false);
    };
  }, [weatherData]);

  if (!loaded) {
    return (<span className="spinner-border spinner-border-sm" />);
  }

  return (
    loaded && (
      <div className="d-flex flex-column justify-content-between align-items-center">
        <span>{`${weatherData[idTemp]}℃`}</span>
        <span><img src={`http://openweathermap.org/img/wn/${weatherData[idIcon]}@2x.png`} alt="weather icon" width="60" /></span>
      </div>
    )
  );
};

export default WeatherForecast;
