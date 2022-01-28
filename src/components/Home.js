import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Current Reminders</strong>
        </h3>
      </header>
      <p>...Under Construction</p>
    </div>
  );
};

export default Home;
