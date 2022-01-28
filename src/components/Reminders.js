import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewReminderFormModal from './NewReminderFormModal';
import WeatherForecast from './WeatherForecast';

import { fetchReminders, remindersState } from '../slices/reminders';
import { clearMessage } from '../slices/message';
import monthNames from '../common/months';

const Reminders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [weatherData, setWeatherData] = useState({});

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  const { message } = useSelector((state) => state.message);

  const { status, entities: reminders } = useSelector(remindersState);

  const dispatch = useDispatch();

  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchReminders());
    }
  }, []);

  return (
    <div className="container px-1">
      <header className="jumbotron d-flex flex-row justify-content-between align-items-center">
        <h3>
          Reminders
        </h3>
        <NewReminderFormModal />
      </header>

      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {(status === 'pending' && (
        <p>Loading Content</p>
      ))
        || (status === 'fulfilled' && (
          reminders.map((year) => {
            const { id, months } = year;

            return (
              <ul
                key={id}
                className={((id < new Date(Date.now()).getFullYear())) ? 'd-none' : 'd-block'}
              >
                <p className="display-4">{id}</p>

                {months.map((month) => {
                  const { id, dates } = month;

                  return (
                    <ul
                      key={id}
                      className={(((id - 1) < new Date().getMonth())) ? 'd-none' : 'd-block'}
                    >
                      <h4><strong>{monthNames[id - 1]}</strong></h4>
                      {dates.map((date) => {
                        const { id, reminders } = date;

                        return (
                          <div
                            key={id}
                            className={(id < new Date().toLocaleDateString()) ? 'd-none' : 'table-responsive-lg'}
                          >
                            <table className="table table-hover table-sm">
                              <caption>{new Date(id.replace(/-/g, '/')).toLocaleString('en-US', dateOptions)}</caption>
                              <tbody>
                                {reminders.map((reminder) => {
                                  const {
                                    id, description, city,
                                    date, time, location_coordinates: coordinates,
                                  } = reminder;

                                  // Compute difference in min between current t and reminder t
                                  const timeNow = new Date();
                                  const reminderTime = new Date(`${date}T${time}:00-06:00`);
                                  const diffMs = +timeNow - +reminderTime;
                                  const diffMins = Math.floor((diffMs / 1000) / 60);

                                  return (
                                    <tr
                                      key={id}
                                      className={(diffMins <= 20 && diffMins >= 0) ? 'active-reminder' : 'table-row'}
                                    >
                                      <td className={(diffMins <= 20 && diffMins >= 0) ? 'glow' : 'table-cell'}><small>{time}</small></td>
                                      <td>{description}</td>
                                      <td>{city.split(', ')[0]}</td>
                                      <td>
                                        <WeatherForecast
                                          coordinates={coordinates}
                                          date={date}
                                          weatherData={weatherData}
                                          setWeatherData={setWeatherData}
                                          dateTime={reminderTime}
                                          time={time}
                                          city={city}
                                          id={id}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </ul>
                  );
                })}
              </ul>
            );
          })
        ))}
    </div>
  );
};

export default Reminders;
