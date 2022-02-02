import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRedux from '../../tests/test-utils';
import NewReminderFormModal from '../../components/NewReminderFormModal';

afterEach(cleanup);

describe('NewReminderFormModal', () => {
  test('Renders the Component', () => {
    const newReminderFormModal = renderWithRedux(
      <NewReminderFormModal />,
    ).toJSON();

    expect(newReminderFormModal).toMatchSnapshot();
  });
});
