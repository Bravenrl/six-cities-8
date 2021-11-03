import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadOffers, changeCity, changeSorting, toggleIsLoading, requireAuthorization, requireLogout, addUserEmail, redirectToRoute, loadCurrentOffer, loadNearbyOffers, loadReviews, historyBack, toggleIsPosting, addComent, addComentRating } from '../store/action';
import { State } from './state';


export enum ActionType {
  isLoading = 'app/isLoading',
  isPosting = 'app/isPosting',
  RedirectToRoute = 'app/redirectToRoute',
  HistoryBack = 'app/historyBack',
  AddComment = 'data/addComent',
  AddCommentRank = 'data/addCommentRating',
  LoadOffers = 'data/LoadOffers',
  LoadReviews = 'data/LoadReviews',
  LoadCurrentOffer = 'data/LoadCurrentOffer',
  LoadNearbyOffers = 'data/LoadNearbyOffers',
  userEmail = 'data/setUserEmail',
  RequireAuthorization = 'user/requireAuthorization',
  ChangeCity = 'user/changeCity',
  RequireLogout = 'user/requireLogout',
  ChangeSorting = 'user/changeSorting',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof changeSorting>
  | ReturnType<typeof toggleIsLoading>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof addUserEmail>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof loadCurrentOffer>
  | ReturnType<typeof loadNearbyOffers>
  | ReturnType<typeof loadReviews>
  | ReturnType<typeof historyBack>
  | ReturnType<typeof toggleIsPosting>
  | ReturnType<typeof addComent>
  | ReturnType<typeof addComentRating>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

