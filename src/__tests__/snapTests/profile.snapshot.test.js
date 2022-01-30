import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithRedux } from '../../tests/test-utils';
import Profile from '../../components/Profile';

afterEach(cleanup);

describe('Profile', () => {
  test('Renders the Component', () => {
    const profile = renderWithRedux(
      <Router>
        <Profile />
      </Router>,
    ).toJSON();

    expect(profile).toMatchSnapshot();
  });
});
