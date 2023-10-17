import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import GoProfileForm from '../src/components/goProfileForm/GoProfileForm';
import { NavigationContainer } from '@react-navigation/native';

const mockStore = configureMockStore();

describe('GoProfileForm', () => {

  test('renders correctly based on userData', () => {
    const store = mockStore({
      auth: {
        userData: {
          name: 'YourUserNameFromRedux',
          email: 'YourUserEmailFromRedux'
        }
      }
    });

    const { getByText } = render(
        <Provider store={store}>
          <NavigationContainer>
            <GoProfileForm />
          </NavigationContainer>
        </Provider>
      );

    getByText('YourUserNameFromRedux');
    getByText('YourUserEmailFromRedux');
    getByText('Profile and statistics');
    getByText('Log-out');
  });
});