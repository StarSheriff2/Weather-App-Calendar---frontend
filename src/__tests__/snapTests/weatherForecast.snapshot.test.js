import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import WeatherForecast from '../../components/WeatherForecast';

afterEach(cleanup);

describe('WeatherForecast', () => {
  test('Renders the Component', async () => {
    const coordinates = '31.438327740769708, -69.93035045104288';
    const reminderTime = new Date('2022-02-03T05:39:00-06:00');
    const dateDiff = 0;

    const weatherForecast = renderWithRedux(
      <Router>
        <WeatherForecast
          coordinates={coordinates}
          dateTime={reminderTime}
          dateDiff={dateDiff}
        />
      </Router>,
    ).toJSON();

    expect(weatherForecast).toMatchSnapshot();
  });
});
