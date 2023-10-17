import { store } from '../src/redux/store';
import {
  setUserData,
  authenticate,
  updateUserName,
  logout,
} from '../src/redux/session';
import { UserData } from '../src/types/index';

describe('Home redux state tests', () => {
  const initialState = {
    authenticated: false,
    userData: null,
  };

  const user: UserData = {
    id: '12345',
    name: 'Testname',
    email: 'test@email.com',
    created: '20.04.2015',
    notificationToken: '12345',
  };
  it('Should initially set games to an empty object', () => {
    const state = store.getState().auth;
    expect(state).toEqual(initialState);
  });
  it('Should set user data', () => {
    store.dispatch(setUserData(user));
    const state = store.getState().auth;
    expect(state).toEqual({
      authenticated: initialState.authenticated,
      userData: user,
    });
  });

  it('Should authenticate', () => {
    store.dispatch(authenticate());
    const state = store.getState().auth;
    expect(state).toEqual({
      authenticated: true,
      userData: user,
    });
  });

  user.name = 'OtherTestObject';

  it('Should update username', () => {
    store.dispatch(updateUserName('OtherTestObject'));
    const state = store.getState().auth;
    expect(state).toEqual({
      authenticated: true,
      userData: user,
    });
  });

  it('logout', () => {
    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state).toEqual({ authenticated: false, userData: null });
  });
});
