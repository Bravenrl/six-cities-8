
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { OfferType } from '../../types/offer';
import { ReviewType } from '../../types/review';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';


type AppProrsType = {
  offers : OfferType[];
  reviews : ReviewType[];
}

function App({offers, reviews} : AppProrsType): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = {AppRoute.Root}>
          <MainPage />
        </Route>
        <Route exact path = {AppRoute.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute
          exact
          path = {AppRoute.Favorites}
          render = {() => <FavoritesPage/>}
          authorizationStatus = {AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path = {AppRoute.RoomProprety}>
          <PropertyPage offers={offers} reviews={reviews}/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
