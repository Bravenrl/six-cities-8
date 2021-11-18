import userEvent from '@testing-library/user-event';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import PlacesOption from './places-options';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { fakeCity } from '../../mock/mock';
import { AppRoute, SortType, TestID, TestReg } from '../../const';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';

const ACTIVE = 'places__option--active';
const OPENED = 'places__options--opened';
const sortTypes = Object.values(SortType);

const history = createMemoryHistory();
const mockStore = configureMockStore();

const componentState = {
  DATA: { ...MockDATA },
  USER: { ...MockUSER, city: fakeCity, sortType: SortType.Popular },
  APP: { ...MockAPP },
};

const renderComponent = (store: MockStore) => render(
  <Provider store={store}>
    <Router history={history}>
      < PlacesOption />
    </Router>
  </Provider>);

describe('Component: PlacesOption', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly', () => {
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByText(TestReg.OptionText)).toBeInTheDocument();
    expect(screen.getByRole('list')).not.toHaveClass(OPENED);
    expect(screen.getAllByRole('listitem')).toHaveLength(sortTypes.length);
    expect(screen.getAllByRole('listitem')
      .filter((item) => item.className.includes(ACTIVE))).toHaveLength(1);
  });
  it('should dispatch changeSorting', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getByRole('list')).not.toHaveClass(OPENED);
    userEvent.click(screen.getByTestId(TestID.Option));
    expect(screen.getByRole('list')).toHaveClass(OPENED);
    userEvent.click(screen.getAllByRole('listitem')[1]);
    expect(dispatch).toHaveBeenCalledWith({payload: sortTypes[1], type: ActionType.ChangeSorting});
  });
});
