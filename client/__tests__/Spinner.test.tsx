import React from 'react';
import { render } from '@testing-library/react-native';
import Spinner from '../src/components/spinner/Spinner';

describe('Spinner', () => {

  test('renders spinner component', () => {
    const { getByTestId } = render(<Spinner />);

    const spinner = getByTestId('spinner');

    expect(spinner).toBeTruthy();

    expect(spinner.props.size).toBe("large");
    expect(spinner.props.color).toBe("##0C5A1E");
  });

});