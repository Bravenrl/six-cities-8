import { AppRoute, AuthorizationStatus, SortType} from '../const';
import { ActionType} from '../types/action';
import { OfferType } from '../types/offer';
import { AuthInfo, ReviewType } from '../types/review';

export const changeCity = (cityName: string) => ({
  type: ActionType.ChangeCity,
  payload: cityName,
} as const);

export const loadOffers = (offers: OfferType[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const changeSorting = (option: SortType) => ({
  type: ActionType.ChangeSorting,
  payload: option,
} as const);

export const toggleIsLoading = (isLoading: boolean) => ({
  type: ActionType.isDataLoading,
  payload: isLoading,
} as const);

export const requireAuthorization = (status: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: status,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
  payload: AuthorizationStatus.NoAuth,
} as const) ;

export const setAuthor = (author: AuthInfo) => ({
  type: ActionType.SetAuthor,
  payload: author,
} as const);

export const redirectToRoute = (url:AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const loadCurrentOffer = (offer: OfferType) => ({
  type:ActionType.LoadCurrentOffer,
  payload: offer,
} as const);

export const loadNearbyOffers = (offers: OfferType[]) => ({
  type: ActionType.LoadNearbyOffers,
  payload: offers,
} as const);

export const loadReviews = (reviews: ReviewType[])=> ({
  type: ActionType.LoadReviews,
  payload: reviews,
} as const);

export const historyBack = () => ({
  type: ActionType.HistoryBack,
} as const);
