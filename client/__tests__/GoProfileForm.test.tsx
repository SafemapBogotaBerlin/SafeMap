import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import GoProfileForm from '../src/components/goProfileForm/GoProfileForm';
import { NavigationContainer } from '@react-navigation/native';

// Create a mock store
const mockStore = configureMockStore();

describe('GoProfileForm', () => {

  test('renders correctly based on userData', () => {
    // Define a mock state for the store
    const store = mockStore({
      auth: {
        userData: {
          name: 'YourUserNameFromRedux',
          email: 'YourUserEmailFromRedux'
        }
      }
    });

    // Render the component wrapped in a Provider with the mock store
    const { getByText } = render(
        <Provider store={store}>
          <NavigationContainer>
            <GoProfileForm />
          </NavigationContainer>
        </Provider>
      );

    // Assertions
    getByText('YourUserNameFromRedux');
    getByText('YourUserEmailFromRedux');
    getByText('Profile and statistics');
    getByText('Log-out');
  });
});