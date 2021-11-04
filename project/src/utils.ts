import { SortType } from './const';
import { OfferType } from './types/offer';
import { ReviewType } from './types/review';


export const compareDate = (a: ReviewType, b: ReviewType): number => Date.parse(b.date) - Date.parse(a.date);

export const getWithCapitalLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);

export const getSortedByType = (offers: OfferType[], sortType: string): OfferType[] => {
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
