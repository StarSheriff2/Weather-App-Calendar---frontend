import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewReminderFormModal from './NewReminderFormModal';
import Reminder from './Reminder';
// import WeatherForecast from './WeatherForecast';

import { fetchReminders, remindersState } from '../slices/reminders';
import { clearMessage } from '../slices/message';
import monthNames from '../common/months';

const Reminders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

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

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container px-1">
      <header className="jumbotron d-flex flex-row justify-content-between align-items-center">
        <h3>
          Your Reminders
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
                      className={((id - 1) < new Date().getMonth()) ? 'd-none' : 'd-block'}
                    >
                      <h4><strong>{monthNames[id - 1]}</strong></h4>
                      {dates.map((date) => {
                        const { id, reminders } = date;

                        return (
                          <div
                            key={id}
                            className={(new Date(id.replace(/-/g, '/')).toLocaleDateString('en-US') < new Date().toLocaleDateString('en-US')) ? 'd-none' : 'table-responsive-lg'}
                          >
                            <table className="table table-hover table-sm">
                              <caption>
                                {`${(new Date(id.replace(/-/g, '/')).toLocaleDateString('en-US') === new Date().toLocaleDateString('en-US')) ? 'Today ' : ''}
                                  ${new Date(id.replace(/-/g, '/')).toLocaleString('en-US', dateOptions)}`}
                              </caption>
                              <tbody>
                                {reminders.map((reminder) => (
                                  <Reminder key={reminder.id} reminder={reminder} />
                                ))}
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
