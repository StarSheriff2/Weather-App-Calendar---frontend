import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewReminderForm from './NewReminderForm';

import { fetchReminders, remindersState } from '../slices/reminders';
import { clearMessage } from '../slices/message';
import EventBus from '../common/EventBus';
import monthNames from '../common/months';

const Reminders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  const { status, entities: reminders } = useSelector(remindersState);

  const { message } = useSelector((state) => state.message);

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

  useEffect(() => {
    if (message === 'Sorry, your token has expired. Please login to continue.') {
      EventBus.dispatch('logout');
    }
  }, [message]);

  return (
    <div className="container px-1">
      <header className="jumbotron">
        <h3>
          Reminders
        </h3>
      </header>
      <NewReminderForm />
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
                                  const d2 = new Date();
                                  const d1 = new Date(`${date}T${time}:00-06:00`);
                                  const diffMs = +d2 - +d1;
                                  const diffMins = Math.floor((diffMs / 1000) / 60);

                                  return (
                                    <tr
                                      key={id}
                                      className={(diffMins <= 20 && diffMins >= 0) ? 'active-reminder' : 'table-row'}
                                    >
                                      <td className={(diffMins <= 20 && diffMins >= 0) ? 'glow' : 'table-cell'}>{time}</td>
                                      <td>{description}</td>
                                      <td>{city}</td>
                                      <td>{coordinates}</td>
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
