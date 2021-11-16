import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { AppRoute, ROOT, TestID, TestReg } from '../../const';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import LoginPage from './login-page';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import userEvent from '@testing-library/user-event';

const VALID_EMAIL = 'mail@mail.com';
const INVALID_EMAIL = 'mail.mail.com';
const VALID_PASSWORD = 'p1';
const INVALID_PASSWORD = 'pp';

const history = createMemoryHistory();
const mockStore = configureMockStore([]);
const componentState = {
  DATA: {...MockDATA},
  USER: {...MockUSER},
  APP: {...MockAPP},
};

const store = mockStore(componentState);
const renderComponent = () => render(
  <Provider store={store}>
    <Router history={history}>
      < LoginPage />
    </Router>
  </Provider>);

describe('Component: LoginPage', () => {

  it('should render correctly', () => {
    renderComponent();

    expect(screen.getByAltText(TestReg.LogoAltText)).toBeInTheDocument();
    expect(screen.getByText(TestReg.LoginEmail)).toBeInTheDocument();
    expect(screen.getByText(TestReg.LoginPassword)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(TestReg.LoginButton);
    userEvent.type(screen.getByTestId(TestID.LoginEmail), VALID_EMAIL);
    userEvent.type(screen.getByTestId(TestID.LoginPassword), VALID_PASSWORD);

    expect(screen.getByDisplayValue(VALID_EMAIL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(VALID_PASSWORD)).toBeInTheDocument();
  });


  it('should dispatch loginAction', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    renderComponent();


    userEvent.type(screen.getByTestId(TestID.LoginEmail), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(TestID.LoginPassword), VALID_PASSWORD);

    expect(dispatch).not.toBeCalled();

    userEvent.clear(screen.getByTestId(TestID.LoginEmail));
    userEvent.clear(screen.getByTestId(TestID.LoginPassword));

    userEvent.type(screen.getByTestId(TestID.LoginEmail), VALID_EMAIL);
    userEvent.type(screen.getByTestId(TestID.LoginPassword), INVALID_PASSWORD);

    expect(dispatch).not.toBeCalled();

    userEvent.clear(screen.getByTestId(TestID.LoginEmail));
    userEvent.clear(screen.getByTestId(TestID.LoginPassword));

    userEvent.type(screen.getByTestId(TestID.LoginEmail), VALID_EMAIL);
    userEvent.type(screen.getByTestId(TestID.LoginPassword), VALID_PASSWORD);

    expect(screen.getByDisplayValue(VALID_EMAIL)).toBeInTheDocument();
    expect(screen.getByDisplayValue(VALID_PASSWORD)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TestID.LoginButton));

    expect(dispatch).toBeCalled();
  });

  it('should redirect to /root when user clicked to city link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    history.push(AppRoute.Login);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Login}>
              <LoginPage />
            </Route>
            <Route exact path={AppRoute.Root}>
              <h1>{ROOT}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider >);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(TestID.LoginLink));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    expect(dispatch).toBeCalledTimes(2);
  });
});
