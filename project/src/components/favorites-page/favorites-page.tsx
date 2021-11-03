import { connect, ConnectedProps } from 'react-redux';
import { PageType } from '../../const';
import { State } from '../../types/state';
import { getCurrentOffers } from '../../utils';
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import OfferList from '../offer-list/offer-list';


type PropsFromReduxType = ConnectedProps<typeof connector>


const mapStateToProps = ({ USER, DATA }: State) => ({
  city: USER.city,
  offers: DATA.offers,
});

const connector = connect(mapStateToProps);
function FavoritesPage(props: PropsFromReduxType): JSX.Element {
  const { offers, city } = props;
  const currentOffers = getCurrentOffers(offers, city);
  const favoriteOffers = currentOffers.filter((offer) => offer.isFavorite);
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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#todo">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <OfferList offers={favoriteOffers} pageType={PageType.Favorites} />
              </li>

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
export { FavoritesPage };
export default connector(FavoritesPage);
