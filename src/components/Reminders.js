import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';

import { fetchReminders, remindersState } from '../slices/reminders';
import { clearMessage } from '../slices/message';
import EventBus from '../common/EventBus';

const Reminders = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  const { status, entities: reminders } = useSelector(remindersState);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

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

  const remindersList = reminders.map((r) => (
    <tr
      className={(new Date(r.datetime) < new Date(Date.now())) ? 'd-none' : 'table-row'}
      key={r.id}
    >
      <td>{r.description}</td>
      <td>{r.city}</td>
      <td>rainy</td>
    </tr>
  ));

  return (
    <div className="container px-1">
      <header className="jumbotron">
        <h3>
          Reminders
        </h3>
      </header>
      {(status === 'pending' && (
        <p>Loading Content</p>
      ))
        || (status === 'fulfilled' && (
          <div className="table-responsive-lg">
            <table className="table table-hover table-sm">
              <tbody>
                {remindersList}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default Reminders;
