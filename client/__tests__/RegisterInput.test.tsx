import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterInput from '../src/components/registerInput/RegisterInput';

describe('<RegisterInput />', () => {

  it('displays error message when input is not valid and has a value', () => {
    const { getByText } = render(
      <RegisterInput
        value="invalid_value"
        onChangeText={jest.fn()}
        valid={false}
        errorMessage="Invalid input!"
      />
    );

    expect(getByText('Invalid input!')).toBeTruthy();
  });

  it('does not display error message when input is valid', () => {
    const { queryByText } = render(
      <RegisterInput
        value="valid_value"
        onChangeText={jest.fn()}
        valid={true}
        errorMessage="Invalid input!"
      />
    );

    expect(queryByText('Invalid input!')).toBeNull();
  });

  it('displays the error message when showError is true', () => {
    const { getByText } = render(
      <RegisterInput
        value="some_value"
        onChangeText={jest.fn()}
        valid={false}
        errorMessage="This is an error!"
        placeholder="Enter value"
      />
    );

    expect(getByText('This is an error!')).toBeTruthy();
  });

  it('does not display the error message when valid', () => {
    const { queryByText } = render(
      <RegisterInput
        value="some_value"
        onChangeText={jest.fn()}
        valid={true}
        errorMessage="This is an error!"
        placeholder="Enter value"
      />
    );

    expect(queryByText('This is an error!')).toBeNull();
  });

  it('hides the entered value if secret prop is true', () => {
    const { getByPlaceholderText } = render(
      <RegisterInput
        value="secret_value"
        onChangeText={jest.fn()}
        valid={true}
        errorMessage="Invalid input!"
        placeholder="Enter secret value"
        secret={true}
      />
    );

    const input = getByPlaceholderText('Enter secret value');
    expect(input.props.secureTextEntry).toBeTruthy();
  });

});