import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus, LOGIN, ROOT, TestReg } from '../../const';
import PrivateRouteLogin from './private-route-login';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const renderComponent = (store: MockStore) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <PrivateRouteLogin exact path={AppRoute.Login}>
          <h1>{LOGIN}</h1>
        </PrivateRouteLogin>
        <Route exact path={AppRoute.Root}>
          <h1>{ROOT}</h1>
        </Route>
      </Router>
    </Provider>,
  );

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render component for private route, when user not authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    renderComponent(store);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.Login)).toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });
    renderComponent(store);
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.Login)).not.toBeInTheDocument();
  });
});
