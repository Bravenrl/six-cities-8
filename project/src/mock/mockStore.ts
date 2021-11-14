import { AuthorizationStatus, EmptyComment, INITIAL_CITY, SortType } from '../const';
import { OfferType } from '../types/offer';
import { ReviewType } from '../types/review';

export const mockInitialStore = {
  DATA: {
    offers: [] as OfferType [],
    userEmail: '',
    currentOffer: {} as OfferType,
    nearbyOffers: [] as OfferType [],
    reviews: [] as ReviewType [],
    comment: EmptyComment.comment,
    commentRating: EmptyComment.rating,
    favoriteOffers: [] as OfferType [],
    currentIsFavorite: null,
  },
  APP: {
    isLoading: false,
    isPosting: false,
  },
  USER: {
    city: INITIAL_CITY,
    sortType: SortType.Popular,
    authorizationStatus: AuthorizationStatus.Unknown,
    currentId: null,
  },
};
