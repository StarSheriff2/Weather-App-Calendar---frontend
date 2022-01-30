import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithRedux } from '../../tests/test-utils';
import Reminders from '../../components/Reminders';

afterEach(cleanup);

describe('Reminders', () => {
  test('Renders the Component', () => {
    const reminders = renderWithRedux(
      <Router>
        <Reminders />
      </Router>,
    ).toJSON();

    expect(reminders).toMatchSnapshot();
  });
});
