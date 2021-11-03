import { AuthorizationStatus, SortType } from '../../const';
import { State } from '../../types/state';
import { Reducer } from '../root-reducer';

export const getCity = (state: State): string => state[Reducer.user].city;

export const getSortType = (state: State): SortType => state[Reducer.user].sortType;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[Reducer.user].authorizationStatus;

// export const getCurrentOffers = createSelector(
//   [getCity],
//   (city: string): CityType =>
//     Cities.get(city) as CityType);
