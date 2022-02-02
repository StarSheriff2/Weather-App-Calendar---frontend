import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong>
          {' '}
          Profile
        </h3>
      </header>
      <p>
        <strong>Name:</strong>
        {' '}
        {currentUser.name}
      </p>
      <p>
        <strong>Email:</strong>
        {' '}
        {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
