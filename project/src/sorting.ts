import { SortType } from './const';
import { OfferType } from './types/offer';

const comparePriceToHight = (objA:OfferType, objB:OfferType): number => objA.price-objB.price;
const compareRating = (objA:OfferType, objB:OfferType): number => objA.rating-objB.rating;
const comparePriceToLow = (objA:OfferType, objB:OfferType): number => objB.price-objA.price;

export const getSortedOffers = (offers:OfferType[], sortType: string): OfferType[] => {
  switch (sortType) {
    case SortType.PriceToHight:
      return offers.sort(comparePriceToHight);
    case SortType.PriceToLow:
      return offers.sort(comparePriceToLow);
    case SortType.TopRated:
      return offers.sort(compareRating);
    default:
      return offers;
  }
};

