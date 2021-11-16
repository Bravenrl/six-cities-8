import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, FAVORITE, LOGIN, TestReg } from '../../const';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const renderComponent = (store: MockStore) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path={AppRoute.Login}>
          <h1>{LOGIN}</h1>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => (<h1>{FAVORITE}</h1>)}
        />
      </Router>
    </Provider>,
  );

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    renderComponent(store);
    expect(screen.getByText(TestReg.Login)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.Favorite)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });
    renderComponent(store);
    expect(screen.getByText(TestReg.Favorite)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.Login)).not.toBeInTheDocument();
  });
});
