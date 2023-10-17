import React from 'react';
import renderer from 'react-test-renderer';
import BottomForm from '../src/components/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

describe('<Navigation/>', async () => {
  let component: any;

  beforeEach(() => {
    component = renderer.create(
      <Provider store={store}>
        <BottomForm fillType={''} />
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
