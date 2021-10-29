import { useParams } from 'react-router';
import { OfferType } from '../../types/offer';
import GalleryList from '../property-gallery/property-gallery';
import HeaderLogo from '../header-logo/header-logo';
import HeaderNav from '../header-nav/header-nav';
import NotFoundPage from '../not-found-page/not-found-paje';
import PremiumMark from '../premium-mark/premium-mark';
import PropertyList from '../property-list/property-list';
import { ReviewType } from '../../types/review';
import ReviewsList from '../property-reviews-list/property-reviews-list';
import Map from '../map/map';
import OfferList from '../offer-list/offer-list';
import { PageType } from '../../const';
import { useEffect } from 'react';
import { getWithCapitalLetter } from '../../utils';

type PropertyPagePropsType = {
  offers: OfferType[];
  reviews: ReviewType[];
}
type ParamsType = {
  id: string;
}

function PropertyPage({ offers, reviews }: PropertyPagePropsType): JSX.Element {
  const params: ParamsType = useParams();
  const currentOffer = offers.find((offer) => offer.id === +params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);


  if (!currentOffer) {
    return <NotFoundPage />;
  }
  const offersNear = offers.filter((offer) => (offer.city.name === currentOffer.city.name) && (offer.id !== currentOffer.id)).slice(0, 3);

  const { isPremium, id, images, title, rating, type, bedrooms,
    maxAdults, price, goods, host, description, isFavorite, city } = currentOffer;
  const ratingPercent = Math.round(rating) * 20;
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

      <main className="page__main page__main--property">
        <section className="property">
          <GalleryList images={images} id={id} />
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <PremiumMark className='property__mark' />}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite && 'property__bookmark-button--active'} button `} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${ratingPercent}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getWithCapitalLetter(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              {(goods.length !== 0) && <PropertyList goods={goods} id={id} />}
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${(host.isPro) && 'property__avatar-wrapper--pro'}`}>
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {(host.isPro) && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <ReviewsList reviews={reviews} />
            </div>
          </div>
          <Map offers={[...offersNear, currentOffer]} selectedId={currentOffer.id} className='property' city={city.name} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={offersNear} pageType={PageType.Property} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyPage;
