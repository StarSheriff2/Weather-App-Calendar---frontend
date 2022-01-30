import React from 'react';
import PropTypes from 'prop-types';
import WeatherForecast from './WeatherForecast';

const Reminder = ({ reminder }) => {
  const {
    description, city,
    date, time, location_coordinates: coordinates,
  } = reminder;

  const getDateDiff = (first, second) => Math.round((second - first) / (1000 * 60 * 60 * 24));

  // Compute difference in min between current t and reminder t
  const timeNow = new Date();
  const reminderTime = new Date(`${date}T${time}:00-06:00`);
  const diffMs = +timeNow - +reminderTime;
  const diffMins = Math.floor((diffMs / 1000) / 60);

  // Compute difference in days
  const dateDiff = getDateDiff(new Date(), reminderTime);

  let weatherContent = null;
  if (dateDiff < 0) {
    weatherContent = (
      <div>
        <i className="fas fa-exclamation-circle text-muted" />
      </div>
    );
  } else if (dateDiff > 7) {
    weatherContent = (
      <div>
        <i className="fas fa-exclamation-circle" />
      </div>
    );
  } else {
    weatherContent = (
      <WeatherForecast
        coordinates={coordinates}
        dateTime={reminderTime}
        dateDiff={dateDiff}
      />
    );
  }

  return (
    <tr
      className={(diffMins <= 20 && diffMins >= 0) ? 'table-row active-reminder' : 'table-row'}
    >
      <td className={(diffMins <= 20 && diffMins >= 0) ? 'glow align-middle' : 'table-cell align-middle'}><small>{time}</small></td>
      <td className="align-middle">{description}</td>
      <td className="align-middle">{city.split(', ')[0]}</td>
      <td className="align-middle">
        {weatherContent}
      </td>
    </tr>
  );
};

Reminder.propTypes = {
  reminder: PropTypes.shape({
    description: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location_coordinates: PropTypes.string.isRequired,
  }).isRequired,
};

export default Reminder;
