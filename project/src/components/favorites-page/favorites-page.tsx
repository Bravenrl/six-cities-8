
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { removeFavoriteOffers } from '../../store/action';
import { loadFavoriteOffersAction } from '../../store/api-action';
import { getFavoriteOffers } from '../../store/app-data/selectors';
import { getIsLoading } from '../../store/app-process/selectors';
import FavoritesEmptyContainer from '../favorites-empty-container/favorites-empty-container';
import FavoritesList from '../favorites-list/favorites-list';
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import Preloader from '../preloader/preloader';


function FavoritesPage(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  const favoriteOffers = useSelector(getFavoriteOffers);
  const isNotEmpty = (favoriteOffers.length > 0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFavoriteOffersAction());
    return () => {
      dispatch(removeFavoriteOffers());
    };
  }, [dispatch]);


  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {(isNotEmpty) ? <FavoritesList /> : < FavoritesEmptyContainer />}
        </div>
      </main>
      <footer className="footer container">
        <Link to = {AppRoute.Root} className="footer__logo-link" href="">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
