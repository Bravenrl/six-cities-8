import { EmptyComment } from '../../const';
import { Actions, ActionType } from '../../types/action';
import { OfferType } from '../../types/offer';
import { AppData } from '../../types/state';

const initialState: AppData = {
  offers: [],
  userEmail: '',
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  reviews: [],
  comment: EmptyComment.comment,
  commentRating: EmptyComment.rating,
};

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return { ...state, offers: action.payload };
    case ActionType.userEmail:
      return { ...state, userEmail: action.payload };
    case ActionType.LoadCurrentOffer:
      return { ...state, currentOffer: action.payload };
    case ActionType.LoadNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.LoadReviews:
      return { ...state, reviews: action.payload };
    case ActionType.AddComment:
      return { ...state, comment: action.payload };
    case ActionType.AddCommentRating:
      return { ...state, commentRating: action.payload };
    default:
      return state;
  }
};

export { appData };
