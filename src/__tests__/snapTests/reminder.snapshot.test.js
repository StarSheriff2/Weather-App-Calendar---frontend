import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import Reminder from '../../components/Reminder';

afterEach(cleanup);

describe('Reminder', () => {
  test('Renders the Component', async () => {
    const reminderProp = {
      description: 'quod consequatur',
      date: '2022-02-03',
      time: '05:39',
      city: 'Connville',
      location_coordinates: '31.438327740769708, -69.93035045104288',
    };

    const reminder = await renderWithRedux(
      <Router>
        <Reminder reminder={reminderProp} />
      </Router>,
    ).toJSON();

    expect(reminder).toMatchSnapshot();
  });
});
