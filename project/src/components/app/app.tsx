import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import Preloader from '../preloader/preloader';
import PrivateRouteLogin from '../private-route-login/private-route-login';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';

const WPFavoritesPage = withPreloader(FavoritesPage);
const WPLoginPage = withPreloader(LoginPage);
const WPMainPage = withPreloader(MainPage);
const WPPropertyPage = withPreloader(PropertyPage);

function App(): JSX.Element {
  const authStatus = useSelector(getAuthorizationStatus);
  if (authStatus === AuthorizationStatus.Unknown) {
    return <Preloader />;
  }
  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <WPMainPage />
      </Route>
      <PrivateRouteLogin exact path={AppRoute.Login}>
        <WPLoginPage />
      </PrivateRouteLogin>
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
  );
}
export default App;
