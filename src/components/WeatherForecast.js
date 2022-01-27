import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import openWeatherApiService from '../services/openWeatherApi.service';
import { setMessage } from '../slices/message';

const WeatherForecast = ({
  coordinates, date, weatherData, setWeatherData,
}) => {
  const dispatch = useDispatch();
  const formDate = new Date(date).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  const [lat, lon] = coordinates.split(', ');

  const exclamationIcon = (<i className="fal fa-exclamation-circle" />);

  if (formDate < today) {
    return (
      <div>
        {exclamationIcon}
      </div>
    );
  }

  const fetchWeatherData = async () => {
    if (formDate === today) {
      const { data } = await openWeatherApiService.getCurrentWeather({ lat, lon });
      return data;
    }
    const { data } = await openWeatherApiService.getDailyWeather({ lat, lon });
    return data;
  };

  useEffect(async () => {
    if (!weatherData) {
      console.log('hi');
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

  console.log('response data: ', weatherData);

  return (
    <div>
      HI
    </div>
  );
};

export default WeatherForecast;
