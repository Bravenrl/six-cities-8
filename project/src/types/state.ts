import { AuthorizationStatus, SortType } from '../const';
import { OfferType } from './offer';

export type State = {
  city: string;
  offers: OfferType[];
  sortType: SortType;
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}
