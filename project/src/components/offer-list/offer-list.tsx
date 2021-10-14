import { useState } from 'react';
import { OfferType } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProrsType = {
  offers : OfferType[];
  isMainPage: boolean;
}

function OfferList ({offers, isMainPage} : OfferListProrsType) : JSX.Element {

  const [, setActiveOfferId] = useState(0);

  const handleActiveOffer = (id:number):void => {
    setActiveOfferId(id);
  };


  return (
    <div className={`${isMainPage ? 'cities__places-list places__list tabs__content' : 'favorites__places'}`}>
      {offers.map((offer) => (<OfferCard onOfferActive = {handleActiveOffer} key={offer.id} offer = {offer} isMainPage = {isMainPage}/>) )}
    </div>
  );
}

export default OfferList;
