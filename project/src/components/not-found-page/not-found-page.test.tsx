import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { AppRoute, ROOT, TestReg } from '../../const';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        < NotFoundPage />
      </Router>);

    expect(screen.getByAltText(TestReg.LogoAltText)).toBeInTheDocument();
    expect(screen.getByText(TestReg.NotFoundPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BackToRoot)).toBeInTheDocument();
  });

  it('should redirect to /root when user clicked on link', () => {
    history.push(AppRoute.NotFound);
    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.Root}>
            <h1>{ROOT}</h1>
          </Route>
          <Route >
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BackToRoot));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
