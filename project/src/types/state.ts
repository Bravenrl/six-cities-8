import { AuthorizationStatus, SortType } from '../const';
import { RootState } from '../store/root-reducer';
import { OfferType } from './offer';
import { ReviewType } from './review';


export type AppData = {
  offers: OfferType[];
  userEmail: string;
  currentOffer: OfferType;
  nearbyOffers: OfferType[];
  reviews: ReviewType[];
  comment: string;
  commentRating: number;
  favoriteOffers: OfferType[];
};

export type AppProcess = {
  isLoading: boolean;
  isPosting: boolean;
};

export type UserProcess = {
  city: string;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  currentId: null | number;
  currentIsFavorite: null | boolean;
};


export type State = RootState;
