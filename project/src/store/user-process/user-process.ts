import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, INITIAL_CITY, SortType } from '../../const';
import { UserProcess } from '../../types/state';
import { changeCity, changeSorting, requireAuthorization, requireLogout, setCurrentId, toggleIsFavorite } from '../action';

const initialState: UserProcess = {
  city: INITIAL_CITY,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentId: null,
  currentIsFavorite: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentId, (state, action) => {
      state.currentId = action.payload;
    })
    .addCase(toggleIsFavorite, (state, action) => {
      state.currentIsFavorite = action.payload;
    });
});


export { userProcess };
