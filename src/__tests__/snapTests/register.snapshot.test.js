import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import Register from '../../components/Register';

afterEach(cleanup);

describe('Register', () => {
  test('Renders the Component', () => {
    const register = renderWithRedux(
      <Router>
        <Register />
      </Router>,
    ).toJSON();

    expect(register).toMatchSnapshot();
  });
});
