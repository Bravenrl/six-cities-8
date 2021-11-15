import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import HeaderNav from './header-nav';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const signOut = new RegExp('Sign out', 'i');
const signIn = new RegExp('Sign in', 'i');
const favorite = 'favorite';
const email = 'aaa@bb.com';
let state = {
  DATA: {
    userEmail: email,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
  },
};


describe('Component: HeaderNav', () => {
  beforeEach(() => {
    state = {
      DATA: {
        userEmail: email,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    };
  });
  it('should render correctly if AuthStatus !== Auth', () => {
    const store = mockStore(state);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Root}>
            <HeaderNav />
          </Route>
        </Router>
      </Provider>);

    expect(screen.getByText(signIn)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(1);
    expect(screen.queryByText(signOut)).not.toBeInTheDocument();
  });

  it('should render correctly if AuthStatus === Auth', () => {
    state.USER.authorizationStatus = AuthorizationStatus.Auth;
    const store = mockStore(state);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Root}>
              <HeaderNav />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(signOut)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(2);
    expect(screen.queryByText(signIn)).not.toBeInTheDocument();
  });

  it('should redirect to /favorite when user clicked on link', () => {
    state.USER.authorizationStatus = AuthorizationStatus.Auth;
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
              <h1>{favorite}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);
    expect(screen.queryByText(favorite)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(email));
    expect(screen.getByText(favorite)).toBeInTheDocument();
  });

  it('should distatch Logaut when user clicked Sign out on Favorite page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(state);
    state.USER.authorizationStatus = AuthorizationStatus.Auth;
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Favorites}>
            <HeaderNav />
          </Route>
        </Router>
      </Provider>);
    userEvent.click(screen.getByText(signOut));
    expect(dispatch).toBeCalledWith({
      payload: AppRoute.Root,
      type: ActionType.RedirectToRoute,
    });
  });
});
