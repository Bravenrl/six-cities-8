
import { connect, ConnectedProps } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import withPreloader from '../../hocs/with-preloader/with-preloader';
import { ReviewType } from '../../types/review';
import { State } from '../../types/state';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-paje';
import PrivateRoute from '../private-route/private-route';
import PropertyPage from '../property-page/property-page';

const MainPageWrapped = withPreloader(MainPage);
type AppProrsType = {
  reviews: ReviewType[];
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & AppProrsType;

const mapStateToProps = ({ offers, isDataLoading }: State) => ({
  offers,
  isDataLoading,
});

const connector = connect(mapStateToProps);

function App(props: ConnectedComponentPropsType): JSX.Element {
  const { reviews, offers } = props;
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPageWrapped />
        </Route>
        <Route exact path={AppRoute.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesPage />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.RoomProprety}>
          <PropertyPage offers={offers} reviews={reviews} />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export { App };
export default connector(App);
