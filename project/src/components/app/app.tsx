import { Router, Switch, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';

const WPFavoritesPage = withPreloader(FavoritesPage);
const WPLoginPage = withPreloader(LoginPage);
const WPMainPage = withPreloader(MainPage);
const WPPropertyPage = withPreloader(PropertyPage);

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <WPMainPage />
        </Route>
        <Route exact path={AppRoute.Login}>
          <WPLoginPage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <WPFavoritesPage />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.RoomProprety}>
          <WPPropertyPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
