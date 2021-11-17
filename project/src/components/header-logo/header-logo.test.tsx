import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute, ROOT, TestReg } from '../../const';
import userEvent from '@testing-library/user-event';
import HeaderLogo from './header-logo';

const history = createMemoryHistory();

describe('Component: HeaderLogo', () => {
  history.push(AppRoute.Favorites);
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Route exact path={AppRoute.Favorites}>
          <HeaderLogo />
        </Route>
      </Router>);

    expect(screen.getByAltText(TestReg.LogoAltText)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to /root when user clicked to city link', () => {
    history.push(AppRoute.Favorites);
    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.Favorites}>
            <HeaderLogo />
          </Route>
          <Route exact path={AppRoute.Root}>
            <h1>{ROOT}</h1>
          </Route>
        </Switch>
      </Router>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText(TestReg.LogoAltText));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
