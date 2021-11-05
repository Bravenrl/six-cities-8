import { useSelector } from 'react-redux';
import OfferList from '../offer-list/offer-list';
import PlacesOption from '../places-option/places-options';
import { PageType } from '../../const';
import { getSortedOffers } from '../../store/app-data/selectors';

type CitiesContainerProp = {
  city: string;
}

function CitiesContainer({city}: CitiesContainerProp): JSX.Element {
  const sortedOffers = useSelector(getSortedOffers);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
      <PlacesOption />
      <OfferList offers={sortedOffers} pageType={PageType.Main} />
    </section>
  );
}

export default CitiesContainer;
