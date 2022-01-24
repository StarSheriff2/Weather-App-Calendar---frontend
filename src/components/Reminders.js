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

  const { status, entities } = useSelector(remindersState);

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

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Reminders
        </h3>
      </header>
      {(status === 'pending' && (
        <p>Loading Content</p>
      ))
        || (status === 'fulfilled' && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        ))}
    </div>
  );
};

export default Reminders;
