import { MAX_COMENT_VAL, SortType } from './const';
import { GenerateFakeCity, GenerateFakeOffer, GenerateFakeReview } from './mock/mock';
import { getFilterByCity, getSortByDate, getSortByType, getWithCapitalLetter } from './utils';


describe('Utils function', () => {
  describe('Function: getSortByDate', () => {
    const reviews = [
      { ...GenerateFakeReview(), id: 1, date: '2019-05-08T14:13:56.569Z' },
      { ...GenerateFakeReview(), id: 2, date: '2019-06-08T14:13:56.569Z' },
      { ...GenerateFakeReview(), id: 3, date: '2020-05-08T14:13:56.569Z' },
      { ...GenerateFakeReview(), id: 4, date: '2021-05-05T14:13:56.569Z' },
    ];
    it('should return sorted array, from an early date to a late', () => {
      const sortedArray = getSortByDate(reviews);
      expect(sortedArray.length).toBe(4);
      expect(sortedArray[0].id).toBe(4);
      expect(sortedArray[3].id).toBe(1);
    });
    it('should return array.lenght <= MAX_COMENT_VAL', () => {
      reviews.length = 20;
      const sortedArray = getSortByDate(reviews);
      expect(sortedArray.length).toBeLessThanOrEqual(MAX_COMENT_VAL);
    });
  });

  describe('Function: getWithCapitalLetter', () => {
    const test = 'test';
    it('should return string with capital first letter', () => {
      expect(getWithCapitalLetter(test)).toBe('Test');
    });
  });

  describe('Function: getSortByType', () => {
    const offers = [
      {...GenerateFakeOffer(), price: 3.2, rating:5},
      {...GenerateFakeOffer(), price: 2.6, rating:1},
      {...GenerateFakeOffer(), price: 5, rating:4},
      {...GenerateFakeOffer(), price: 4, rating:3.5},
    ];
    it('should return array, sorted by price from low to hight', () => {
      const sortedArray = getSortByType(offers, SortType.PriceToHight);
      expect(sortedArray.length).toBe(4);
      expect(sortedArray[0].price).not.toBeGreaterThan(2.6);
      expect(sortedArray[3].price).not.toBeLessThan(5);
    });
    it('should return array, sorted by price from hight to low', () => {
      const sortedArray = getSortByType(offers, SortType.PriceToLow);
      expect(sortedArray.length).toBe(4);
      expect(sortedArray[3].price).not.toBeGreaterThan(2.6);
      expect(sortedArray[0].price).not.toBeLessThan(5);
    });
    it('should return array, sorted by rating from low to hight', () => {
      const sortedArray = getSortByType(offers, SortType.TopRated);
      expect(sortedArray.length).toBe(4);
      expect(sortedArray[0].rating).not.toBeGreaterThan(1);
      expect(sortedArray[3].rating).not.toBeLessThan(5);
    });
    it('should return default array', () => {
      const sortedArray = getSortByType(offers, SortType.Popular);
      expect(sortedArray).toEqual(offers);
    });
  });

  describe('Function: getFilterByCity', () => {
    const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
    const offers = [
      {...GenerateFakeOffer(), city: {...GenerateFakeCity(), name: CITIES[0]}},
      {...GenerateFakeOffer(), city: {...GenerateFakeCity(), name: CITIES[1]}},
      {...GenerateFakeOffer(), city: {...GenerateFakeCity(), name: CITIES[2]}},
      {...GenerateFakeOffer(), city: {...GenerateFakeCity(), name: CITIES[3]}},
      {...GenerateFakeOffer(), city: {...GenerateFakeCity(), name: CITIES[0]}},
    ];
    it('should return array, filtered by Paris', () => {
      const filteredArray = getFilterByCity(offers, CITIES[0]);
      expect(filteredArray.length).toBe(2);
      expect(filteredArray[0].city.name).toBe(CITIES[0]);
    });
    it('should return array.lenght === 0', () => {
      const filteredArray = getFilterByCity(offers, CITIES[6]);
      expect(filteredArray.length).toBe(0);
    });
  });
});
