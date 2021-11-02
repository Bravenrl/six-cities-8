import { AuthorizationStatus, SortType } from '../const';
import { OfferType } from './offer';
import { ReviewType } from './review';


export type State = {
  city: string;
  offers: OfferType[];
  sortType: SortType;
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  currentOffer: OfferType;
  nearbyOffers: OfferType[];
  reviews: ReviewType[];
  isPosting: boolean;
  comment: string;
  commentRating: number;
}
