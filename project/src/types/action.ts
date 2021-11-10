import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';


export enum ActionType {
  isLoading = 'app/isLoading',
  isPosting = 'app/isPosting',
  RedirectToRoute = 'app/redirectToRoute',
  HistoryBack = 'app/historyBack',
  AddComment = 'data/addComent',
  AddCommentRating = 'data/addCommentRating',
  LoadOffers = 'data/loadOffers',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  LoadReviews = 'data/loadReviews',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  UserEmail = 'data/setUserEmail',
  ChangeIsFavorite = 'data/changeIsFavorite',
  RemoveFavoriteOffers = 'data/removeIsFavorite',
  RemoveCurrentOffer = 'dara/removeCurrentOffer',
  RequireAuthorization = 'user/requireAuthorization',
  ChangeCity = 'user/changeCity',
  RequireLogout = 'user/requireLogout',
  ChangeSorting = 'user/changeSorting',
  SetCurrentId = 'user/setCurrentId',
  ToggleIsFavorite = 'user/toggleIsFavorite',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

