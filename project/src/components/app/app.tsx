
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';


type AppProrsType = {
  cardCount : number;
}

function App({cardCount} : AppProrsType): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = {AppRoute.Root}>
          <MainPage cardCount = {cardCount} />
        </Route>
        <Route exact path = {AppRoute.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render = {() => <FavoritesPage/>}
          authorizationStatus = {AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path = {AppRoute.RoomProprety}>
          <PropertyPage/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
