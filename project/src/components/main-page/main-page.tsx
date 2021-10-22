import { Dispatch } from '@reduxjs/toolkit';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { PageType } from '../../const';
import { addOffers } from '../../store/action';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import Map from '../map/map';
import OfferList from '../offer-list/offer-list';


type MainPagePropsType = {
  allOffers : OfferType[];
}
type PropsFromReduxType = ConnectedProps<typeof connector>
type ConnectedComponentPropsType = PropsFromReduxType & MainPagePropsType;

const mapStateToProps = ({city, offers}: State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(offers: OfferType[]) {
    dispatch(addOffers(offers));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);


function MainPage (props : ConnectedComponentPropsType): JSX.Element {
  const {city, offers, allOffers} = props;

  const [activeOfferId, setActiveOfferId] = useState(0);

  const handleActiveOffer = (id:number):void => {
    setActiveOfferId(id);
  };

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#todo">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="todo">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="todo">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active" href="todo">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="todo">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="todo">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
              </form>
              <OfferList offers={offers} pageType={PageType.Main} handleActiveOffer={handleActiveOffer}/>
            </section>
            <div className="cities__right-section">
              <Map offers = {offers} city = {city} selectedId={activeOfferId} className='cities'/>
            </div>
          </div>
        </div>
      </main>
    </div>);
}

export {MainPage};
export default connector(MainPage);
