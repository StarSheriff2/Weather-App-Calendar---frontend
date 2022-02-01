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

  describe('clearMessage action', () => {
    test('should handle payload from successful request', () => {
      expect(messageReducer(initialState, clearMessage())).toEqual(
        {
          message: '',
        },
      );
    });
  });
});
