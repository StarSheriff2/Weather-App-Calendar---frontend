import remindersReducer, { fetchReminders, newReminder } from '../../slices/reminders';

const initialState = {
  status: 'idle',
  entities: [],
  newReminderStatus: 'idle',
};

describe('remindersReducer', () => {
  test('should return the initial state', () => {
    expect(remindersReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchReminders action', () => {
    test('should handle payload from successful request', () => {
      const payload = [
        {
          id: 1,
          description: 'similique odit nesciunt',
          date: '2023-01-03',
          time: '07:59',
          city: 'Friesenhaven',
          location_coordinates: '32.761874953746414, -47.48298461620212',
        },
        {
          id: 2,
          description: 'velit consequuntur sit',
          date: '2023-01-11',
          time: '05:40',
          city: 'Isaacview',
          location_coordinates: '-68.99870281816538, -34.06243220125242',
        },
      ];

      expect(remindersReducer(initialState, fetchReminders.fulfilled(payload))).toEqual(
        {
          entities: [
            {
              id: 2023,
              months: [
                {
                  dates: [
                    {
                      id: '2023-01-03',
                      reminders: [
                        {
                          city: 'Friesenhaven',
                          date: '2023-01-03',
                          description: 'similique odit nesciunt',
                          id: 1,
                          location_coordinates: '32.761874953746414, -47.48298461620212',
                          time: '07:59',
                        },
                      ],
                    },
                    {
                      id: '2023-01-11',
                      reminders: [
                        {
                          city: 'Isaacview',
                          date: '2023-01-11',
                          description: 'velit consequuntur sit',
                          id: 2,
                          location_coordinates: '-68.99870281816538, -34.06243220125242',
                          time: '05:40',
                        },
                      ],
                    },
                  ],
                  id: 1,
                },
              ],
            },
          ],
          status: 'fulfilled',
          newReminderStatus: 'idle',
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Missing token',
      };

      expect(remindersReducer(initialState, fetchReminders.rejected(payload))).toEqual(
        {
          status: 'rejected',
          entities: [],
          newReminderStatus: 'idle',
        },
      );
    });
  });

  describe('newReminder action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        id: 41,
        description: 'Go pick up business cards',
        date: '2022-02-01',
        time: '14:30',
        city: 'Buenos Aires',
        location_coordinates: '-34.6036844, -58.3815591',
      };

      expect(remindersReducer(initialState, newReminder.fulfilled(payload))).toEqual(
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

      expect(remindersReducer(initialState, newReminder.rejected(payload))).toEqual(
        {
          status: 'idle',
          entities: [],
          newReminderStatus: 'rejected',
        },
      );
    });
  });
});
