import { useSelector } from 'react-redux';
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import CityList from '../city-list/city-list';
import Preloader from '../preloader/preloader';
import { getIsLoading } from '../../store/app-process/selectors';
import CitiesContainer from '../cities-container/cities-container';
import { getCurrentOffers } from '../../store/app-data/selectors';
import { getCity } from '../../store/user-process/selectors';
import CitiesEmptyContainer from '../cities-empty-container/cities-empty-container';
import Map from '../map/map';
import { PageType } from '../../const';

function MainPage(): JSX.Element {
  const city = useSelector(getCity);
  const currentOffers = useSelector(getCurrentOffers);
  const isLoading = useSelector(getIsLoading);
  const isNotEmpty = (currentOffers.length > 0);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${(!isNotEmpty) && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${(!isNotEmpty) && 'cities__places-container--empty'}`}>
            {(isNotEmpty) ? <CitiesContainer city={city}/> : < CitiesEmptyContainer city={city} />}
            <div className="cities__right-section">
              {(isNotEmpty) && <Map offers={currentOffers} pageType={PageType.Main} city={city} />}
            </div>
          </div>
        </div>
      </main>
    </div>);
}

export default MainPage;
