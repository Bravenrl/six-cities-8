import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadOffers, changeCity, changeSorting, toggleIsLoading, requireAuthorization, requireLogout, addUserEmail, redirectToRoute, loadCurrentOffer, loadNearbyOffers, loadReviews, historyBack, toggleIsPosting, addComent, addComentRating } from '../store/action';
import { State } from './state';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  LoadOffers = 'data/LoadOffers',
  ChangeSorting = 'option/changeSorting',
  isDataLoading = 'data/isLoading',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  userEmail = 'data/setUserEmail',
  RedirectToRoute = 'user/redirectToRoute',
  LoadCurrentOffer = 'data/LoadCurrentOffer',
  LoadNearbyOffers = 'data/LoadNearbyOffers',
  LoadReviews = 'data/LoadReviews',
  HistoryBack = 'user/historyBack',
  isPosting = 'data/isPosting',
  AddComment = 'user/addComent',
  AddCommentRank = 'user/addCommentRating',
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

