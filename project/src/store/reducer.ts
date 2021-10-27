import { SortType } from '../const';
import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';

const INITIAL_CITY = 'Paris';

export const initialState = {
  city: INITIAL_CITY,
  offers: [],
  sortType: SortType.Popular,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeSorting:
      return {...state, sortType: action.payload};
    case ActionType.isLoaded:
      return {...state, isDataLoaded: action.payload};
    default:
      return state;
  }
};

export {reducer};
