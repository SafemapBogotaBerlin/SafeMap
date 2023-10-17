import reducer, { setUserData, authenticate, updateUserName, logout } from '../src/redux/session';
import { UserData } from '../src/types/index';

// Sample user data for testing
const sampleUserData: UserData = {
  id: '123456',
  email: 'johndoe@example.com',
  name: 'John Doe',
  created: '2023-10-16',
  notificationToken: 'abcdef123456'
};

describe('authSlice', () => {

    it('should return the initial state', () => {
      expect(reducer(undefined, {} as any)).toEqual({
        authenticated: false,
        userData: null
      });
    });

    it('should set user data', () => {
      expect(reducer(undefined, setUserData(sampleUserData))).toEqual({
        authenticated: false,
        userData: sampleUserData
      });
    });

    it('should authenticate the user', () => {
      expect(reducer(undefined, authenticate())).toEqual({
        authenticated: true,
        userData: null
      });
    });

    it('should update the user name', () => {
      const stateWithUser = {
        authenticated: true,
        userData: sampleUserData
      };

      expect(reducer(stateWithUser, updateUserName('Jane Doe'))).toEqual({
        authenticated: true,
        userData: {
          ...sampleUserData,
          name: 'Jane Doe'
        }
      });
    });

    // Testing logout
    it('should log the user out and reset the state', () => {
      const stateWithUser = {
        authenticated: true,
        userData: sampleUserData
      };

      expect(reducer(stateWithUser, logout())).toEqual({
        authenticated: false,
        userData: null
      });
    });
  });
