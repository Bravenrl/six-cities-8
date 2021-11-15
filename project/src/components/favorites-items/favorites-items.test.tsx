import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { offersFavoriteAmsterdan, offersFavoriteParis } from '../../mock/mock';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { mockInitialStore } from '../../mock/mockStore';
import FavoritesItems from './favorites-items';
import { AppRoute, SortType } from '../../const';
import userEvent from '@testing-library/user-event';
import { ActionType } from '../../types/action';


const altText = 'Place';
const mockStore = configureMockStore();
const history = createMemoryHistory();
const root = 'root';
const titleText = new RegExp(`${root}`, 'i');
const city = 'Paris';
const componentStore = { ...mockInitialStore };
componentStore.DATA.favoriteOffers = [...offersFavoriteParis, ...offersFavoriteAmsterdan];


describe('Component: FavoritesItems', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render correctly', () => {
    const store = mockStore(componentStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Favorites}>
            <FavoritesItems city={city} />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getAllByAltText(altText).length).toBe(offersFavoriteParis.length);
    expect(screen.getByText(city)).toBeInTheDocument();
  });

  it('should redirect to /root when user clicked to city link', () => {
    const store = mockStore(componentStore);
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Favorites}>
              <FavoritesItems city={city} />
            </Route>
            <Route exact path={AppRoute.Root}>
              <h1>{root}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);
    expect(screen.queryByText(titleText)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(city));
    expect(screen.getByText(root)).toBeInTheDocument();
    expect(dispatch).nthCalledWith(1, {
      payload: city,
      type: ActionType.ChangeCity,
    });
    expect(dispatch).nthCalledWith(2, {
      payload: SortType.Popular,
      type: ActionType.ChangeSorting,
    });
  });

  it('should not render if hasn`t offer in city', () => {
    const emptyStore = { ...mockInitialStore };
    emptyStore.DATA.favoriteOffers.length = 0;

    const store = mockStore(emptyStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Favorites}>
            <FavoritesItems city={city} />
          </Route>
        </Router>
      </Provider>);
    expect(screen.queryByText(city)).not.toBeInTheDocument();
  });
});
