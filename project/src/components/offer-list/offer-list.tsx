import { OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers : OfferType[];
  isMainPage: boolean;
  handleActiveOffer?: (id: number ) => void;
}


function OfferList ({offers, isMainPage, handleActiveOffer} : OfferListProrsType) : JSX.Element {

  return (
    <div className={`${isMainPage ? 'cities__places-list places__list tabs__content' : 'favorites__places'}`}>
      {offers.map((offer) => (<OfferCard onOfferActive = {handleActiveOffer} key={offer.id} offer = {offer} isMainPage = {isMainPage}/>) )}
    </div>
  );
}

export default OfferList;
