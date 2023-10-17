import { store } from '../src/redux/store';
import {
  selectPoint,
  toggleForm,
  whatShouldBeOpenedChange,
} from '../src/redux/home';
import { Coordinates } from '../src/types';

describe('Home redux state tests', () => {
  it('Should initially set games to an empty object', () => {
    const state = store.getState().home;
    expect(state).toEqual({
      data: {},
      isFormOpen: false,
      isPointClicked: false,
      selectedPoint: null,
      whatShouldBeOpened: '',
    });
  });

  it('Should select a point ', () => {
    store.dispatch(selectPoint(<Coordinates>{ latitude: 20, longitude: 20 }));
    const state = store.getState().home;
    expect(state).toEqual({
      data: {},
      isFormOpen: false,
      isPointClicked: false,
      selectedPoint: { latitude: 20, longitude: 20 },
      whatShouldBeOpened: '',
    });
  });

  it('Should toggle a form ', () => {
    store.dispatch(toggleForm(true));
    const state = store.getState().home;
    expect(state).toEqual({
      data: {},
      isFormOpen: true,
      isPointClicked: false,
      selectedPoint: { latitude: 20, longitude: 20 },
      whatShouldBeOpened: '',
    });
  });

  it('Should store what should be open ', () => {
    store.dispatch(whatShouldBeOpenedChange('profile'));
    const state = store.getState().home;
    expect(state).toEqual({
      data: {},
      isFormOpen: true,
      isPointClicked: false,
      selectedPoint: { latitude: 20, longitude: 20 },
      whatShouldBeOpened: 'profile',
    });
  });
});
