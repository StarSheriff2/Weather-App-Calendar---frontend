import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import Reminders from '../../components/Reminders';

afterEach(cleanup);

describe('Reminders', () => {
  test('Renders the Component', async () => {
    const reminders = await renderWithRedux(
      <Router>
        <Reminders />
      </Router>,
      {
        initialState: {
          auth: {
            isLoggedIn: true,
            user: {
              auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
              id: 1,
              name: 'Test User',
              email: 'foo@bar.com',
            },
          },
        },
      },
    ).toJSON();

    expect(reminders).toMatchSnapshot();
  });
});
