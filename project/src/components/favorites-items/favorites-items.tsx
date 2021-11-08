import { PageType } from '../../const';
import OfferList from '../offer-list/offer-list';
import { useSelector } from 'react-redux';
import { getFavoriteOffers } from '../../store/app-data/selectors';
import { useMemo } from 'react';

type FavoritesItemsProps = {
  city: string;
}

function FavoritesItems({ city }: FavoritesItemsProps): JSX.Element | null {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const filterOffersByCity = useMemo(
    () => favoriteOffers.filter((offer) => offer.city.name === city),
    [favoriteOffers, city]);

  if (filterOffersByCity.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#todo">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <OfferList offers={filterOffersByCity} pageType={PageType.Favorites} />
    </li>
  );
}

export default FavoritesItems;
