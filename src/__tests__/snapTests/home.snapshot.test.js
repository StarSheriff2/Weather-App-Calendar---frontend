import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import Home from '../../components/Home';

afterEach(cleanup);

describe('Home', () => {
  test('Renders the Component', () => {
    const home = renderWithRedux(
      <Router>
        <Home />
      </Router>,
    ).toJSON();

    expect(home).toMatchSnapshot();
  });
});
