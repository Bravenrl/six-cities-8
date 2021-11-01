import { AuthorizationStatus, EmptyComment, SortType } from '../const';
import { ActionType, Actions } from '../types/action';
import { OfferType } from '../types/offer';
import { State } from '../types/state';
const INITIAL_CITY = 'Paris';

export const initialState = {
  city: INITIAL_CITY,
  offers: [],
  sortType: SortType.Popular,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  reviews: [],
  isPosting: false,
  comment: EmptyComment.comment,
  commentRating: EmptyComment.rating,
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
    case ActionType.userEmail:
      return { ...state, userEmail: action.payload };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.LoadCurrentOffer:
      return { ...state, currentOffer: action.payload };
    case ActionType.LoadNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.LoadReviews:
      return { ...state, reviews: action.payload };
    case ActionType.isPosting:
      return { ...state, isPosting: action.payload };
    case ActionType.AddComment:
      return { ...state, comment: action.payload };
    case ActionType.AddCommentRank:
      return { ...state, commentRating: action.payload };
    default:
      return state;
  }
};

export { reducer };
