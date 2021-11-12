import { addComment, addComentRating, addUserEmail, loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOffers, loadReviews, changeIsFavorite, toggleIsFavorite, removeFavoriteOffers, removeCurrentOffer } from '../action';
import { EmptyComment } from '../../const';
import { OfferType } from '../../types/offer';
import { internet } from 'faker';
import { AppData } from '../../types/state';
import { appData } from './app-data';
import { GenerateFakeOffer, GenerateFakeReview } from '../../mock/mock';
const COUNT = 5;
const initialState: AppData = {
  offers: [],
  userEmail: '',
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  reviews: [],
  comment: EmptyComment.comment,
  commentRating: EmptyComment.rating,
  favoriteOffers: [],
  currentIsFavorite: null,
};
const reviews = new Array(COUNT).fill(null).map((review, index) => review = { ...GenerateFakeReview(), id: index });
const falsyOffers = new Array(COUNT).fill(null).map((offer, index) => offer = { ...GenerateFakeOffer(), id: index, isFavorite: false });
const truthyOffer = { ...GenerateFakeOffer(), isFavorite: true };
const truthyOffers = new Array(COUNT).fill(null).map((offer, index) => offer = { ...GenerateFakeOffer(), id: index, isFavorite: true });
const falsyOffer = { ...GenerateFakeOffer(), id: 1, isFavorite: false };
const email = internet.email();
const comment = 'some comment';
const rating = 5;


describe('Reducer: appData', () => {
  let state = initialState;
  beforeAll(() => state = initialState);
  it('without additional parameters should return initial state', () => {
    expect(appData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });
  it('should update offers by load offers', () => {
    expect(appData(state, loadOffers(falsyOffers)))
      .toEqual({ ...state, offers: falsyOffers });
  });
  it('should update userEmail by add email', () => {
    expect(appData(state, addUserEmail(email)))
      .toEqual({ ...state, userEmail: email });
  });
  it('should update currentOffer by load current offer', () => {
    expect(appData(state, loadCurrentOffer(falsyOffers[0])))
      .toEqual({ ...state, currentOffer: falsyOffers[0] });
  });
  it('should update nearbyOffers by load nearby offers', () => {
    expect(appData(state, loadNearbyOffers(falsyOffers)))
      .toEqual({ ...state, nearbyOffers: falsyOffers });
  });
  it('should update reviews by load reviews', () => {
    expect(appData(state, loadReviews(reviews)))
      .toEqual({ ...state, reviews: reviews });
  });
  it('should update comment by add comment', () => {
    expect(appData(state, addComment(comment)))
      .toEqual({ ...state, comment: comment });
  });
  it('should update commentRating by add comment ratig', () => {
    expect(appData(state, addComentRating(rating)))
      .toEqual({ ...state, commentRating: rating });
  });
  it('should update favoriteOffers by load favorite offers', () => {
    expect(appData(state, loadFavoriteOffers(falsyOffers)))
      .toEqual({ ...state, favoriteOffers: falsyOffers });
  });
  describe('case: changeIsFavorite', () => {
    it('should update offers with {id: 1} to {isFavorite: true} by changeIsFavorite', () => {
      state = { ...state, offers: falsyOffers };
      expect(appData(state, changeIsFavorite(truthyOffer))
        .offers.find((offer) => offer.id === 1 && offer.isFavorite === true)).toBeTruthy();
    });
    it('should update offers with {id: 1} to {isFavorite: false} by changeIsFavorite', () => {
      state = { ...state, offers: truthyOffers };
      expect(appData(state, changeIsFavorite(falsyOffer))
        .offers.find((offer) => offer.id === 1 && offer.isFavorite === false)).toBeTruthy();
    });
    it('should delete falsyOffer with {id: 1} from favoriteOffers by changeIsFavorite', () => {
      state = { ...state, favoriteOffers: truthyOffers };
      expect(appData(state, changeIsFavorite(falsyOffer))
        .favoriteOffers.find((offer) => offer.id === 1)).toBeFalsy();
    });
  });
  describe('case: toggleIsFavorite', () => {
    it('should update currentIsFavorite if id === currentOffer.id by toggleIsFavorite', () => {
      state = { ...state, currentOffer: truthyOffer };
      expect(appData(state, toggleIsFavorite(true, 1)).currentIsFavorite).toBeTruthy();
    });
    it('should set null currentIsFavorite if id !== currentOffer.id by toggleIsFavorite', () => {
      state = { ...state, currentOffer: truthyOffer };
      expect(appData(state, toggleIsFavorite(true, 2)).currentIsFavorite).toBeNull();
    });
  });
  it('should remove favoriteOffers by removeFavoriteOffers', () => {
    state = { ...state, favoriteOffers: truthyOffers };
    expect(appData(state, removeFavoriteOffers()).favoriteOffers.length).toBeFalsy();
  });
  it('should remove nearbyOffers, currentOffer, currentIsFavorite, reviews by removeCurrentOffer', () => {
    state = initialState;
    state = { ...state, nearbyOffers: truthyOffers, currentOffer:falsyOffer, currentIsFavorite: true, reviews: reviews };
    expect(appData(state, removeCurrentOffer())).toEqual(initialState);
  });
});
