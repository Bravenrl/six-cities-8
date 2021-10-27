
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ReviewType } from '../../types/review';
import { State } from '../../types/state';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';


type AppProrsType = {
  reviews : ReviewType[];
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & AppProrsType;

const mapStateToProps = ({offers, isDataLoaded}: State) => ({
  offers,
  isDataLoaded,
});

const connector = connect(mapStateToProps);

function App(props : ConnectedComponentPropsType): JSX.Element {
  const {reviews, offers} = props;
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

export {App};
export default connector(App);
