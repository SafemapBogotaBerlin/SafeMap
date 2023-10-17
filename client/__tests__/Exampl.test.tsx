import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/screens/login/Login';
import { Provider } from 'react-redux';
import {store} from '../src/redux/store';

describe('<Login />', () => {
  let component: any;

  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const tree: string = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains specific text', () => {
    const instance = component.root;
    const textElement = instance.findByProps({ testID: 'login-text' });
    expect(textElement.props.children).toBe('Login false.');
  });
});
