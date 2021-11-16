import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { fakeCity, offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import FavoritesItems from './favorites-items';
import { AppRoute, ROOT, SortType, TestReg } from '../../const';
import userEvent from '@testing-library/user-event';
import { ActionType } from '../../types/action';

const mockStore = configureMockStore();
const history = createMemoryHistory();


const componentState = {
  DATA: { ...MockDATA, favoriteOffers: [...offersFavoriteParis, ...offersFavoriteAmsterdan] },
  USER: { ...MockUSER },
  APP: { ...MockAPP },
};
const renderComponent = (store: MockStore) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path={AppRoute.Favorites}>
          <FavoritesItems city={fakeCity} />
        </Route>
      </Router>
    </Provider>);

describe('Component: FavoritesItems', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render correctly', () => {
    const store = mockStore(componentState);
    renderComponent(store);
    expect(screen.getAllByAltText(TestReg.PlaceAltText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(TestReg.FakeCity)).toBeInTheDocument();
  });

  it('should redirect to /root when user clicked to city link', () => {
    const store = mockStore(componentState);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Favorites}>
              <FavoritesItems city={fakeCity} />
            </Route>
            <Route exact path={AppRoute.Root}>
              <h1>{ROOT}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.FakeCity));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    expect(dispatch).nthCalledWith(1, {
      payload: fakeCity,
      type: ActionType.ChangeCity,
    });
    expect(dispatch).nthCalledWith(2, {
      payload: SortType.Popular,
      type: ActionType.ChangeSorting,
    });
  });

  it('should not render if hasn`t offer in city', () => {
    const emptyStore = { ...componentState, DATA: { ...MockDATA } };
    const store = mockStore(emptyStore);
    renderComponent(store);
    expect(screen.queryByText(fakeCity)).not.toBeInTheDocument();
  });
});
