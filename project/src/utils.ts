import { SortType } from './const';
import { OfferType } from './types/offer';
import { ReviewType } from './types/review';


export const getRandomInteger = (a = 0, b = 1) : number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = function (a = 0, b = 10, float = 1) :number {
  const low = Math.min(Math.abs(a), Math.abs(b));
  const hight = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (hight - low) + low;
  return +result.toFixed(float);
};

export const getRandomArrayElement = <T>(elements:T[]):T => elements[getRandomInteger(0,elements.length-1)];

export const getRandomArrayNonRepeat = <T>(elements:T[]):T[] => {                                                 //Массив случайной длины с неповторяющимися элементами
  const arrayNonRepeat = new Array(getRandomInteger(0,elements.length-1)).fill(null);
  const sortArrayNonRepeat: T[] = [];
  arrayNonRepeat.forEach((value1, index) => {
    const random = getRandomArrayElement(elements);
    arrayNonRepeat[index] = (arrayNonRepeat.every((value) => value!==random)) ? random : 0;
    if (arrayNonRepeat[index]!==0) {
      sortArrayNonRepeat.push(arrayNonRepeat[index]);
    }
  });
  return sortArrayNonRepeat;
};

export const compareDate = (a: ReviewType, b: ReviewType) : number => Date.parse(b.date)-Date.parse(a.date);

export const getWithCapitalLetter = (word: string): string => word[0].toUpperCase()+word.slice(1);

const comparePriceToHight = (objA:OfferType, objB:OfferType): number => objA.price-objB.price;
const compareRating = (objA:OfferType, objB:OfferType): number => objA.rating-objB.rating;
const comparePriceToLow = (objA:OfferType, objB:OfferType): number => objB.price-objA.price;

export const getSortedbySortType = (offers:OfferType[], sortType: string): OfferType[] => {
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
