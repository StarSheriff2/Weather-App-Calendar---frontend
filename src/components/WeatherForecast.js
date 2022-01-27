import React from 'react';
import openWeatherApiService from '../services/openWeatherApi.service';

const WeatherForecast = ({ coordinates, reminderTime }) => {
  if (reminderTime < new Date()) {
    return (
      <div>
        <i className="fal fa-exclamation-circle" />
      </div>
    );
  }

  // const weatherData = ()
  return (
    <div>
      Hi!
    </div>
  );
};

export default WeatherForecast;
