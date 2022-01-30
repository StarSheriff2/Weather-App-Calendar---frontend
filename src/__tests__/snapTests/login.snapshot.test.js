import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithRedux } from '../../tests/test-utils';
import Login from '../../components/Login';

afterEach(cleanup);

describe('Login', () => {
  test('Renders the Component', () => {
    const login = renderWithRedux(
      <Router>
        <Login />
      </Router>,
    ).toJSON();

    expect(login).toMatchSnapshot();
  });
});
