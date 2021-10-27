import { SortType } from '../const';
import { OfferType } from './offer';

export type State = {
  city: string;
  offers: OfferType[];
  sortType: SortType;
  isDataLoaded: boolean;
}
