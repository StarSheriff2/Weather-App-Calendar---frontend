import authReducer, { register, login } from '../../slices/auth';

const initialState = {
  isLoggedIn: false,
  user: null,
};

describe('authReducer', () => {
  test('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  describe('register action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        message: 'Account created successfully',
        auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
      };

      expect(authReducer(initialState, register.fulfilled(payload))).toEqual(
        {
          isLoggedIn: false,
          user: null,
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: "Validation failed: Password can't be blank, Name can't be blank, Email can't be blank, Email is invalid, Password digest can't be blank",
      };

      expect(authReducer(initialState, register.fulfilled(payload))).toEqual(
        {
          isLoggedIn: false,
          user: null,
        },
      );
    });
  });

  describe('login action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        user: {
          auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
          id: 1,
          name: 'Test User',
          email: 'foo@bar.com',
        },
      };

      expect(authReducer(initialState, login.fulfilled(payload))).toEqual(
        {
          isLoggedIn: true,
          user: {
            auth_token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDM2NDQwODB9.ZMGLcmQFckKcCHT9ucSCsK4z2znFIs95_AiuguutkVk',
            email: 'foo@bar.com',
            id: 1,
            name: 'Test User',
          },
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Invalid credentials',
      };

      expect(authReducer(initialState, login.rejected(payload))).toEqual(
        {
          isLoggedIn: false,
          user: null,
        },
      );
    });
  });

  xdescribe('logoutUser action', () => {
    test('should handle payload from successful request', () => {
      const payload = {
        logged_out: true,
      };

      expect(authReducer(initialState, logoutUser.fulfilled(payload))).toEqual(
        {
          user: {},
          logged_in: false,
          status: 'fulfilled',
          error: null,
        },
      );
    });
  });
});
