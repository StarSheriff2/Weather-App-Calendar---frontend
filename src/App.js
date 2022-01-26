import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Reminders from './components/Reminders';

import { logout } from './slices/auth';

import AuthVerify from './common/AuthVerify';

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            WAC
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reminders" className="nav-link">
                    Reminders
                  </Link>
                </li>
              </>
            )}
          </div>

          {currentUser && (
          // <div className="dropdown d-md-none">
          //   <button className="nav-button-mobile mx-0 px-1 py-3 my-2 bg-transparent border-0" type="button" id="dropdownMenu"
          //     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="px-2 fas fa-bars"></i></button>
          //   <div className="dropdown-menu" aria-labelledby="dropdownMenu">
          //   <li className="nav-item">
          //      <Link to="/profile" className="nav-link">
          //        {currentUser.name}
          //      </Link>
          //    </li>
          //    <li className="nav-item">
          //      <a href="/login" className="nav-link" onClick={logOut}>
          //        LogOut
          //      </a>
          //    </li>
          //   </div>
          // </div>

          <div className="dropdown">
            <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-bars" />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              {/* <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a> */}
              <li className="nav-item dropdown-item">
                <Link to="/profile" className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item dropdown-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          </div>

          // <div className="navbar-nav ml-auto">
          // <li className="nav-item">
          //   <Link to="/profile" className="nav-link">
          //     {currentUser.name}
          //   </Link>
          // </li>
          // <li className="nav-item">
          //   <a href="/login" className="nav-link" onClick={logOut}>
          //     LogOut
          //   </a>
          // </li>
          // </div>
          )}
        </nav>

        <div className="container mt-3 px-1">
          <Switch>
            <Route exact path={['/', '/home']} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/reminders" component={Reminders} />
          </Switch>
        </div>

        <AuthVerify logOut={logOut} />
      </div>
    </Router>
  );
};

export default App;
