import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadOffers, changeCity, changeSorting, toggleIsLoading, requireAuthorization, requireLogout, setAuthor } from '../store/action';
import { State } from './state';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  LoadOffers = 'data/LoadOffers',
  ChangeSorting = 'option/changeSorting',
  isDataLoading = 'data/isLoading',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  SetAuthor = 'data/setAuthor',
}

export type Actions =
  | ReturnType <typeof changeCity>
  | ReturnType <typeof loadOffers>
  | ReturnType <typeof changeSorting>
  | ReturnType <typeof toggleIsLoading>
  | ReturnType <typeof requireAuthorization>
  | ReturnType <typeof requireLogout>
  | ReturnType <typeof setAuthor>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

