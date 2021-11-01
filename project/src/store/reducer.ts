import { AuthorizationStatus, SortType } from '../const';
import { ActionType, Actions } from '../types/action';
import { OfferType } from '../types/offer';
import { AuthInfo } from '../types/review';
import { State } from '../types/state';
const INITIAL_CITY = 'Paris';

export const initialState = {
  city: INITIAL_CITY,
  offers: [],
  sortType: SortType.Popular,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  author: {} as AuthInfo,
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  reviews: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return { ...state, city: action.payload };
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.ChangeSorting:
      return { ...state, sortType: action.payload };
    case ActionType.isDataLoading:
      return { ...state, isDataLoading: action.payload };
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.SetAuthor:
      return { ...state, author: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth, author: {} as AuthInfo };
    case ActionType.LoadCurrentOffer:
      return { ...state, currentOffer: action.payload };
    case ActionType.LoadNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.LoadReviews:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};

export { reducer };
