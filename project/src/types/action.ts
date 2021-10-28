import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { loadOffers, changeCity, changeSorting, toggleIsLoading } from '../store/action';
import { State } from './state';


export enum ActionType {
  ChangeCity = 'main/changeCity',
  LoadOffers = 'data/LoadOffers',
  ChangeSorting = 'option/changeSorting',
  isDataLoading = 'data/isLoading'
}

export type Actions =
  | ReturnType <typeof changeCity>
  | ReturnType <typeof loadOffers>
  | ReturnType <typeof changeSorting>
  | ReturnType <typeof toggleIsLoading>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

