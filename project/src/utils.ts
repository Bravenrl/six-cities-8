import { MAX_COMENT_VAL, SortType } from './const';
import { OfferType } from './types/offer';
import { ReviewType } from './types/review';


export const getSortByDate = (reviews: ReviewType[]): ReviewType[] =>
  [...reviews].sort((objA, objB) => Date.parse(objB.date) - Date.parse(objA.date)).slice(0, MAX_COMENT_VAL);

export const getWithCapitalLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);

export const getSortByType = (offers: OfferType[], sortType: string): OfferType[] => {
  switch (sortType) {
    case SortType.PriceToHight:
      return [...offers].sort((objA, objB) => objA.price - objB.price);
    case SortType.PriceToLow:
      return [...offers].sort((objA, objB) => objB.price - objA.price);
    case SortType.TopRated:
      return [...offers].sort((objA, objB) => objA.rating - objB.rating);
    default:
      return offers;
  }
};

export const getFilterByCity = (offers: OfferType[], city:string): OfferType[] => offers.filter((offer) => offer.city.name === city);
