import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from '../src/components/spinner/Spinner';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

describe('<Spinner />', () => {
  let component: any;

  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <Spinner />
      </Provider>
    );
  });

  it('renders  correctly', () => {
    const tree: string = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Spinner has one child', () => {
    const numberOfChildren = React.Children.count(
      component.root.props.children
    );
    expect(numberOfChildren).toBe(1);
  });

  it('Spinner component renders with correct color', () => {
    const tree = component.toJSON();

    const activityIndicator = tree.children.find(
      (child) => child.type === 'ActivityIndicator'
    );

    expect(activityIndicator.props.color).toBe('##0C5A1E');
  });
});
