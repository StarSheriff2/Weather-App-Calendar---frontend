import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRedux from '../../tests/test-utils';
import App from '../../App';

afterEach(cleanup);

describe('App', () => {
  test('Renders the App', () => {
    const app = renderWithRedux(<App />).toJSON();

    expect(app).toMatchSnapshot();
  });
});
