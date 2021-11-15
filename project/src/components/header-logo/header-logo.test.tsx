import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import HeaderLogo from './header-logo';


const history = createMemoryHistory();
const altText = new RegExp('6 cities logo', 'i');
const root = 'root';
const titleText = new RegExp(`${root}`, 'i');

describe('Component: HeaderLogo', () => {
  history.push(AppRoute.Favorites);
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Route exact path={AppRoute.Favorites}>
          <HeaderLogo />
        </Route>
      </Router>);

    expect(screen.getByAltText(altText)).toBeInTheDocument();
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
            <h1>{root}</h1>
          </Route>
        </Switch>
      </Router>);
    expect(screen.queryByText(titleText)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText(altText));
    expect(screen.getByText(root)).toBeInTheDocument();
  });
});
