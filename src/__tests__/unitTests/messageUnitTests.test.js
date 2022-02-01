import messageReducer, { setMessage, clearMessage } from '../../slices/message';

const initialState = {};

describe('messageReducer', () => {
  test('should return the initial state', () => {
    expect(messageReducer(undefined, {})).toEqual(initialState);
  });

  describe('setMessage action', () => {
    test('should handle payload from successful request', () => {
      const payload = 'Problems fetching weather data. Try reloading the page.';

      expect(messageReducer(initialState, setMessage(payload))).toEqual(
        {
          message: 'Problems fetching weather data. Try reloading the page.',
        },
      );
    });
  });

  xdescribe('newReminder action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        id: 41,
        description: 'Go pick up business cards',
        date: '2022-02-01',
        time: '14:30',
        city: 'Buenos Aires',
        location_coordinates: '-34.6036844, -58.3815591',
      };

      expect(messageReducer(initialState, newReminder.fulfilled(payload))).toEqual(
        {
          status: 'idle',
          entities: [],
          newReminderStatus: 'fulfilled',
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Invalid segment encoding',
      };

      expect(messageReducer(initialState, newReminder.rejected(payload))).toEqual(
        {
          status: 'idle',
          entities: [],
          newReminderStatus: 'rejected',
        },
      );
    });
  });
});
