import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
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
        <strong>Token:</strong>
        {' '}
        {currentUser.auth_token.substring(0, 20)}
        {' '}
        ...
        {' '}
        {currentUser.auth_token.substr(currentUser.auth_token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong>
        {' '}
        {currentUser.id}
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
