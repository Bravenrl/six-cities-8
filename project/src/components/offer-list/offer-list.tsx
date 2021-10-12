import { OfferType } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OfferListProrsType = {
  offers : OfferType[];
  isMainPage: boolean;
}

function OfferList ({offers, isMainPage} : OfferListProrsType) : JSX.Element {
  return (
    <div className={`${isMainPage ? 'cities__places-list places__list tabs__content' : 'favorites__places'}`}>
      {offers.map((offer) => <PlaceCard key={offer.id} offer = {offer} isMainPage = {isMainPage}/> )}
    </div>
  );
}

export default OfferList;
