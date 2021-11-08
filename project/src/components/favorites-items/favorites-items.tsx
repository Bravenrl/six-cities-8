import { AppRoute, PageType, SortType } from '../../const';
import OfferList from '../offer-list/offer-list';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteOffers } from '../../store/app-data/selectors';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { changeCity, changeSorting } from '../../store/action';

type FavoritesItemsProps = {
  city: string;
}

function FavoritesItems({ city }: FavoritesItemsProps): JSX.Element | null {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const filterOffersByCity = useMemo(
    () => favoriteOffers.filter((offer) => offer.city.name === city),
    [favoriteOffers, city]);

  const dispatch = useDispatch();

  const handleOnCityClick = (): void => {
    dispatch(changeCity(city));
    dispatch(changeSorting(SortType.Popular));
  };

  if (filterOffersByCity.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.Root} onClick={handleOnCityClick} className="locations__item-link" href="#todo">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <OfferList offers={filterOffersByCity} pageType={PageType.Favorites} />
    </li>
  );
}

export default FavoritesItems;
