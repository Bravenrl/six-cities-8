import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, FAVORITE, TestReg } from '../../const';
import userEvent from '@testing-library/user-event';
import HeaderNav from './header-nav';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';

const EMAIL = 'aaa@bb.com';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const state = {
  DATA: {
    userEmail: EMAIL,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
};

const renderComponent = (store: MockStore, path : AppRoute) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path={path}>
          <HeaderNav />
        </Route>
      </Router>
    </Provider>);

describe('Component: HeaderNav', () => {
  it('should render correctly if AuthStatus !== Auth', () => {
    const nonAuthState = {...state, USER: {authorizationStatus: AuthorizationStatus.NoAuth}};
    const store = mockStore(nonAuthState);
    renderComponent(store, AppRoute.Root);

    expect(screen.getByText(TestReg.SignIn)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(1);
    expect(screen.queryByText(TestReg.SignOut)).not.toBeInTheDocument();
  });

  it('should render correctly if AuthStatus === Auth', () => {
    const store = mockStore(state);
    renderComponent(store, AppRoute.Root);
    expect(screen.getByText(TestReg.SignOut)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(EMAIL, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.queryByText(TestReg.SignIn)).not.toBeInTheDocument();
  });

  it('should redirect to /favorite when user clicked on link', () => {
    history.push(AppRoute.Root);
    const store = mockStore(state);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <HeaderNav />
            </Route>
            <Route exact path={AppRoute.Favorites}>
              <h1>{FAVORITE}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);
    expect(screen.queryByText(TestReg.Favorite)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(new RegExp(EMAIL, 'i')));
    expect(screen.getByText(TestReg.Favorite)).toBeInTheDocument();
  });

  it('should distatch Logaut when user clicked Sign out on Favorite page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(state);
    history.push(AppRoute.Favorites);
    renderComponent(store, AppRoute.Favorites);
    userEvent.click(screen.getByText(TestReg.SignOut));
    expect(dispatch).toBeCalledWith({
      payload: AppRoute.Root,
      type: ActionType.RedirectToRoute,
    });
  });
});
