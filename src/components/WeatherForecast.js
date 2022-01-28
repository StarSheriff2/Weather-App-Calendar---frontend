import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import openWeatherApiService from '../services/openWeatherApi.service';
import { setMessage } from '../slices/message';
import { remindersState } from '../slices/reminders';

const WeatherForecast = ({
  coordinates, date, dateTime, weatherData, setWeatherData,
}) => {
  const getDateDiff = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();
  const formDate = new Date(date).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  // const dateObj = new Date(date);
  const dateDiff = getDateDiff(new Date(), dateTime);

  const [lat, lon] = coordinates.split(', ');

  const exclamationIcon = (<i className="fal fa-exclamation-circle" />);

  if (formDate < today || dateDiff > 7) {
    console.log('Im before today and not in next 7 days');
    return (
      <div>
        {exclamationIcon}
      </div>
    );
  }

  const fetchWeatherData = async () => {
    if (formDate === today) {
      console.log('Im happening today');
      // const reminderDateUnixUtc = dateTime.getTime() / 1000;
      // const reminderDateHour = dateTime.getHours();
      const { data } = await openWeatherApiService.getCurrentWeather({ lat, lon });
      return data;
    }
    const { data } = await openWeatherApiService.getDailyWeather({ lat, lon });
    const { daily: tempByDate } = data;
    console.log('dateDiff: ', dateDiff);
    console.log('daily temps: ', tempByDate[dateDiff]);
    const reminderHour = dateTime.getHours();
    console.log('hour of reminder" ', reminderHour);
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

    return reminderDatetimeTemp;
  };

  useEffect(async () => {
    if (!weatherData) {
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (error) {
        const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
        dispatch(setMessage(`Weather services error: ${message}`));
      }
    }

    return () => {
      setWeatherData(null);
    };
  }, [weatherData]);

  console.log('response data - temp of day: ', weatherData);

  return (
    <div className="d-flex flex-column justify-content-between">
      <span>{`${weatherData}℃`}</span>
    </div>
  );
};

export default WeatherForecast;
