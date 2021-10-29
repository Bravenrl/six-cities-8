import { AuthorizationStatus, SortType } from '../const';
import { OfferType } from './offer';
import { AuthInfo } from './review';


export type State = {
  city: string;
  offers: OfferType[];
  sortType: SortType;
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  author: AuthInfo;
}
