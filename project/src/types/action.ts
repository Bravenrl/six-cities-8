import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';


export enum ActionType {
  isLoading = 'app/isLoading',
  isPosting = 'app/isPosting',
  RedirectToRoute = 'app/redirectToRoute',
  HistoryBack = 'app/historyBack',
  AddComment = 'data/addComent',
  AddCommentRating = 'data/addCommentRating',
  LoadOffers = 'data/LoadOffers',
  LoadReviews = 'data/LoadReviews',
  LoadCurrentOffer = 'data/LoadCurrentOffer',
  LoadNearbyOffers = 'data/LoadNearbyOffers',
  userEmail = 'data/setUserEmail',
  RequireAuthorization = 'user/requireAuthorization',
  ChangeCity = 'user/changeCity',
  RequireLogout = 'user/requireLogout',
  ChangeSorting = 'user/changeSorting',
  SetCurrentId = 'user/setCurrentId'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

