import { createSelector } from 'reselect';
import { OfferType } from '../../types/offer';
import { ReviewType } from '../../types/review';
import { State } from '../../types/state';
import { getFilterByCity, getSortByDate, getSortByType } from '../../utils';
import { Reducer } from '../root-reducer';
import { getCity, getSortType } from '../user-process/selectors';

export const getOffers = (state: State): OfferType[] => state[Reducer.data].offers;

export const getUserEmail = (state: State): string => state[Reducer.data].userEmail;

export const getCurrentOffer = (state: State): OfferType => state[Reducer.data].currentOffer;

export const getNearbyOffers = (state: State): OfferType[] => state[Reducer.data].nearbyOffers;

export const getReviews = (state: State): ReviewType[] => state[Reducer.data].reviews;

export const getComment = (state: State): string => state[Reducer.data].comment;

export const getCommentRating = (state: State): number => state[Reducer.data].commentRating;

export const getFavoriteOffers = (state: State): OfferType[] => state[Reducer.data].favoriteOffers;

export const getCurrentIsFavorite = (state: State): boolean | null => state[Reducer.data].currentIsFavorite;

export const getCurrentOffers = createSelector(
  [getOffers, getCity], getFilterByCity);

export const getReviewsSortByDate = createSelector(
  [getReviews], getSortByDate);

export const getCurrentWithNearby = createSelector(
  [getNearbyOffers, getCurrentOffer],
  (nearbyOffers, currentOffer): OfferType[] => [...nearbyOffers, currentOffer]);

export const getSortedOffers = createSelector(
  [getCurrentOffers, getSortType], getSortByType);


